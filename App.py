from flask import Flask, render_template, jsonify, request
from flask_cors import CORS  # Import the CORS module
import pandas as pd
import json
from pymongo import MongoClient
import joblib
from sklearn.preprocessing import StandardScaler


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

print('hello world')

#prediction model api route
@app.route('/predict', methods=['GET','POST'])
def predict():
    if request.method == 'POST':
        print(request)
        try:
            data = request.json
            print(data)

            # Convert the input data to a DataFrame
            input_data = pd.DataFrame(data, index=[0])
            print(input_data)

            # Perform scaling using the StandardScaler
            scaler = joblib.load('scaler.pkl')
            scaled_data = scaler.transform(input_data)
            scaled_data
            print(scaled_data)

            # Make predictions using the model
            predictions = model.predict(scaled_data)
            print(predictions)

            # Convert predictions to human-readable format
            prediction_text = "Probably not a hit" if predictions[0] == 0 else "It's going to be hit! (probably)"
            print(prediction_text)
            return jsonify({'prediction': prediction_text})

        except Exception as e:
            return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=False, port=5503)
    