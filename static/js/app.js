
$(document).ready(function(){
  console.log('Load page and hide ')
  // select the buttons
  var button1 = d3.select("#case1");
  button1.on("click",case1);
  var button2 = d3.select("#case2");
  button2.on("click",case2);
  var button3 = d3.select("#case3");
  button3.on("click",case3);
  var button4 = d3.select("#case4");
  button4.on("click",case4);

  // Load predicted values
  d3.json(`/api/turnover/prediction`).then((incomingData) =>{
    var predictions = incomingData.employees;
    //Load results
    d3.select("#result1").append("span").text(predictions["P1"][0]);
    d3.select("#result2").append("span").text(predictions["P2"][0]);
    d3.select("#result3").append("span").text(predictions["P3"][0]);
    d3.select("#result4").append("span").text(predictions["P4"][0]);
    console.log('Load content')

    $("#result1").hide();
    $("#result2").hide();
    $("#result3").hide();
    $("#result4").hide();
  
  })

  
});

function case1(){
  console.log('Show')
  $("#result1").toggle();

  /*
  d3.json(`/api/turnover/prediction`).then((incomingData) =>{
    var predictions = incomingData.employees;
    console.log(predictions["P1"][0])
    var output = d3.select("#result1");
    var result = output.append("h4");
    result.text(predictions["P1"][0]);
  })
  */

}

function case2(){
  $("#result2").toggle();
  /*
  d3.json(`/api/turnover/prediction`).then((incomingData) =>{
    var predictions = incomingData.employees;
    console.log(predictions["P2"][0])
    var output = d3.select("#result2");
    var result = output.append("h4");
    result.text(predictions["P2"][0]);
  })
  */

}
function case3(){
  $("#result3").toggle();
  /*
  d3.json(`/api/turnover/prediction`).then((incomingData) =>{
    var predictions = incomingData.employees;
    console.log(predictions["P3"][0])
    var output = d3.select("#result3");
    var result = output.append("h4");
    result.text(predictions["P3"][0]);
  })
  */

}
function case4(){
  $("#result4").toggle();
  /*
  d3.json(`/api/turnover/prediction`).then((incomingData) =>{
    var predictions = incomingData.employees;
    console.log(predictions["P4"][0])
    var output = d3.select("#result4");
    var result = output.append("h4");
    result.text(predictions["P4"][0]);
  })
  */

}
    


  



