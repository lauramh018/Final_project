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
    x:age_Y,
    y: count_Y, 
    fill: 'tozeroy',
    type: 'scatter', 
    mode: 'none' };

  var trace2 = { 
    x:age_N ,
    y: count_N,
    fill: 'tonexty', 
    type: 'scatter', 
    mode: 'none' };

  var layout = { 
    title: 'Attrition by age ',
    font:{
      family: 'Raleway, sans-serif'
    },
    showlegend: true,
    xaxis:{title:"Attrition"},
    yaxis:{title:"% Employees"}
    }; 
  

  var data = [trace1, trace2];

  Plotly.newPlot('stacked', data, layout);
});





    