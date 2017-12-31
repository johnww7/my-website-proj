$(document).ready(function() {

  var accumulator = "";
  var currentEntry = "";
  var entireOperation = "";

  $('.digitBtn').on('click', function() {
    let buttonID = this.id;
    let buttonIDVal = document.getElementById(buttonID);
    let buttonVal = $( buttonIDVal ).text();
    console.log("Button pressed: " + buttonVal);
  /*  if(buttonIDVal === "decimal") {
      currentEntry += '.';
    }
    else {*/
      currentEntry += buttonVal;
    //}

    console.log(currentEntry);
  });

  $('.arithmeticBtn').on('click', function() {
    let buttonId = this.id;
    let buttonIdVal = document.getElementById(buttonId);
    let buttonValue = $( buttonIdVal ).text();
    console.log("Button pressed: " + buttonValue);
    if(accumulator !== "") {
      let tempAcc = Number(accumulator);
      let tempCurr = Number(currentEntry);
      let tempOperation = accumulator + currentEntry + buttonValue ;
      console.log(tempOperation);
    }
    else {
      accumulator = currentEntry + buttonValue;
      currentEntry = "";
      console.log(accumulator);
    }

  });

  $('.funcBtn').on('click', function() {
    let buttonId = this.id;
    let buttonIdValue = document.getElementById(buttonId);
    let buttonFunc = $( buttonIdValue ).text();
    console.log("Button pressed: " + buttonFunc);
  });

});
