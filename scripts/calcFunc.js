$(document).ready(function() {

  var display = (function() {
  var accumulator = 0;
  var currentEntry = '';
  var entireOperation = [];
  function entry(val) {
    currentEntry += val;
    console.log(currentEntry);
  }
  function updateOp(data) {
  	entireOperation.push(currentEntry);
  	entireOperation.push(data);
    console.log(entireOperation);
    currentEntry = '';
  }
  function total() {
  	var testExp = /[+-×÷−]/;
    var tempArr = entireOperation.reduce(function(acc, next) {
    	let tempVal = Number.parseFloat(next);

    	if(Number.isNaN(tempVal) == false){
      	//tempVal = Number.parseFloat(next);
        console.log(tempVal);
      	acc.push(tempVal);
      }
      else {
      	//tempVal = next;
        acc.push(next);
      }
      return acc;
    }, []);
    console.log(temp);


  //  console.log(accumulator);
  }
  function operation(arr) {
  	let retVal = 0;
  	switch(arr[1]) {
    	case '+':
      	retVal = arr[0] + arr[2];
        break;
      case '-':
      case '−':
      	retVal = arr[0] - arr[2];
        break;
      case '×':
      	retVal = arr[0] * arr[2];
        break;
      case '÷':
      	retVal = arr[0] / arr[2];
        break;
      default:
      	retVal = undefined;
        break;
    }
    return retVal;
  }
  return {
    increment: function(x) {
      entry(x);
    },
    operation: function(op) {
    	updateOp(op);
    },
    resetEntry: function() {
    	currentEntry = '';
    },
    equals: function() {
    	entireOperation.push(currentEntry);
    	total();
    },
    value: function() {
      console.log(entireOperation);
    }
  };
})();

//  var accumulator = "";
//  var currentEntry = "";
//  var entireOperation = "";

  $('.digitBtn').on('click', function() {
    let buttonID = this.id;
    let buttonIDVal = document.getElementById(buttonID);
    let buttonVal = $( buttonIDVal ).text();
    console.log("Button pressed: " + buttonVal);

    display.increment(buttonVal);
      //currentEntry += buttonVal;

  });

  $('.arithmeticBtn').on('click', function() {
    let buttonId = this.id;
    let buttonIdVal = document.getElementById(buttonId);
    let buttonValue = $( buttonIdVal ).text();
    let arithVal = buttonValue.replace(/\s/g, "");
    console.log("Button pressed: " + buttonValue);
    display.operation(arithVal);
  /*  if(accumulator !== "") {
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
    }*/

  });


  $('#equals').on('click', function() {
    let $equals = $('#equals');
    let equalsValue = $equals.text();
    console.log(equalsValue);
    display.value();
  /*  console.log("accum: " + accumulator + "curr: " + currentEntry);
    entireOperation = accumulator + currentEntry + equalsValue;
    console.log(entireOperation);
    accumulator = "";
    currentEntry = "";*/
  });

  $('#clearEntry').on('click', function() {
    console.log("Clear entry button has been pressed");
  });

  $('#allClear').on('click', function() {
    console.log("All clear button has been pressed.");
  });

});
