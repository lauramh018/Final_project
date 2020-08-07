

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

  
  //var uniqueNames = ["Gen Z","Milennials","Gen X","Baby Boomers"];
  var uniqueNames = ["Baby Boomers","Gen X","Milennials","Gen Z"];
  var x = ["Yes","No"];
  
  var traces = [];
  var colors = ["A1B5BD","ECC05F","E4693E","112D4B"]
  
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
    /*width: 500,
    height: 300*/
    };
    
  Plotly.newPlot('myDiv', data, layout,{displayModeBar: false}, {responsive: true});

});

d3.json("/api/turnover/worklifebalance").then((incomingData) =>{
  
var generations = incomingData.generations;

var values = [];
var gen = [];
var employees = [];

var i = 0;
generations.forEach(generation => {

  var temp = [];
  Object.keys(generation["Total"]).forEach(function(key){
      temp.push(generation["Total"][key]);
  });
  values.push(temp)
  
  var tempGen = [];
  Object.keys(generation["Generation"]).forEach(function(key){
    tempGen.push(generation["Generation"][key]);
  });
  gen.push(tempGen)

  var tempEmp = [];
  Object.keys(generation["Age"]).forEach(function(key){
    tempEmp.push(generation["Age"][key]);
  });
  employees.push(tempEmp)

  i++

});

var legends = ["Bad","Good","Better","Best"];

var x = [];
for (k= 0; k < gen.length; k++){
    x.push(gen[k][0])
}

var traces = [];
var colors = ["247367","F9F3B2","E3DF8C","F58423"]//["A1B5BD","ECC05F","E4693E","112D4B"]

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
  
Plotly.newPlot('myDiv2', data, layout,{displayModeBar: false}, {responsive: true});

})


d3.json("/api/turnover/jobsatisfaction").then((incomingData) =>{
  
var generations = incomingData.generations;

var values = [];
var gen = [];
var employees = [];

var i = 0;
generations.forEach(generation => {

  var temp = [];
  Object.keys(generation["Total"]).forEach(function(key){
      temp.push(generation["Total"][key]);
  });
  values.push(temp)
  
  var tempGen = [];
  Object.keys(generation["Generation"]).forEach(function(key){
    tempGen.push(generation["Generation"][key]);
  });
  gen.push(tempGen)

  var tempEmp = [];
  Object.keys(generation["Age"]).forEach(function(key){
    tempEmp.push(generation["Age"][key]);
  });
  employees.push(tempEmp)

  i++

});


var legends = ["Low","Medium","High","Very High"];
var x = [];
for (k= 0; k < gen.length; k++){
    x.push(gen[k][0])
}

var traces = [];
var colors = ["FBF69A","95DB96","5EA793","20565C"]

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
  
Plotly.newPlot('myDiv3', data, layout,{displayModeBar: false}, {responsive: true});

})


d3.json("/api/turnover/environment").then((incomingData) =>{
  
var generations = incomingData.generations;

var values = [];
var gen = [];
var employees = [];

var i = 0;
generations.forEach(generation => {

  var temp = [];
  Object.keys(generation["Total"]).forEach(function(key){
      temp.push(generation["Total"][key]);
  });
  values.push(temp)
  
  var tempGen = [];
  Object.keys(generation["Generation"]).forEach(function(key){
    tempGen.push(generation["Generation"][key]);
  });
  gen.push(tempGen)

  var tempEmp = [];
  Object.keys(generation["Age"]).forEach(function(key){
    tempEmp.push(generation["Age"][key]);
  });
  employees.push(tempEmp)

  i++

});


var legends = ["Low","Medium","High","Very High"];

var x = [];

for (k= 0; k < gen.length; k++){
    x.push(gen[k][0])
}




var traces = [];
var colors = ["2CAFB1","B89051","134A7A","F12B28"]

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
  
Plotly.newPlot('myDiv4', data, layout,{displayModeBar: false}, {responsive: true});

})



d3.json("/api/turnover/jobrole").then((incomingData) =>{
    
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

 Object.keys(employees["JobRole"]).forEach(function(key){
  generation.push(employees["JobRole"][key])
 });

  var JobRole = []
  for (k = 0; k<generation.length/2;k++)
    JobRole.push(generation[k])
  var x = ["No","Yes"];
  var jobroletraces = [];
  var jobroletraces1 = [];

  
    x1 = [values[0],values[1],values[2],values[3],values[4],values[5],values[6],values[7],values[8]]
    var trace = {
      x: x1,
      y: generation,
      text: x1.map(String),
      textposition: 'outside',
      type: 'bar',
      orientation: "h",
      mode: 'markers',
      marker: {
        color: "41a446",
        size: 7
      },
      name: 'No'
    };

    
    jobroletraces.push(trace)
  
    
  var data = jobroletraces;
    
  var jrlayout = {
    title: 'Attrition by JobRole',
    font:{
      family: 'Raleway, sans-serif'
    },
    showlegend: true,
    xaxis:{title:"% Employees"},
    yaxis:{
      title:"",
      automargin: true,
      titlefont: {
        size: 7,
        color: 'rgb(107, 107, 107)'
      }}
    };
    
  Plotly.newPlot('myDiv5', data, jrlayout);
  
  x2 = [values[9],values[10],values[11],values[12],values[13],values[14],values[15],values[16],values[17]]
  var trace1 = {
    x: x2,
    y: JobRole,
    text: x2.map(String),
    textposition: 'outside',
    type: 'bar',
    orientation: "h",
    mode: 'markers',
    marker: {
      color: "9F9E9E",
        size: 7
    },
    name: 'Yes'
  };
  
  jobroletraces1.push(trace1);

  var data1 = jobroletraces1;
  var jrlayout1 = {
  title: 'Attrition by JobRole',
  font:{
    family: 'Raleway, sans-serif'
  },
  showlegend: true,
  xaxis:{title:"% Employees"},
  yaxis:{
    title:"",
    automargin: true,
    titlefont: {
      size: 7,
      color: 'rgb(107, 107, 107)'
    }}
  };
  Plotly.newPlot('myDiv6', data1, jrlayout1,{displayModeBar: false}, {responsive: true});
})


d3.json("/api/turnover/distance").then((incomingData) =>{
    
  var generations = incomingData.generations;
  
  var values = [];
  var generation = [];
  var employees = [];

  var i = 0;
  generations.forEach(generation => {

    var temp = [];
    Object.keys(generation["DistanceFromHome"]).forEach(function(key){
        temp.push(generation["DistanceFromHome"][key]);
    });
    values.push(temp)
    
  
    var tempEmp = [];
    Object.keys(generation["Generation"]).forEach(function(key){
      tempEmp.push(generation["Generation"][key]);
    });
    employees.push(tempEmp)

    i++

  });
  
  var legends = ["No","Yes"];
  var x = ["Baby Boomers","Gen X","Milennials","Gen Z"];
  
  var traces = [];
  var colors = ["41a446","9F9E9E","E4693E","112D4B"]
  
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
    title: 'Distance by Generation',
    font:{
      family: 'Raleway, sans-serif'
    },
    showlegend: true,
    xaxis:{title:"Generation"},
    yaxis:{title:"Avg Kilometers"}
    };
    
  Plotly.newPlot('divDistance', data, layout,{displayModeBar: false}, {responsive: true});
  
})























