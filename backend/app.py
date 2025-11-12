from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  #Allow requests from frontend (port 3000)

@app.route('/submit', methods=['POST'])
def submit():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No JSON data received"}), 400

        name = data.get('name')
        password = data.get('password')

        print(f"Received from frontend → Name: {name}, Password: {password}")

        return jsonify({
            "message": "Data received successfully",
            "name": name,
            "password": password
        }), 200
    except Exception as e:
        print("Error processing request:", e)
        return jsonify({"error": "Internal server error"}), 500

@app.route('/', methods=['GET'])
def home():
    return jsonify({"status": "Flask backend running"}), 200

if __name__ == '__main__':
    # 0.0.0.0 ensures Flask is reachable from Docker or other hosts
    app.run(host='0.0.0.0', port=5000, debug=True)
