from functools import wraps

from peewee import IntegrityError
from dateutil.parser import parse as parse_datetime
from flask import Flask, request, jsonify, redirect
from flask.views import MethodView
from flask_cors import CORS

from models import User, ResourceUsage, ActiveWindow
from utils import downsample_time_series_lttb

app = Flask(__name__)
CORS(app)


def user_required(f):
    @wraps(f)
    def decorator(hw_id, *args, **kwargs):
        try:
            User.get(hw_id=hw_id)
        except User.DoesNotExist:
            return jsonify({'error': 'User with specified hardware ID does not exist.'}), 404

        return f(hw_id, *args, **kwargs)
    return decorator


class ResourceUsagesAPI(MethodView):
    def get(self, hw_id):
        response = []

        try:
            from_datetime = parse_datetime(request.args.get('from', "2020-01-01T00:00Z"))
            to_datetime = parse_datetime(request.args.get('to', "2040-01-01T00:00Z"))
            threshold = int(request.args.get('threshold', "30"))

        except ValueError as e:
            return jsonify({'error': str(e)}), 400

        resource_usages_query = ResourceUsage.select(
            ResourceUsage.time, ResourceUsage.cpu, ResourceUsage.mem
        ).where(
            (ResourceUsage.hw_id == hw_id) & (ResourceUsage.time.between(from_datetime, to_datetime))
        )

        cpu_data = []
        mem_data = []
        for resource_usage in resource_usages_query:
            cpu_data.append((int(resource_usage.time.timestamp()), resource_usage.cpu))
            mem_data.append((int(resource_usage.time.timestamp()), resource_usage.mem))

        decimated_cpu_data = downsample_time_series_lttb(cpu_data, threshold)
        decimated_mem_data = downsample_time_series_lttb(mem_data, threshold)

        for i in range(len(decimated_cpu_data)):
            response.append([decimated_cpu_data[0], decimated_cpu_data[1], decimated_mem_data[2]])

        return jsonify(response), 200

    def post(self, hw_id):
        resource_usage = request.json

        try:
            time = parse_datetime(resource_usage['time'])
            cpu = int(resource_usage['cpu'])
            mem = int(resource_usage['mem'])

        except (ValueError, KeyError) as e:
            return jsonify({'error': f"{type(e).__name__} - {e}"}), 400

        ResourceUsage.create(hw_id=hw_id, time=time.replace(tzinfo=None), cpu=cpu, mem=mem)
        return jsonify({'message': "Resource usage created"}), 201


class ActiveWindowsAPI(MethodView):
    def get(self, hw_id):
        response = []

        try:
            from_datetime = parse_datetime(request.args.get('from', "2020-01-01T00:00Z"))
            to_datetime = parse_datetime(request.args.get('to', "2040-01-01T00:00Z"))

        except ValueError as e:
            return jsonify({'error': str(e)}), 400

        active_windows_query = ActiveWindow.select().where(
            (ActiveWindow.hw_id == hw_id) & (ActiveWindow.start.between(from_datetime, to_datetime))
        )

        for active_window in active_windows_query:
            response.append(
                [str(active_window.start), str(active_window.end), active_window.title]
            )

        return jsonify(response)

    def post(self, hw_id):
        active_window = request.json

        try:
            start = parse_datetime(active_window['start'])
            end = parse_datetime(active_window['end'])
            title = str(active_window['title'])

        except (ValueError, KeyError) as e:
            return jsonify({'error': f"{type(e).__name__} - {e}"}), 400

        ActiveWindow.create(hw_id=hw_id, start=start, end=end, title=title)
        return jsonify({'message': "Active window created"}), 201


class UsersAPI(MethodView):
    def get(self, user_id):
        if user_id is None:
            users = User.select()
            users_arr = []
            for user in users:
                users_arr.append(user.create_user_info_dict())

            return jsonify(users_arr)
        else:
            try:
                user = User.get(id=user_id)
                return jsonify(user.create_user_info_dict())
            except User.DoesNotExist:
                return jsonify({'error': 'User not found'}), 404

    def post(self):
        user_json = request.json

        try:
            hw_id = str(user_json['hwId'])
            username = str(user_json['username'])

        except (ValueError, KeyError) as e:
            return jsonify({'error': f"{type(e).__name__} - {e}"}), 400

        try:
            User.create(hw_id=hw_id, username=username)
        except IntegrityError as e:
            return jsonify({"error": "User already exists"}), 409
        return jsonify({'message': "User created"}), 201

    def put(self, user_id):
        try:
            user = User.get(id=user_id)

        except User.DoesNotExits:
            return jsonify({'error': 'User does not exits'}), 404

        change_username_json = request.json
        try:
            username = str(change_username_json['username'])

        except (ValueError, KeyError) as e:
            return jsonify({'error': f"{type(e).__name__} - {e}"}), 400

        user.username = username
        user.save()
        return jsonify({'message': "Username changed"}), 200


@app.route("/api/v1")
def api_docs():
    return redirect('https://app.swaggerhub.com/apis-docs/gurland/smilehackathon/1.0.0#/')


resource_usages_view = user_required(ResourceUsagesAPI.as_view('resource_usages'))
active_windows_view = user_required(ActiveWindowsAPI.as_view('active_windows'))
users_view = UsersAPI.as_view('users')

app.add_url_rule('/api/v1/resource-usages/<string:hw_id>', view_func=resource_usages_view, methods=['GET', 'POST'])
app.add_url_rule('/api/v1/active-windows/<string:hw_id>', view_func=active_windows_view, methods=['GET', 'POST'])

app.add_url_rule('/api/v1/users', defaults={'user_id': None},
                 view_func=users_view, methods=['GET'])

app.add_url_rule('/api/v1/users', view_func=users_view, methods=['POST'])

app.add_url_rule('/api/v1/users/<int:user_id>', view_func=users_view,
                 methods=['GET', 'PUT', 'DELETE'])


if __name__ == "__main__":
    # Only for debugging while developing
    app.run(host='0.0.0.0', debug=True, port=5000)
