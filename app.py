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
from tensorflow.keras.models import Sequential, save_model, load_model
import numpy as np


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

@app.route("/dashboard")
def dashboard():
    print("======================================")
    return render_template("Dashboard.html")

@app.route("/model")
def model():
    print("======================================")
    return render_template("Model.html")

@app.route("/predictions")
def predictions():
    print("======================================")
    return render_template("predictions.html")

@app.route("/logistic")
def logistic():
    print("======================================")
    return render_template("logistic.html")
@app.route("/neural")
def neural():
    print("======================================")
    return render_template("neural.html")

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

# Create the information to graph the attrition vs age as json
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

# Calculate numbers and percetages as json
@app.route("/api/overview/data", methods=["GET", 'POST'])
def overviewData():
    # Loading the data
    raw_data = pd.read_csv('Employee-Attrition.csv')
    percentages = raw_data["Attrition"].value_counts(normalize=True)
    numbers = raw_data["Attrition"].value_counts()
    numbers = {
        "noPercentage" : round(float(percentages[0]*100),2),
        "noNumber" : int(numbers[0]),
        "yesPercentage" : round(float(percentages[1]*100),2),
        "yesNumber" : int(numbers[1])
    }
    return jsonify({"employess": numbers})

# Calculate numbers and percetages as json
@app.route("/api/turnover/worklifebalance", methods=["GET", 'POST'])
def turnoverWorkLifeBalance():
    # Loading the data
    employees = pd.read_csv('Employee-Attrition.csv')
    df = employees.loc[employees["Attrition"] == "Yes",["Age","WorkLifeBalance",]]
    df["Birthdate"] = 2017 - df["Age"]
    bins = [0,1964,1979,1995,2021]
    labels = ["Baby Boomers","Gen X","Milennials","Gen Z"]
    df["Generation"] = pd.cut(df["Birthdate"],bins=bins, labels=labels)
    df["Total"] = df["Age"].count()
    df.head()

    dff = []
    for element in df["Generation"].unique():
        print(element)
        temp = df.loc[df["Generation"] == element,:].groupby(["WorkLifeBalance"]).agg({"Age":"count"})
        temp["Generation"] = element
        temp["Total"] = round(temp["Age"] / temp["Age"].sum()*100,2)
        dff.append(temp.to_dict())

    return jsonify({"generations": dff})

# Calculate numbers and percetages as json
@app.route("/api/turnover/jobsatisfaction", methods=["GET", 'POST'])
def turnoverJobSatisfaction():
    # Loading the data
    employees = pd.read_csv('Employee-Attrition.csv')
    df = employees.loc[employees["Attrition"] == "Yes",["Age","JobSatisfaction",]]
    df["Birthdate"] = 2017 - df["Age"]
    bins = [0,1964,1979,1995,2021]
    labels = ["Baby Boomers","Gen X","Milennials","Gen Z"]
    df["Generation"] = pd.cut(df["Birthdate"],bins=bins, labels=labels)
    df["Total"] = df["Age"].count()

    dff = []
    for element in df["Generation"].unique():
        print(element)
        temp = df.loc[df["Generation"] == element,:].groupby(["JobSatisfaction"]).agg({"Age":"count"})
        temp["Generation"] = element
        temp["Total"] = round(temp["Age"] / temp["Age"].sum()*100,2)
        dff.append(temp.to_dict())
        
    return jsonify({"generations": dff})


# Calculate numbers and percetages as json
@app.route("/api/turnover/environment", methods=["GET", 'POST'])
def turnoverEnvSatisfaction():
    # Loading the data
    employees = pd.read_csv('Employee-Attrition.csv')
    df = employees.loc[employees["Attrition"] == "Yes",["Age","EnvironmentSatisfaction",]]
    df["Birthdate"] = 2017 - df["Age"]
    bins = [0,1964,1979,1995,2021]
    labels = ["Baby Boomers","Gen X","Milennials","Gen Z"]
    df["Generation"] = pd.cut(df["Birthdate"],bins=bins, labels=labels)
    df["Total"] = df["Age"].count()

    dff = []
    for element in df["Generation"].unique():
        print(element)
        temp = df.loc[df["Generation"] == element,:].groupby(["EnvironmentSatisfaction"]).agg({"Age":"count"})
        temp["Generation"] = element
        temp["Total"] = round(temp["Age"] / temp["Age"].sum()*100,2)
        dff.append(temp.to_dict())
        
    return jsonify({"generations": dff})

@app.route("/api/turnover/jobrole", methods=["GET", 'POST'])
def turnoverJobRole():
    employees = pd.read_csv('Employee-Attrition.csv')
    df = employees.loc[:,["JobRole","Attrition"]]
    df["Total"] = df["JobRole"].count()
    df["TotalTurnover"] = 0
    tot = df.groupby("Attrition")["Attrition"].count()
    df.loc[df["Attrition"] == "Yes", 'TotalTurnover'] = tot[1]
    df.loc[df["Attrition"] == "No", 'TotalTurnover'] = tot[0]
    df["TotalTurnover"].value_counts()
    df1 = df.groupby(["Attrition","JobRole"]).agg({"JobRole":"count","TotalTurnover":"max"})
    df1.rename(columns={'JobRole': 'JR'},inplace = True)
    df1["Per"] = round((df1["JR"] / df1["TotalTurnover"])*100,2)
    df1.reset_index(drop=False, inplace=True)
    return jsonify({"employees": df1.to_dict()})
# Create the information to graph the attritin vs age as json
@app.route("/api/turnover/prediction", methods=["GET", 'POST'])
def prediction():
     ######  Creating the cases ######

    case_1 = np.array([[22,1,1100,3,300,7,60,18000,10,3,2,3,3,3,4,1,2,1,4,3,2,1,3,0]])
    case_2 = np.array([[32,0,5593,5,200,25,57,25838,7,22,15,11,2,4,4,1,3,1,3,3,3,4,4,1]])
    case_3 = np.array([[45,1,1802,2,250,24,65,7067,6,38,15,34,3,2,3,1,3,3,2,1,2,2,5,1]])
    case_4 = np.array([[26,0,2906,8,380,13,81,15198,13,17,5,6,4,4,4,1,0,2,4,4,3,3,1,1]])
    ######  Loading the model ######
    file_path = 'ML_Models/NN_01.hi'
    model = load_model(file_path,compile=True)
    ######  Making predictions ######
    
    prediction1 = model.predict(case_1)
    prediction2 = model.predict(case_2)
    prediction3 = model.predict(case_3)
    prediction4 = model.predict(case_4)

    # Generate arg maxes for predictions

    classes1 = np.argmax(prediction1, axis = 1).tolist()
    classes2 = np.argmax(prediction2, axis = 1).tolist()
    classes3 = np.argmax(prediction3, axis = 1).tolist()
    classes4 = np.argmax(prediction4, axis = 1).tolist()
    

    return jsonify({"employees": {"P1": classes1,"P2":classes2,"P3":classes3,"P4":classes4}})

if __name__ == "__main__":
    app.run(debug=True)