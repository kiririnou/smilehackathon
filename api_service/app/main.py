from random import choice

from flask import Flask, request, jsonify, render_template

from models import ProcessActivity, User

app = Flask(__name__)

NAMES = ['Cloud', 'Lockpick', 'Carasique', 'Orange', 'Pineapple', 'Watermelon']


@app.route("/get_user/<int:user_id>")
def get_user(user_id):
    try:
        user = User.get(id=user_id)
        return render_template("user.html", user=user)
    except User.DoesNotExist:
        return jsonify({}), 404


@app.route("/")
def index():
    users = User.select()
    users_arr = []
    for user in users:
        user_dict = {"username": user.username,
                     "hw_id": user.hw_id,
                     "id": user.id}
        try:
            last_process = ProcessActivity.select().where(ProcessActivity.hw_id == user.hw_id)\
                .order_by(ProcessActivity.id.desc()).get()
            user_dict["mem"] = last_process.mem
            user_dict["title"] = last_process.process_title
            users_arr.append(user_dict)

        except ProcessActivity.DoesNotExist:
            continue

    return render_template("index.html", users=users_arr)


@app.route("/api/users")
def users():
    users = User.select()
    users_arr = []
    for user in users:
        user_dict = {"username": user.username,
                     "hw_id": user.hw_id,
                     "id": user.id}
        try:
            last_process = ProcessActivity.select().where(ProcessActivity.hw_id == user.hw_id) \
                .order_by(ProcessActivity.id.desc()).get()
            user_dict["mem"] = last_process.mem
            user_dict["title"] = last_process.process_title
            users_arr.append(user_dict)

        except ProcessActivity.DoesNotExist:
            continue

    return jsonify(users_arr)


@app.route("/api/resources_interval/<string:hw_id>")
def resources_interval(hw_id):
    resources = ProcessActivity.select().where(ProcessActivity.hw_id == hw_id)
    times = []
    for activity in resources:
        times.append([activity.start.strftime("%H:%M:%S"), activity.mem, activity.process_title])

    return jsonify(times)


@app.route("/api/avg_interval/<string:hw_id>")
def avg_interval(hw_id):
    resources = ProcessActivity.select().where(ProcessActivity.hw_id == hw_id)
    proc_dict = {}

    for activity in resources:
        proc_dict.setdefault(activity.process_title, 0)
        proc_dict[activity.process_title] += (activity.end - activity.start).seconds

    return jsonify(proc_dict)


@app.route("/api/process_activity", methods=['POST'])
def process_activity():
    if request.json:
        content = request.json

        hw_id = content.get('hw_id')
        start = content.get('start')
        end = content.get('end')
        mem = content.get('mem')
        process_title = content.get('process_title')

        user, created = User.get_or_create(hw_id=hw_id)
        if created:
            user.username = choice(NAMES)
            user.save()

        ProcessActivity.create(hw_id=hw_id,
                               start=start,
                               end=end,
                               mem=mem,
                               process_title=process_title)

        return jsonify({}), 201

    else:
        return jsonify({}), 404


if __name__ == "__main__":
    # Only for debugging while developing
    app.run(host='0.0.0.0', debug=True, port=5000)
