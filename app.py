#################################################
# Import Modules
#################################################

from flask import Flask, Response
from flask import render_template
from flask import redirect
from flask import jsonify
from flask import request
import json


#################################################
# DB Connection
#################################################

app = Flask(__name__)


#################################################
# Flask Routes
#################################################
@app.route("/")
def home():
    print("======================================")
    return render_template("index.html")



@app.route("/api/attrition", methods=["GET", 'POST'])
def attrition_info():
    with open('Employee_Attrition.json') as f:
        data = json.load(f)
    
    return jsonify(data)


if __name__ == "__main__":
    app.run(debug=True)