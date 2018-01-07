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
      console.log('what');
    }

    console.log(currentEntry);
  }
  function updateOp(data) {
    let lastEntry = entireOperation[entireOperation.length-1];
    let arithExp = /[+-×÷−]/;
    if(arithExp.test(lastEntry) && currentEntry == '') {
      console.log("last entry: " + lastEntry);
      console.log(entireOperation);
      currentEntry = '';
    }
    else {
  	  entireOperation.push(currentEntry);
  	  entireOperation.push(data);
      console.log(entireOperation);
      currentEntry = '';
    }
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
      	  acc.push(next);
      }
      return acc;
    }, []);
    console.log(tempArr);

    let opArray = [];

    for(let element of tempArr) {
    	console.log('element: ' + element);
    	if(element == "=") {
      	accumulator = Math.round(opArray[0]*1000)/1000;
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
    entireOperation.push(accumulator);
    console.log(entireOperation);
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
      console.log(entireOperation);
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
    console.log("Button pressed: " + digitValue);

    display.increment(digitValue);
      //currentEntry += buttonVal;
    let digitEntry = display.getCurrentEntry();
    $inputDisplay.text(digitEntry);
    console.log('current input: ' + digitEntry);

    let tempOperationValue = $outputDisplay.text().replace(/\s/g, "");
    let lastCharc = tempOperationValue.length-1;
    console.log('Curr op: ' + tempOperationValue);
    
    if(($outputDisplay.text() == 0 || $outputDisplay.text() == '0') && digitValue !== '.' &&
      tempOperationValue.charAt(lastCharc) !== '.'){
      console.log('just started');
      $outputDisplay.text(digitValue);
    }
    else if(tempOperationValue.charAt(tempOperationValue.length-1) == '.' && digitValue == '.') {
      $outputDisplay.text(tempOperationValue);
      console.log('look here');
    }
    else if($outputDisplay.text() !== '' && tempOperationValue.search('=') == -1) {
      console.log('Here: ' + tempOperationValue.search('='));
      $outputDisplay.append(digitValue);
    }
    else if(($outputDisplay.text() == 0 || $outputDisplay.text() == '0') && digitValue == '.') {
      //$outputDisplay.append(digitValue);
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
    console.log("Button pressed: " + buttonValue);
    display.operation(arithVal);
    $inputDisplay.text(arithVal);
    $outputDisplay.append(arithVal);
  });


  $('#equals').on('click', function() {
    let $equals = $('#equals');
    let equalsValue = $equals.text().replace(/\s/g, "");
    console.log(equalsValue);

    let sum = display.equals(equalsValue);
    let operationStr = display.getEntireOperation();
    $outputDisplay.text(operationStr);
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
