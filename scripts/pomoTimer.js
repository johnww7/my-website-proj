$(document).ready(function() {

  //Cache DOM elements
  let $breakLength = $('#breakLength');
  let $timerLength = $('#timerLength');
  let $timer = $('#timer');
  let $timerDisplay = $('#timerDisplay');
  let $pomodoroContainer = $('#pomodoroContainer');
  let $sessionSettings = $('#sessionSettings');
  let $breakSettings = $('#breakSettings');

  let timeID; //identifies the timer created by setTimeout()
  let timerButtonToggle = false; //holds timerDisplay on/off value when pressed
  let timerOn = true; //identifies if timer is on or break is on
  let interval = 1000; //ms
  let initialStart; //holds initial time of clock in milliseconds elapsed from Unix epoch.

  let timerTime = 1500; //holds timer length in seconds.
  let breakTime = 300; //holds break length in seconds.
  let newVertPos = 0; //holds vertical position percent for background-position
  //holds vertical percent increment for timer based on timer length
  let timerPercent = Math.round((100/timerTime) * 100)/100;;
  //holds vertical percent decrement for break based break length
  let breakPercent = -Math.round((100/breakTime) * 100)/100;
  let verticalNum = timerPercent; //holds either break/timer percent value

  /*----------------------------------------------------------------------
    Listens for click event on increase/decrease buttons for break settings. Either increases,
    or decreases break value, or stays the same. Also cursor turns to a pointer when hovered
    over buttons.
  -----------------------------------------------------------------------*/
  $('#increaseBreak, #decreaseBreak').on('click', function() {
    let buttonId = $(this).attr('id'); //holds what button has been pressed id
    let currBreakTime = $breakLength.text().replace(/\s/g, ""); //holds break length value
    let incBreak = 0; //temp stores updated increased break value
    let decBreak = 0; //temp stores updated decreased break value.

    //----------------------------------------------------------------------------
    //If clock timer has been stopped, and timerOn is true/false, you can increase or decrease break length
    //unless decrease button pressed and break length is 1, then value stays 1. Calculate new break time
    //time in seconds, and break decrement percent. Also if timerOn is false
    //then reset timer animation.
    //-----------------------------------------------------------------------------
    if(buttonId == 'increaseBreak' && timerButtonToggle == false && timerOn == true) {
      incBreak =  parseInt(currBreakTime) + 1;
      breakTime = incBreak * 60;
      $breakLength.text(incBreak);

    }
    else if(buttonId == 'decreaseBreak' && timerButtonToggle == false && (currBreakTime == '1' || currBreakTime == 1)) {
      $breakLength.text(currBreakTime);
      breakTime = parseInt(currBreakTime) * 60;
      if(timerOn == false) {
        $timer.text(currBreakTime + ":00");
        breakPercent = -Math.round((100/breakTime) * 100)/100;
        verticalNum = breakPercent;
        resetTimerAnimation();
      }

    }
    else if(buttonId == 'decreaseBreak' && timerButtonToggle == false && timerOn == true) {

      decBreak = parseInt(currBreakTime) - 1;
      breakTime = decBreak * 60;
      $breakLength.text(decBreak);

    }
    else if(timerButtonToggle == false && timerOn == false && buttonId == 'increaseBreak') {
      incBreak =  parseInt(currBreakTime) + 1;
      breakTime = incBreak * 60;
      $breakLength.text(incBreak);
      $timer.text(incBreak + ":00");
      breakPercent = -Math.round((100/breakTime) * 100)/100;
      verticalNum = breakPercent;
      resetTimerAnimation();
    }
    else if(timerButtonToggle == false && timerOn == false && buttonId == 'decreaseBreak') {
      decBreak = parseInt(currBreakTime) - 1;
      breakTime = decBreak * 60;
      $breakLength.text(decBreak);
      $timer.text(decBreak + ":00");
      breakPercent = -Math.round((100/breakTime) * 100)/100;
      verticalNum = breakPercent;
      resetTimerAnimation();
    }
    else {
      console.log('error');
    }
    //Calculate the break decrement percent from break length and round 2 decimal places.
    breakPercent = -Math.round((100/breakTime) * 100)/100;

  }).css('cursor', 'pointer');

  //---------------------------------------------------------------------------
  //Listens for click event on increase/decrease buttons for session settings. Either increases,
  //or decreases timer value, or stays the same. Also cursor turns to a pointer when hovered
  //over buttons.
  //---------------------------------------------------------------------------
  $('#increaseTimer, #decreaseTimer').on('click', function() {
    let id = $(this).attr('id'); //holds id of button that has pressed
    let currTimerTime = $timerLength.text().replace(/\s/g, ""); //hold current value of timer length.

    //-------------------------------------------------------------------------
    //If clock is stopped, and timerOn is true/false either increase value, decrease value or timer value
    //stays same if 1 and decreased button is pressed. Also calculate
    //new timer time in seconds and timer percent increment. If timerOn is true also reset
    //timer animation.
    //-------------------------------------------------------------------------

    if(id == 'increaseTimer' && timerButtonToggle == false && timerOn == true) {
      let incTime =  parseInt(currTimerTime) + 1;
      timerTime = incTime * 60;
      timerPercent  = Math.round((100/timerTime) * 100)/100;
      verticalNum = timerPercent;
      $timerLength.text(incTime);
      $timer.text(incTime + ":00");
      resetTimerAnimation();
    }
    else if(id == 'decreaseTimer' && timerButtonToggle == false && (currTimerTime == '1' || currTimerTime == 1)) {
      $timerLength.text(currTimerTime);
      timerTime = parseInt(currTimerTime) * 60;
      timerPercent  = Math.round((100/timerTime) * 100)/100;
      if(timerOn == true) {
        $timer.text(currTimerTime + ":00");
        verticalNum = timerPercent;
        resetTimerAnimation();
      }

    }
    else if(id == 'decreaseTimer' && timerButtonToggle == false && timerOn == true) {
      let decTime = parseInt(currTimerTime) - 1;
      timerTime = decTime * 60;
      timerPercent  = Math.round((100/timerTime) * 100)/100;
      verticalNum = timerPercent;
      $timerLength.text(decTime);
      $timer.text(decTime + ":00");
      resetTimerAnimation();
    }
    else if(timerButtonToggle == false && timerOn == false && id == 'increaseTimer') {
      $timerLength.text(currTimerTime);
      timerTime = parseInt(currTimerTime) * 60;
      timerPercent  = Math.round((100/timerTime) * 100)/100;
    }
    else if(timerButtonToggle == false && timerOn == false && id == 'decreaseTimer') {
      $timerLength.text(currTimerTime);
      timerTime = parseInt(currTimerTime) * 60;
      timerPercent  = Math.round((100/timerTime) * 100)/100;
    }
    else {
      console.log('error');
    }

  }).css('cursor', 'pointer');

  //-----------------------------------------------------------------------------
  //Listen for click event on timerDisplay or heading id DOM element, or breakSessionLength
  //class on DOM elements. When pressed toggles timerButtonToggle variable between true/false
  //for when clock is on(true) or off(false). Also cursor turns to a pointer when hovered on
  //selected DOM elements.
  //-----------------------------------------------------------------------------
  $('#timerDisplay, #heading, .breakSessionLength').on('click', function() {
    //holds current clock timer time.
    let currentDisplay = $timer.text().replace(/\s/g, "");

    //-----------------------------------------------------------------------
    //If timerButtonToggle is false when pressed, set it to true, call displayAnimation
    //function passing timerButtonToggle value to it, initialize in milliseconds start time
    //for setTimeout function call passing startTime function, interval and current clock timer time.
    //Else set timerButtonToggle to false, call displayAnimation function and stop clock by calling
    //clearTimeout function passing timeID variable.
    //----------------------------------------------------------------------
    if(!timerButtonToggle) {
      timerButtonToggle = true;
      displayAnimation(timerButtonToggle);
      initialStart = Date.now() + interval;
      setTimeout(startTime, interval, currentDisplay);
    }
    else {
      timerButtonToggle = false;
      displayAnimation(timerButtonToggle);
      clearTimeout(timeID);

    }

  }).css('cursor', 'pointer');

  //-------------------------------------------------------------------------
  //Function takes clock time currently displayed when called as a parameter.
  //Performs clock countdown every second and background color transition movement
  //based on whether its break time or timer session time.
  //-------------------------------------------------------------------------
  function startTime(time) {
  	let timeArr = []; //holds hh:mm:ss time in an array format.
    let hour = 0; //holds hour value from timeArr array
    let minute = 0; //holds minute value from timeArr array
    let second = 0; //holds seconds value from timeArr array

    //holds drift value for timer
    let drift = Date.now() - initialStart;

    //calls checkForReset function to see if timer has reached end.
    timeArr = checkForReset(time);

    //If timeArr length is 3, assign pos 0 to hour, pos 1 to minute, pos 2 to second
    //,else pos 0 to minute and pos 1 to second.
    if(timeArr.length == 3) {
    	hour = parseInt(timeArr[0])
    	minute = parseInt(timeArr[1]);
    	second = parseInt(timeArr[2]);
    }
    else {
    	minute = parseInt(timeArr[0]);
    	second = parseInt(timeArr[1]);
    }
    //Calculate current time into seconds.
    let totalTime = (hour * 60 * 60) + (minute * 60) + second;

    //If time parameter equals 00:00, keep totalTime and newVertPos values same,
    //else decrease total time by 1 and inc/decrease newVertPos.
    if(time == '00:00') {
      totalTime = totalTime;
      newVertPos = newVertPos;
    }
    else {
      totalTime -= 1;
      newVertPos = newVertPos + verticalNum;
    }

    //Call changeTransitionDirection function passing newVertPos value to see
    //if vertical position direction should be changed.
    vertPosition = changeTransitionDirection(newVertPos);

    let newHour = Math.floor((totalTime/3600) % 24);
    let newMinute = checkTime(Math.floor((totalTime/60) % 60));
    let newSecond = checkTime(Math.floor(totalTime % 60));

    let newTime = ""; //holds new time formatted as a string hh:mm:ss

    //If newHour is zero, then newTime is 'mm:ss' format, else newTime is
    //'hh:mm:ss' format
    if(newHour == 0 ) {
    	newTime = newMinute + ":" + newSecond;
    }
    else {
    	newTime = newHour + ":" + newMinute + ":" + newSecond;
    }

    let backgroundPos = "0% " + vertPosition  + "%"; //holds background-position value
    //sets cached DOM elements background-postion properties to backgroundPos value
    $timerDisplay.css("background-position", backgroundPos);
    $pomodoroContainer.css("background-position", backgroundPos);
    $sessionSettings.css("background-position", backgroundPos);
    $breakSettings.css("background-position", backgroundPos);

    $timer.text(newTime); //timer element text set to newTime

    initialStart += interval; //update initial start time by 1000.

    //setTimeout calls startTime function, corrects delay time and passes newTime as an argument
    timeID = setTimeout(startTime, Math.max(0, interval - drift), newTime);
  }

  //--------------------------------------------------------------------------
  //Functions checks newTime equal to '00:00', if so and timerOn is true get
  //text value from breakLength element, call endAlert modal element and return
  //tempBreak string as an Arry. If timerOn false get timerLength element text
  //value, call endAlert modal element and return tempDisp string as an array.
  //Else return newTime string split as an array.
  //------------------------------------------------------------------------
  function checkForReset(newTime) {

    if(newTime == '00:00' && timerOn == true) {
      timerOn = false;
      let tempBreak = $breakLength.text().replace(/\s/g, "");
      tempBreak = tempBreak + ':00';

      $('.modal-body').html('<h4>Take a break!</h4>');
      $('#endAlert').modal({backdrop: true});

      return tempBreak.split(':', 3);
    }
    else if(newTime == '00:00' && timerOn == false) {
      timerOn = true;
      let tempDisp = $timerLength.text().replace(/\s/g, "");
      tempDisp = tempDisp + ':00';

      $('.modal-body').html('<h4>Get back to work!</h4>');
      $('#endAlert').modal({backdrop: true});

      return tempDisp.split(':', 3);
    }
    else {
      return newTime.split(':', 3);
    }
  }

  //------------------------------------------------------------------------
  //Function checks value to see if less then 10, if so return value prepended
  //with a 0 infront of value. Else just return value back.
  //------------------------------------------------------------------------
  function checkTime(value) {
  	if(value < 10) {
    	value = "0" + value;
    }
    return value;
  }

  //--------------------------------------------------------------------------
  //Function removes/adds css classes to cached DOM elements based on if startFlag
  //equals true. Else compute elements background-position, then clear that property
  //by re-adding background-position property and computed value.
  //------------------------------------------------------------------------
  function displayAnimation(startFlag) {

    if(startFlag) {
      //If timerOn true, remove initial classes from selected elements and add
      //new ones, else if timerOn is false removed selected elements class and re-add
      //initial css class.
      if(timerOn) {
        $timerDisplay.removeClass('timerStart');
        $pomodoroContainer.removeClass('pomodoroConStart');
        $sessionSettings.removeClass('timerSettingStart');
        $breakSettings.removeClass('timerSettingStart');

        $timerDisplay.addClass('timerDown');
        $pomodoroContainer.addClass('pomodoroConDown');
        $sessionSettings.addClass('timerSettingDown');
        $breakSettings.addClass('timerSettingDown');
      }
      else {
        $breakSettings.removeClass('timerSettingDown');
        $timerDisplay.removeClass('timerDown');

        $breakSettings.addClass('timerSettingStart');
        $timerDisplay.addClass('timerStart');
      }

    }
    else {
      let computedStyle1 = $timerDisplay.css('background-position');
      let computedStyle2 = $pomodoroContainer.css('background-position');
      let computedStyle3 = $sessionSettings.css('background-position');
      let computedStyle4 = $breakSettings.css('background-position');

      $timerDisplay.css('background-position', computedStyle1);
      $pomodoroContainer.css('background-position', computedStyle2);
      $sessionSettings.css('background-position', computedStyle3);
      $breakSettings.css('background-position', computedStyle4);
    }
  }

  //-------------------------------------------------------------------------
  //Function resets background color transition position. If timerOn is true,
  //set newVertPos equal to 0, add initial css classes to selected DOM elements
  //and clear background-position property value for elements. Else set newVertPos
  //to 100, add css class to selected DOM elements and set css background-position
  //property to '0% 100%' for selected elements.
  //------------------------------------------------------------------------
  function resetTimerAnimation() {
    if(timerOn) {
      newVertPos = 0;

      $timerDisplay.addClass('timerStart');
      $pomodoroContainer.addClass('pomodoroConStart');
      $sessionSettings.addClass('timerSettingStart');
      $breakSettings.addClass('timerSettingStart');

      $timerDisplay.css('background-position', '');
      $pomodoroContainer.css('background-position', '');
      $sessionSettings.css('background-position', '');
      $breakSettings.css('background-position', '');
    }
    else {
      newVertPos = 100;

      $breakSettings.addClass('timerSettingStart');
      $timerDisplay.addClass('timerStart');

      $timerDisplay.css('background-position', '0% 100%');
      $pomodoroContainer.css('background-position', '0% 100%');
      $sessionSettings.css('background-position', '0% 100%');
      $breakSettings.css('background-position', '0% 100%');
    }
  }

  //--------------------------------------------------------------------------
  //Function has one parameter(verticalPosition), checks to see if vertical position
  //value for background-position should change to either 0 or 100 and vertical
  //number percent should change to break or timer percent. Else return verticalPosition
  //value back.
  //--------------------------------------------------------------------------
  function changeTransitionDirection(verticalPosition) {
     //If newVertPos greater/equal to expected position percentage and verticalNum value
     //is timerPercent. Change verticalNum to breakPercent, remove/add css classes to
     //select elements, and set/return newVertPos equal to 100
	   if((newVertPos >= (timerTime * timerPercent))&& verticalNum == timerPercent) {
     verticalNum = breakPercent;
     $breakSettings.removeClass('timerSettingDown');
     $timerDisplay.removeClass('timerDown');
     $breakSettings.addClass('timerSettingStart');
     $timerDisplay.addClass('timerStart');

     newVertPos = 100;
     return newVertPos;
    }
    //newVertPos less/equal to expected position percentage and verticalNum is breakPercent
    //. Change verticalNum to timerPercent, remove/add css classes to selected elements and
    // set/return newVertPos equal to 0.
    else if((newVertPos <= (100 + breakTime * breakPercent))&& verticalNum == breakPercent) {
    	verticalNum = timerPercent;
      $breakSettings.removeClass('timerSettingStart');
      $timerDisplay.removeClass('timerStart');
      $breakSettings.addClass('timerSettingDown');
      $timerDisplay.addClass('timerDown');

      newVertPos = 0;
      return newVertPos;
    }
    else {
    	return verticalPosition;
    }
}
});
