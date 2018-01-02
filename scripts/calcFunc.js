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
      entireOperation = tempOperation;
      console.log('Entire entry now: ' + entireOperation);
      currentEntry = "";
      accumulator = tempOperation;
    }
    else {
      accumulator = currentEntry + buttonValue;
      currentEntry = "";
      console.log(accumulator);
    }

  });

/*  $('.funcBtn').on('click', function() {
    let buttonId = this.id;
    let buttonIdValue = document.getElementById(buttonId);
    console.log(buttonIdValue);
    let buttonFunc = $( buttonIdValue ).text();
    let buttonPressed = $( buttonIdValue ).attr('id');
    console.log("Button pressed: " + buttonFunc);
    if(buttonPressed == 'equals') {
      console.log("accum: " + accumulator + "curr: " + currentEntry);
    }

  });*/

  $('#equals').on('click', function() {
    let $equals = $('#equals');
    let equalsValue = $equals.text();
    console.log(equalsValue);
    console.log("accum: " + accumulator + "curr: " + currentEntry);
    entireOperation = accumulator + currentEntry + equalsValue;
    console.log(entireOperation);
    accumulator = "";
    currentEntry = "";
  });

  $('#clearEntry').on('click', function() {
    console.log("Clear entry button has been pressed");
  });

  $('#allClear').on('click', function() {
    console.log("All clear button has been pressed.");
  });

});

/*
var display = (function() {
  var accumulator = [];
  var currentEntry = '';
  var entireOperation = '';
  function entry(val) {
    currentEntry += val;
    console.log(currentEntry);
  }
  function updateAcc(data) {
  	accumulator.push(currentEntry);
  	accumulator.push(data);
  }
  return {
    increment: function(x) {
      entry(x);
    },
   decrement: function() {
      privateString = privateString.slice(0,-1);
    },
    equals: function() {
			totalString = privateString;
      return totalString;
    },
    operation: function(op) {
    	updateAcc(op);
    },
    resetEntry: function() {
    	currentEntry = '';
    },
    value: function() {
      return accumulator;
    }
  };
})();
*/
