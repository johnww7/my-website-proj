$(document).ready(function() {

  var display = (function() {
  var accumulator = 0;
  var currentEntry = '0';
  var entireOperation = [];

  function entry(val) {
    if(currentEntry == '0' && val !== '.') {
      currentEntry = val;
    }
    else if(currentEntry.charAt(currentEntry.length-1) !== '.' || val !== '.') {
      currentEntry += val;
    }
    else {
      currentEntry = currentEntry;
    }

  }
  function updateOp(data) {
    let lastEntry = entireOperation[entireOperation.length-1];
    let arithExp = /[+-×÷−]/;
    if(arithExp.test(lastEntry) && currentEntry == '') {
      console.log(entireOperation);
      currentEntry = '';
    }
    else {
  	  entireOperation.push(currentEntry);
  	  entireOperation.push(data);
      currentEntry = '';
    }
  }
  function total() {
  	var testExp = /[+-×÷−]/;
    var tempArr = entireOperation.reduce(function(acc, next) {
    	let tempVal = Number.parseFloat(next);

    	if(Number.isNaN(tempVal) == false){
      	acc.push(tempVal);
      }
      else {
      	  acc.push(next);
      }
      return acc;
    }, []);

    let opArray = [];

    for(let element of tempArr) {
    	if(element == "=") {
      	accumulator = Math.round(opArray[0]*1000)/1000;
        break;
      }
      opArray.push(element);

      if(opArray.length == 3) {
      	let result = operation(opArray);
        opArray.length = 0;
        opArray.push(result);
      }

    }

    entireOperation.push(accumulator);
  
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
    	deleteEntry();
    },
    clear: function() {
      entireOperation.length = 0;
      currentEntry = '';
    },
    equals: function(sum) {
      if(currentEntry == '') {
        return entireOperation[entireOperation.length-1];
      }
      else {
    	  entireOperation.push(currentEntry);
        entireOperation.push(sum);
    	  total();
        return accumulator;
      }
    },
    getEntireOperation: function() {
      return entireOperation.join('');
    },
    getCurrentEntry: function() {
      return currentEntry;
    }

  };
})();

  var $outputDisplay = $('#outputDisplay');
  var $inputDisplay = $('#inputDisplay');

  $('.digitBtn').on('click', function() {
    let buttonID = this.id;
    let buttonIDVal = document.getElementById(buttonID);
    let buttonVal = $( buttonIDVal ).text();
    let digitValue = buttonVal.replace(/\s/g, "");

    display.increment(digitValue);

    let digitEntry = display.getCurrentEntry();
    $inputDisplay.text(digitEntry);

    let tempOperationValue = $outputDisplay.text().replace(/\s/g, "");
    let lastCharc = tempOperationValue.length-1;

    if(($outputDisplay.text() == 0 || $outputDisplay.text() == '0') && digitValue !== '.' &&
      tempOperationValue.charAt(lastCharc) !== '.'){
      $outputDisplay.text(digitValue);
    }
    else if(tempOperationValue.charAt(tempOperationValue.length-1) == '.' && digitValue == '.') {
      $outputDisplay.text(tempOperationValue);
    }
    else if($outputDisplay.text() !== '' && tempOperationValue.search('=') == -1) {
      $outputDisplay.append(digitValue);
    }
    else if(($outputDisplay.text() == 0 || $outputDisplay.text() == '0') && digitValue == '.') {
      $outputDisplay.text('0' + digitValue);
    }
    else {
      $outputDisplay.text(digitValue);
    }
    console.log("Current outDisplay: " + $outputDisplay.text());

  });

  $('.arithmeticBtn').on('click', function() {
    let buttonId = this.id;
    let buttonIdVal = document.getElementById(buttonId);
    let buttonValue = $( buttonIdVal ).text();
    let arithVal = buttonValue.replace(/\s/g, "");

    display.operation(arithVal);
    $inputDisplay.text(arithVal);
    $outputDisplay.append(arithVal);
  });


  $('#equals').on('click', function() {
    let $equals = $('#equals');
    let equalsValue = $equals.text().replace(/\s/g, "");

    let sum = display.equals(equalsValue);
    let operationStr = display.getEntireOperation();
    $outputDisplay.text(operationStr);
    console.log(operationStr);
    $inputDisplay.text(sum);
    display.clear();
  });

  $('#clearEntry').on('click', function() {
    console.log("Clear entry button has been pressed");
    display.clearEntry();
    let operation = display.getEntireOperation();
    if(operation !== '' ) {
      $inputDisplay.text('0');
      $outputDisplay.text(operation);
    }
    else {
      $inputDisplay.text('0');
      $outputDisplay.text('0');
    }
  });

  $('#allClear').on('click', function() {
    console.log("All clear button has been pressed.");
    display.clear();
    $outputDisplay.text('0');
    $inputDisplay.text('0');
  });

});
