#################################################
# Import Modules
#################################################

from flask import Flask, Response
from flask import render_template
from flask import redirect
from flask import jsonify
from flask import request
import pandas as pd
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

# Calculate numbers and percetages as json
@app.route("/api/turnover/generation", methods=["GET", 'POST'])
def turnoverGeneration():
    # Loading the data
    employees = pd.read_csv('Resources/Data/Employee-Attrition.csv')    
    df = employees.loc[:,["Age","Attrition"]]
    df["Birthdate"] = 2017 - df["Age"]
    bins = [0,1964,1979,1995,2021]
    labels = ["Baby Boomers","Gen X","Milennials","Gen Z"]
    df["Generation"] = pd.cut(df["Birthdate"],bins=bins, labels=labels)
    df["Total"] = df["Age"].count()
    df["TotalTurnover"] = 0
    tot = df.groupby("Attrition")["Attrition"].count()
    df.loc[df["Attrition"] == "Yes", 'TotalTurnover'] = tot[1]
    df.loc[df["Attrition"] == "No", 'TotalTurnover'] = tot[0]
    df["TotalTurnover"].value_counts()
    df = df.groupby(["Attrition","Generation"]).agg({"Age":"count","TotalTurnover":"max"})
    df["Per"] = round((df["Age"] / df["TotalTurnover"])*100,2)
    df.reset_index(drop=False, inplace=True)
    return jsonify({"employees": df.to_dict()})

# Create the information to graph the attritin vs age as json
@app.route("/api/turnover/ages", methods=["GET", 'POST'])
def age_turnover():
    # Loading the data
    employees = pd.read_csv('Resources/Data/Employee-Attrition.csv')    
    df = employees.loc[:,["Age","Attrition"]]
    grouped_ages = pd.DataFrame(df.groupby(["Attrition","Age"])["Age"].count())
    grouped_ages.rename(columns={"Age":"Age","Age":"Count"}, inplace=True)
    grouped_ages.reset_index(drop= False,inplace=True)
    yes_att = grouped_ages[grouped_ages["Attrition"]=="Yes"]
    no_att = grouped_ages[grouped_ages["Attrition"]=="No"]

    return jsonify({"employees": {"Yes": yes_att.to_dict(),"No":no_att.to_dict()}})


if __name__ == "__main__":
    app.run(debug=True)