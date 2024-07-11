from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/data')
def get_data():
    data = {
        "meth": {
            "a": 133.98190976397126,
            "b": 0.2525730184452286,
            "c": 0.03808977047401594,
            "d": 0.030229704434801802,
            "e": 0.29260981589430723,
            "f": -47.25147317487502,
            "k1": 8.135592256253993
        },
        "dis": {
            "a": -661.4544577088868,
            "b": -0.001029560539663249,
            "c": 0.0017312969879164303,
            "d": -0.21784979259621606,
            "e": 0.006136165597316057,
            "f": 7.363464639177244,
            "k1": 1.0596706948992063
        }
    }
    return jsonify(data)

if __name__ == '__main__':
    app.run(port=5000)
