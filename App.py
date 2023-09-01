from flask import Flask, render_template, jsonify
from flask_cors import CORS  # Import the CORS module
import pandas as pd
import json
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)  # Add this line to enable CORS for your app
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

if __name__ == '__main__':
    app.run(debug=False, port=5503)
    