

d3.json("/api/turnover/generation").then((incomingData) =>{
    
    var employees = incomingData.employees;
    var attrition = [];
    var values = [];
    var generation = [];
    // console.log(employees);


    Object.keys(employees["Attrition"]).forEach(function(key){
       attrition.push(employees["Attrition"][key])
      //  console.log(employees["Attrition"][key])
    });

    Object.keys(employees["Per"]).forEach(function(key){
      values.push(employees["Per"][key])
      // console.log(employees["Per"][key])
   });

   Object.keys(employees["Generation"]).forEach(function(key){
    generation.push(employees["Generation"][key])
    // console.log(employees["Generation"][key])
   });

    
    var uniqueNames = ["Gen Z","Milennials","Gen X","Baby Boomers"];
    var x = ["Yes","No"];
    
    var traces = [];
    var colors = ["1A1825","2B9A9D","4BAED1","4F8088"]
    
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

})


