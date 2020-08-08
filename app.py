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

@app.route("/dashboard")
def dashboard():
    print("======================================")
    return render_template("Dashboard.html")

@app.route("/model")
def model():
    print("======================================")
    return render_template("Model.html")

@app.route("/att1")
def table():
    print("======================================")
    return render_template("att1.html")

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
    df["Order"] = -1
    df.loc[df["Generation"]=="Baby Boomers",["Order"]]=0
    df.loc[df["Generation"]=="Gen X",["Order"]]=1
    df.loc[df["Generation"]=="Milennials",["Order"]]=2
    df.loc[df["Generation"]=="Gen Z",["Order"]]=3
    df.sort_values(by="Order",inplace=True, ascending=True)
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
    df["Order"] = -1
    df.loc[df["Generation"]=="Baby Boomers",["Order"]]=0
    df.loc[df["Generation"]=="Gen X",["Order"]]=1
    df.loc[df["Generation"]=="Milennials",["Order"]]=2
    df.loc[df["Generation"]=="Gen Z",["Order"]]=3
    df.sort_values(by="Order",inplace=True, ascending=True)
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
    df["Order"] = -1
    df.loc[df["Generation"]=="Baby Boomers",["Order"]]=0
    df.loc[df["Generation"]=="Gen X",["Order"]]=1
    df.loc[df["Generation"]=="Milennials",["Order"]]=2
    df.loc[df["Generation"]=="Gen Z",["Order"]]=3
    df.sort_values(by="Order",inplace=True, ascending=True)
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
    df1.sort_values(by=["Attrition","Per"], ascending=True, inplace=True)
    df1.reset_index(drop=False, inplace=True)
    return jsonify({"employees": df1.to_dict()})

# Calculate numbers and percetages as json
@app.route("/api/turnover/distance", methods=["GET", 'POST'])
def turnoverDistance():
    # Loading the data
    employees = pd.read_csv('Employee-Attrition.csv')
    df = employees.loc[:,["Age","Attrition","DistanceFromHome"]]
    df["Birthdate"] = 2017 - df["Age"]
    bins = [0,1964,1979,1995,2021]
    labels = ["Baby Boomers","Gen X","Milennials","Gen Z"]
    df["Generation"] = pd.cut(df["Birthdate"],bins=bins, labels=labels)
    df["Total"] = df["Age"].count()
    df["Order"] = -1
    df.loc[df["Generation"]=="Baby Boomers",["Order"]]=0
    df.loc[df["Generation"]=="Gen X",["Order"]]=1
    df.loc[df["Generation"]=="Milennials",["Order"]]=2
    df.loc[df["Generation"]=="Gen Z",["Order"]]=3
    df.sort_values(by="Order",inplace=True, ascending=True)
    dff = []
    for element in df["Generation"].unique():
        temp = df.loc[df["Generation"] == element,:].groupby(["Attrition"]).agg({"DistanceFromHome":"mean"})
        temp["Generation"] = element
        temp["DistanceFromHome"] = temp["DistanceFromHome"].round(2)
        dff.append(temp.to_dict())

    return jsonify({"generations": dff})


if __name__ == "__main__":
    app.run(debug=True)