from flask import Flask, request, jsonify

from models import ProcessActivity, ResourceUsage

app = Flask(__name__)


@app.route("/api/process_activity", methods=['POST'])
def process_activity():
    if request.json:
        content = request.json

        hw_id = content.get('hw_id')
        user_id = content.get('user_id')
        start = content.get('start')
        end = content.get('end')
        process_name = content.get('process_name')
        process_title = content.get('process_title')

        ProcessActivity.create(hw_id=hw_id,
                               user_id=user_id,
                               start=start,
                               end=end,
                               process_name=process_name,
                               process_title=process_title)

        return jsonify({}), 201

    else:
        return jsonify({}), 404


@app.route("/api/resource_usage", methods=['POST'])
def resource_usage():
    if request.json:
        content = request.json

        hw_id = content.get('hw_id')
        cpu = content.get('cpu')
        mem = content.get('mem')
        time = content.get('time')

        ResourceUsage.create(hw_id=hw_id, time=time, cpu=cpu, mem=mem)

        return jsonify({}), 201

    else:
        return jsonify({}), 404


if __name__ == "__main__":
    # Only for debugging while developing
    app.run(host='0.0.0.0', debug=True, port=5000)
