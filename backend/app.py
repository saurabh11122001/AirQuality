from flask import Flask, request, jsonify, send_from_directory
import os
import requests
import numpy as np
from datetime import datetime
from collections import defaultdict
from flask_cors import CORS
from tensorflow.keras.models import load_model

app = Flask(__name__, static_folder="static")
CORS(app)

api_key = '701cf10ad3df9b6f5f58f40bfba7e837'
model_path = os.path.join(os.path.dirname(__file__), "best_cnn_model.keras")
best_cnn_model = None  # Lazy loading

def load_best_model():
    global best_cnn_model
    if best_cnn_model is None:
        try:
            best_cnn_model = load_model(model_path)
        except Exception as e:
            print(f"Error loading model: {e}")

def get_city_coordinates(city_name):
    try:
        url = f"http://api.openweathermap.org/geo/1.0/direct?q={city_name}&limit=1&appid={api_key}"
        response = requests.get(url, timeout=5)
        response.raise_for_status()
        data = response.json()
        return (data[0]['lat'], data[0]['lon']) if data else (None, None)
    except Exception as e:
        print(f"Error fetching coordinates: {e}")
        return None, None

def fetch_forecast_pm25(lat, lon):
    try:
        url = f"http://api.openweathermap.org/data/2.5/air_pollution/forecast?lat={lat}&lon={lon}&appid={api_key}"
        response = requests.get(url, timeout=5)
        response.raise_for_status()
        data = response.json()

        pm2_5_daily = defaultdict(list)
        for entry in data.get('list', []):
            date_str = datetime.utcfromtimestamp(entry['dt']).strftime('%Y-%m-%d')
            pm2_5_daily[date_str].append(entry['components']['pm2_5'])

        return {date: sum(values) / len(values) for date, values in pm2_5_daily.items()}
    except Exception as e:
        print(f"Error fetching PM2.5 data: {e}")
        return {}

def calculate_aqi_and_warning(pm25):
    breakpoints = [
        (0, 30, 0, 50, "Good", "Satisfactory air quality.", "green"),
        (31, 60, 51, 100, "Moderate", "Acceptable air quality.", "yellow"),
        (61, 90, 101, 200, "Unhealthy for Sensitive Groups", "May cause discomfort.", "orange"),
        (91, 120, 201, 300, "Unhealthy", "Breathing discomfort likely.", "red"),
        (121, 250, 301, 400, "Very Unhealthy", "Serious health effects.", "purple"),
        (251, 500, 401, 500, "Hazardous", "Severe health warnings.", "maroon")
    ]
    for low_pm, high_pm, low_aqi, high_aqi, category, warning, color in breakpoints:
        if low_pm <= pm25 <= high_pm:
            aqi = ((high_aqi - low_aqi) / (high_pm - low_pm)) * (pm25 - low_pm) + low_aqi
            return round(aqi), category, warning, color
    return 0, "Out of Range", "PM2.5 level is beyond measurable limits.", "gray"

def predict_pm25(historical_data):
    try:
        load_best_model()
        if best_cnn_model is None or len(historical_data) < 5:
            return []

        sequence = np.array(historical_data).reshape((1, 5, 1))
        predictions = []
        for _ in range(5):
            pred = best_cnn_model.predict(sequence, verbose=0)[0, 0]
            pm25_value = max(0, pred)  # Ensure non-negative
            aqi, category, warning, color = calculate_aqi_and_warning(pm25_value)
            predictions.append({
                "pm25": round(pm25_value, 2),
                "aqi": aqi,
                "category": category,
                "warning": warning,
                "color": color
            })
            sequence = np.roll(sequence, -1, axis=1)
            sequence[0, -1, 0] = pred
        return predictions
    except Exception as e:
        print(f"Error in prediction: {e}")
        return []

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_react(path):
    return send_from_directory("static", path) if os.path.exists(os.path.join("static", path)) else send_from_directory("static", "index.html")

@app.route('/predict', methods=['POST'])
def predict():
    try:
        city_name = request.json.get("city")
        lat, lon = get_city_coordinates(city_name)
        if lat is None or lon is None:
            return jsonify({"error": "Invalid city"}), 400

        forecast_data = fetch_forecast_pm25(lat, lon)
        historical_data = list(forecast_data.values())[:5]
        if len(historical_data) < 5:
            return jsonify({"error": "Insufficient data"}), 400

        predictions = predict_pm25(historical_data)

        return jsonify({
            "city": city_name,
            "predictions": predictions
        })
    except Exception as e:
        print(f"Unexpected error: {e}")
        return jsonify({"error": "Internal server error"}), 500

@app.route('/get-coordinates', methods=['POST'])
def get_coordinates():
    try:
        data = request.get_json()
        city = data.get("city")
        if not city:
            return jsonify({"error": "City not provided"}), 400

        url = f"https://nominatim.openstreetmap.org/search?format=json&q={city}"
        headers = {"User-Agent": "YourAppName"}
        response = requests.get(url, headers=headers, timeout=5)

        if response.status_code != 200:
            return jsonify({"error": "Invalid response from API"}), 500

        results = response.json()
        if not results:
            return jsonify({"error": "No results found"}), 404

        return jsonify({
            "lat": results[0]["lat"],
            "lon": results[0]["lon"]
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.errorhandler(Exception)
def handle_exception(e):
    print(f"Unhandled exception: {e}")
    return jsonify({"error": "Something went wrong"}), 500

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)), debug=True)
