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
        console.log(tempVal);
      	acc.push(tempVal);
      }
      else {
      	//tempVal = next;
        acc.push(next);
      }
      return acc;
    }, []);
    console.log(tempArr);

    let opArray = [];

    for(let element of tempArr) {
    	console.log('element: ' + element);
    	if(element == "=") {
      	accumulator = opArray[0];
        console.log(opArray);
        break;
      }
      opArray.push(element);
        console.log(opArray);

      if(opArray.length == 3) {
      	console.log('opArray: ' + opArray);
      	let result = operation(opArray);
        opArray.length = 0;
        opArray.push(result);
        console.log("op accum: " + opArray);
      }

    }

    console.log(accumulator);
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
  function deleteEntry() {

    if(currentEntry !== '') {
      currentEntry = '';
    }
    else{
      entireOperation.pop();
    }

  }
  return {
    increment: function(x) {
      entry(x);
    },
    operation: function(op) {
    	updateOp(op);
    },
    clearEntry: function() {
      console.log('clear');
    	deleteEntry();
    },
    clear: function() {
      entireOperation.length = 0;
      currentEntry = '';
    },
    equals: function(sum) {
    	entireOperation.push(currentEntry);
      entireOperation.push(sum);
    	total();
    },
    value: function() {
      console.log(entireOperation);
    }
  };
})();



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


  });


  $('#equals').on('click', function() {
    let $equals = $('#equals');
    let equalsValue = $equals.text().replace(/\s/g, "");
    console.log(equalsValue);
    display.value();
    display.equals(equalsValue);

  });

  $('#clearEntry').on('click', function() {
    console.log("Clear entry button has been pressed");
    display.clearEntry();
  });

  $('#allClear').on('click', function() {
    console.log("All clear button has been pressed.");
    display.clear();
  });

});
