// Import Data
d3.json("/Employee_Attrition.json").then((Attrition) =>{

  // Read all rows
  Attrition.forEach(row => {
      console.log(row)
  });
});





    