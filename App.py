from flask import Flask, render_template, jsonify, request
from flask_cors import CORS  # Import the CORS module
import pandas as pd
import json
from pymongo import MongoClient
import joblib


app = Flask(__name__)
CORS(app)  # Add this line to enable CORS for your app

#loading the model
model = joblib.load('model.pkl')

client = MongoClient('mongodb://localhost:27017/')  # Replace with your MongoDB connection string
db = client['SpotifySongs']  # Replace with your database name

@app.route('/')
def main():
    return render_template('index.html')

@app.route('/api')
def api():
    collection = db['SpotifySongs']  # collection name
    data = collection.find({},{"_id":0})
    data= list(data)
    return data

#prediction model api route
@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json

        # Convert the input data to a DataFrame
        input_data = pd.DataFrame(data, index=[0])

        # Make predictions using the model
        predictions = model.predict(input_data)

        # Convert predictions to human-readable format
        prediction_text = "Probably not a hit" if predictions[0] == 0 else "It's going to be hit! (probably)"

        return jsonify({'prediction': prediction_text})

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=False, port=5503)
    