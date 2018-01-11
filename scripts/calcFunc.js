$(document).ready(function() {

  //An anonymous function with closures used to store private variables and functions for
  //the calculator created and stored in the variable display.
  var display = (function() {
  /*
   *Private local variables that holds the entire arithemetic operation, current entry
   *being entered in and accumulated value from that operation.
  */
  var accumulator = 0;
  var currentEntry = '0';
  var entireOperation = [];

  /*
    Private function that takes the current entry pressed and assigns to private local
    variable currentEntry.
  */
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
  /*
    Private function handles the input of arithmetic operators such as multiplication,
    division, subtraction and addition when pressed. Checks to see if last entry into
    entireOperation array is an arithmetic operator or not. If true, clears currentEntry
    variable, and if false pushes currentEntry and operator to entireOperation array,
    then clears currentEntry.
  */
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

  /*
    Private Total function calculates the sum of the arithmetic operation stored in the
    entireOperation array.
  */
  function total() {
  	var testExp = /[+-×÷−]/; //Regexp looking for arithmetic operators

    /*
      Reduce method is applied to entireOperation array parsing string elements that have
      numbers into floating point numbers and storing them tempArr which is an array.
    */
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

    /*
      The For loop, loops through tempArr array pushing in elements that are not '=' into
      opArray array until it's length is equal to 3. Then it calls operation function and
      assigns return value to result variable, clears opArray arry and then pushes result
      to opArray. When element is equal to '=', Math.round function is used on opArray
      array and result is rounded to 3 decimal places and is assigned to accumulator.
    */
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

    //Accumulator value is pushed into entireOperation array.
    entireOperation.push(accumulator);

  }

  /*
    Operation function performs arithmetic operation of either multiplication, addition,
    subtraction or division based on the array passed to the arr parameter. The switch
    statement performs calculation based on element 1 of array, and returns value stored
    in retVal variable back to calling function.
  */
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

  //deleteEntry function either clears currentyEntry variable if it's not empty or
  //pops the last element off of entireOperation array.
  function deleteEntry() {

    if(currentEntry !== '') {
      currentEntry = '';
    }
    else{
      entireOperation.pop();
    }

  }
  //Public functions that are returned from the anonymous function that can access the
  //private variables/arrays and private functions.
  return {
    //Calls private entry function and passes a value stored in x variable.
    increment: function(x) {
      entry(x);
    },
    //Calls private updateOp function and passes value stored in op variable
    operation: function(op) {
    	updateOp(op);
    },
    //Calls private deleteEntry function.
    clearEntry: function() {
    	deleteEntry();
    },
    //Function clears private entireOperation array and private currentEntry variable.
    clear: function() {
      entireOperation.length = 0;
      currentEntry = '';
    },
    /*
      Function returns last element of privat eentireOperation arry if currentEntry blank, or
      pushes currentEntry, and the paramater sum variable to entireOperation value, then calls
      private function total, and returns value stored in private accumulator variable.
    */
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
    //Returns private entireOperation array as a string.
    getEntireOperation: function() {
      return entireOperation.join('');
    },
    //Returns value stored in private currentEntry variable.
    getCurrentEntry: function() {
      return currentEntry;
    }

  };
})();

  //Cached DOM elements.
  var $outputDisplay = $('#outputDisplay');
  var $inputDisplay = $('#inputDisplay');

  /*
    Event handler attached to the css class '.digitBtn', which is assigned to
    the digit buttons and performs the handler when button has been clicked.
  */
  $('.digitBtn').on('click', function() {
    //Variable contains the id name of the button element clicked.
    let buttonID = this.id;
    //Gets the element with the id value stored in buttonID
    let buttonIDVal = document.getElementById(buttonID);
    //Gets the text stored in buttonIDVal element.
    let buttonVal = $( buttonIDVal ).text();
    let digitValue = buttonVal.replace(/\s/g, ""); //Removes leading and trailing whitespace.

    //Calls public function increment from display closure and passes value of button pressed.
    display.increment(digitValue);

    //Calls displa.getCurrentEntry function and stores return value to digitEntry variable.
    let digitEntry = display.getCurrentEntry();

    //inputDisplay DOM element text is set to digitEntry value.
    $inputDisplay.text(digitEntry);

    //Retrieves outputDisplay DOM element text without leading/trailing whitespace.
    let tempOperationValue = $outputDisplay.text().replace(/\s/g, "");
     //Stores last character position of tempOperationValue string.
    let lastCharc = tempOperationValue.length-1;

    /*
      If...else statements check variables digitValue and tempOperationValue, and DOM element
      outputDisplay for certain conditions, so outputDisplay DOM element can set it's text.
    */
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

  /*
    Event handler attached to the css class '.arithmeticBtn', which is assigned to
    the arithmetic operator buttons and performs the handler when button has been clicked.
  */
  $('.arithmeticBtn').on('click', function() {
    //Variable contains the id name of the button element clicked.
    let buttonId = this.id;
    //Gets the text stored in buttonIDVal element.
    let buttonIdVal = document.getElementById(buttonId);
    //Gets the text stored in buttonIDVal element.
    let buttonValue = $( buttonIdVal ).text();
    //Removes leading and trailing whitespace from buttonValue variable.
    let arithVal = buttonValue.replace(/\s/g, "");

    //Calls display.operation function and passes it arithmetic operator pressed.
    display.operation(arithVal);

    //Sets inputDisplay DOM element text to value of arithVal variable.
    $inputDisplay.text(arithVal);

    //Appends value of arithVal variable to outputDisplay DOM element.
    $outputDisplay.append(arithVal);
  });

  /*
    Event handler attached to the button with the id 'equals', when button is clicked the
    handler calculates the sum of the operation.
  */
  $('#equals').on('click', function() {
    let $equals = $('#equals');
    let equalsValue = $equals.text().replace(/\s/g, "");

    //Calls display.equals function, passes it the equals symbol as an argument and assigns
    //return vale to sum variable.
    let sum = display.equals(equalsValue);

    //Calls display.getEntireOperation function and assigns operation value to operationStr variable
    let operationStr = display.getEntireOperation();
    $outputDisplay.text(operationStr); //set DOM element text value to operationStr value
    console.log(operationStr);
    $inputDisplay.text(sum); //sets DOM element text to sum value.
    display.clear(); //calls to display.clear function
  });

  /*
    Event handler attached to button with id 'clearEntry', when button is clicked the handler
    clears the current entry.
  */
  $('#clearEntry').on('click', function() {
    console.log("Clear entry button has been pressed");
    //Calls display.clearEntry function, to clear entry.
    display.clearEntry();
    //display.getEntireOperation function assigns operation value to operation variable
    let operation = display.getEntireOperation();

    //If...else statement tests operation variable for if it's not empty, if so sets
    //inputDisplay DOM element text to 0 and outputDisplay element text to operation variable
    //value. If false, sets inputDisplay and outputDisplay DOM element text value to 0.
    if(operation !== '' ) {
      $inputDisplay.text('0');
      $outputDisplay.text(operation);
    }
    else {
      $inputDisplay.text('0');
      $outputDisplay.text('0');
    }
  });

  /*
    Event handler attached to button with id 'allClear', when button is clicked the
    handler clears the display.
  */
  $('#allClear').on('click', function() {
    console.log("All clear button has been pressed.");
    //Call to display.clear function clears the entry and operation string.
    display.clear();
    //outputDisplay and inputDisplay DOM element text is set to '0'.
    $outputDisplay.text('0');
    $inputDisplay.text('0');
  });

});
