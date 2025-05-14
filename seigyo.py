from flask import Flask, jsonify
from flask_cors import CORS
from airoco import get_sensor_data

app = Flask(__name__)
CORS(app)

@app.route("/api/data")
def get_data():
    return jsonify(get_sensor_data())

if __name__ == "__main__":
    app.run(port=5000)
