

d3.json("/api/turnover/generation").then((incomingData) =>{
    
  var employees = incomingData.employees;
  var attrition = [];
  var values = [];
  var generation = [];


  Object.keys(employees["Attrition"]).forEach(function(key){
     attrition.push(employees["Attrition"][key])
  });

  Object.keys(employees["Per"]).forEach(function(key){
    values.push(employees["Per"][key])
 });

 Object.keys(employees["Generation"]).forEach(function(key){
  generation.push(employees["Generation"][key])
 });

  
  var uniqueNames = ["Gen Z","Milennials","Gen X","Baby Boomers"];
  var x = ["Yes","No"];
  
  var traces = [];
  var colors = ["8EAF9C","C9BB9A","988A84","7D6A81"]
  
  for (i = 0; i < uniqueNames.length; i++){
    var y = [values[i],values[i+4]];
    var trace = {
      x: x,
      y: y,
      text: y.map(String),
      textposition: 'auto',
      name: uniqueNames[i],
      type: 'bar',
      mode: 'markers',
      marker: {
        color: colors[i],
          size: 10
      }
    };
    traces.push(trace)
  }
    
  var data = traces;
    
  var layout = {
    barmode: 'stack',
    title: 'Attrition by Generation',
    font:{
      family: 'Raleway, sans-serif'
    },
    showlegend: true,
    xaxis:{title:"Attrition"},
    yaxis:{title:"% Employees"}
    };
    
  Plotly.newPlot('myDiv', data, layout);

});

d3.json("/api/turnover/worklifebalance").then((incomingData) =>{
  
var generations = incomingData.generations;

var values = [];
var generation = [];
var employees = [];

var i = 0;
generations.forEach(generation => {

  var temp = [];
  Object.keys(generation["Total"]).forEach(function(key){
      temp.push(generation["Total"][key]);
  });
  values.push(temp)
  

  var tempEmp = [];
  Object.keys(generation["Age"]).forEach(function(key){
    tempEmp.push(generation["Age"][key]);
  });
  employees.push(tempEmp)

  i++

});
console.log(values)
console.log(employees)

var legends = ["Bad","Good","Better","Best"];
var x = ["Gen X","Milennials","Gen Z","Baby Boomers"];
//var x = ["Gen Z","Milennials","Gen X","Baby Boomers"];

var traces = [];
var colors = ["A1B5BD","ECC05F","E4693E","112D4B"]

for (i = 0; i < legends.length; i++){
  var y = [values[0][i],values[1][i],values[2][i],values[3][i]];
  var text = [employees[0][i],employees[1][i],employees[2][i],employees[3][i]];
  var trace = {
    x: x,
    y: y,
    text: y.map(String),
    textposition: 'auto',
    name: legends[i],
    type: 'bar',
    mode: 'markers',
    marker: {
      color: colors[i],
        size: 10
    }
  };
  traces.push(trace)
}
  
var data = traces;
  
var layout = {
  barmode: 'stack',
  title: 'Work-Life Balance by Generation for the people who left',
  font:{
    family: 'Raleway, sans-serif'
  },
  showlegend: true,
  xaxis:{title:"Generation"},
  yaxis:{title:"% Employees"}
  };
  
Plotly.newPlot('myDiv2', data, layout);

})


d3.json("/api/turnover/jobsatisfaction").then((incomingData) =>{
  
var generations = incomingData.generations;

var values = [];
var generation = [];
var employees = [];

var i = 0;
generations.forEach(generation => {

  var temp = [];
  Object.keys(generation["Total"]).forEach(function(key){
      temp.push(generation["Total"][key]);
  });
  values.push(temp)
  

  var tempEmp = [];
  Object.keys(generation["Age"]).forEach(function(key){
    tempEmp.push(generation["Age"][key]);
  });
  employees.push(tempEmp)

  i++

});
console.log(values)
console.log(employees)

var legends = ["Low","Medium","High","Very High"];
var x = ["Gen X","Milennials","Gen Z","Baby Boomers"];
//var x = ["Gen Z","Milennials","Gen X","Baby Boomers"];

var traces = [];
var colors = ["A1B5BD","ECC05F","E4693E","112D4B"]

for (i = 0; i < legends.length; i++){
  var y = [values[0][i],values[1][i],values[2][i],values[3][i]];
  var text = [employees[0][i],employees[1][i],employees[2][i],employees[3][i]];
  var trace = {
    x: x,
    y: y,
    text: y.map(String),
    textposition: 'auto',
    name: legends[i],
    type: 'bar',
    mode: 'markers',
    marker: {
      color: colors[i],
        size: 10
    }
  };
  traces.push(trace)
}
  
var data = traces;
  
var layout = {
  barmode: 'stack',
  title: 'Job Satisfaction by Generation for the people who left',
  font:{
    family: 'Raleway, sans-serif'
  },
  showlegend: true,
  xaxis:{title:"Generation"},
  yaxis:{title:"% Employees"}
  };
  
Plotly.newPlot('myDiv3', data, layout);

})


d3.json("/api/turnover/environment").then((incomingData) =>{
  
var generations = incomingData.generations;

var values = [];
var generation = [];
var employees = [];

var i = 0;
generations.forEach(generation => {

  var temp = [];
  Object.keys(generation["Total"]).forEach(function(key){
      temp.push(generation["Total"][key]);
  });
  values.push(temp)
  

  var tempEmp = [];
  Object.keys(generation["Age"]).forEach(function(key){
    tempEmp.push(generation["Age"][key]);
  });
  employees.push(tempEmp)

  i++

});
console.log(values)
console.log(employees)

var legends = ["Low","Medium","High","Very High"];
var x = ["Gen X","Milennials","Gen Z","Baby Boomers"];
//var x = ["Gen Z","Milennials","Gen X","Baby Boomers"];

var traces = [];
var colors = ["A1B5BD","ECC05F","E4693E","112D4B"]

for (i = 0; i < legends.length; i++){
  var y = [values[0][i],values[1][i],values[2][i],values[3][i]];
  var text = [employees[0][i],employees[1][i],employees[2][i],employees[3][i]];
  var trace = {
    x: x,
    y: y,
    text: y.map(String),
    textposition: 'auto',
    name: legends[i],
    type: 'bar',
    mode: 'markers',
    marker: {
      color: colors[i],
        size: 10
    }
  };
  traces.push(trace)
}
  
var data = traces;
  
var layout = {
  barmode: 'stack',
  title: 'Environment Satisfaction by Generation for the people who left',
  font:{
    family: 'Raleway, sans-serif'
  },
  showlegend: true,
  xaxis:{title:"Generation"},
  yaxis:{title:"% Employees"}
  };
  
Plotly.newPlot('myDiv4', data, layout);

})

