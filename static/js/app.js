// Import Data
d3.json("/api/turnover/ages").then((Attrition) =>{
  var employees_Yes = Attrition.employees.Yes;
  var employees_No = Attrition.employees.No;
  var age_Y = [];
  var age_N = [];
  var count_Y = [];
  var count_N = [];
  // console.log(employees_Yes.Age);
  // console.log(employees_No);

  // // // Read all rows
  Object.keys(employees_Yes["Age"]).forEach(function(key){
    age_Y.push(employees_Yes["Age"][key])
    console.log(employees_Yes["Age"][key])
  });
  Object.keys(employees_No["Age"]).forEach(function(key){
    age_N.push(employees_No["Age"][key])
    console.log(employees_No["Age"][key])
  });
  Object.keys(employees_Yes["Count"]).forEach(function(key){
    count_Y.push(employees_Yes["Count"][key])
    console.log(employees_Yes["Count"][key])
  });
  Object.keys(employees_No["Count"]).forEach(function(key){
    count_N.push(employees_No["Count"][key])
    console.log(employees_No["Count"][key])
  });
  console.log(age_Y)
  
  var trace1 = { 
    x:age_N ,
    y: count_N,
    fill: 'tonexty', 
    type: 'scatter', 
    mode: 'none',
    name: "No",
   };
 
  var trace2 = { 
    x:age_Y,
    y: count_Y, 
    fill: 'tozeroy',
    type: 'scatter', 
    mode: 'none',
    name: "Yes" };

  

  var layout = { 
    title: 'Attrition by age ',
    font:{
      family: 'Raleway, sans-serif'
    },
    showlegend: true,
    xaxis:{title:"Ages"},
    yaxis:{title:"Attrition"}
    }; 
  

  var data = [trace1, trace2];

  Plotly.newPlot('stacked', data, layout);
});


// select the buttons
var button1 = d3.select("#case1");
button1.on("click",case1);
var button2 = d3.select("#case2");
button2.on("click",case2);
var button3 = d3.select("#case3");
button3.on("click",case3);
var button4 = d3.select("#case4");
button4.on("click",case4);


function case1(){
  d3.json(`/api/turnover/prediction`).then((incomingData) =>{
    var predictions = incomingData.employees;
    console.log(predictions["P1"][0])
    var output = d3.select("#result1");
    var result = output.append("h4");
    result.text(predictions["P1"][0]);
  })

}

function case2(){
  d3.json(`/api/turnover/prediction`).then((incomingData) =>{
    var predictions = incomingData.employees;
    console.log(predictions["P2"][0])
    var output = d3.select("#result2");
    var result = output.append("h4");
    result.text(predictions["P2"][0]);
  })

}
function case3(){
  d3.json(`/api/turnover/prediction`).then((incomingData) =>{
    var predictions = incomingData.employees;
    console.log(predictions["P3"][0])
    var output = d3.select("#result3");
    var result = output.append("h4");
    result.text(predictions["P3"][0]);
  })

}
function case4(){
  d3.json(`/api/turnover/prediction`).then((incomingData) =>{
    var predictions = incomingData.employees;
    console.log(predictions["P4"][0])
    var output = d3.select("#result4");
    var result = output.append("h4");
    result.text(predictions["P4"][0]);
  })

}
    


  



