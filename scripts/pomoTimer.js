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
  let shortTimeID;
  let timerButtonToggle = false;
  let timerOn = true;
  let interval = 1000; //ms
  let initialStart;

  let timerTime = 1500;
  let breakTime = 300;
  let newVertPos = 0;
  let timerPercent = Math.round((100/timerTime) * 100)/100;;
  let breakPercent = -Math.round((100/breakTime) * 100)/100;
  let verticalNum = timerPercent;

  $('#increaseBreak, #decreaseBreak').on('click', function() {
    let buttonId = $(this).attr('id');
    let currBreakTime = $breakLength.text().replace(/\s/g, "");
    let incBreak = 0;
    let decBreak = 0;

    console.log(buttonId);
    console.log('Break off: ' + timerOn + ' timer switch: ' + timerButtonToggle);

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
      console.log('increase' + incBreak);
      $timer.text(incBreak + ":00");
      breakPercent = -Math.round((100/breakTime) * 100)/100;
      verticalNum = breakPercent;
      resetTimerAnimation();
    }
    else if(timerButtonToggle == false && timerOn == false && buttonId == 'decreaseBreak') {
      decBreak = parseInt(currBreakTime) - 1;
      breakTime = decBreak * 60;
      $breakLength.text(decBreak);
      console.log('decrease' + decBreak);
      $timer.text(decBreak + ":00");
      breakPercent = -Math.round((100/breakTime) * 100)/100;
      verticalNum = breakPercent;
      resetTimerAnimation();
    }
    else {
      console.log('error');
    }
    console.log(breakTime);
    breakPercent = -Math.round((100/breakTime) * 100)/100;
    console.log(breakPercent);
  }).css('cursor', 'pointer');

  $('#increaseTimer, #decreaseTimer').on('click', function() {
    let id = $(this).attr('id');
    let currTimerTime = $timerLength.text().replace(/\s/g, "");

    console.log(id);

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
    console.log(timerTime);

    console.log(timerPercent);
  }).css('cursor', 'pointer');

  $('#timerDisplay, #heading').on('click', function() {
    let currentDisplay = $timer.text().replace(/\s/g, "");
    let animationTime = parseInt(currentDisplay) * 60;


    if(!timerButtonToggle) {
      console.log("State:" + timerButtonToggle);
      timerButtonToggle = true;
      displayAnimation(timerButtonToggle);
      initialStart = Date.now() + interval;
      setTimeout(startTime, interval, currentDisplay);
    }
    else {
      console.log("State:" + timerButtonToggle);
      timerButtonToggle = false;
      displayAnimation(timerButtonToggle);
      clearTimeout(timeID);

    }


    console.log('timer clicked');

  });

  function startTime(time) {
  	let timeArr = [];
    let hour = 0;
    let minute = 0;
    let second = 0;
    let verPosition;

    let drift = Date.now() - initialStart;

    timeArr = checkForReset(time);

    console.log(timeArr);

    if(timeArr.length == 3) {
    	hour = parseInt(timeArr[0])
    	minute = parseInt(timeArr[1]);
    	second = parseInt(timeArr[2]);
    }
    else {
    	minute = parseInt(timeArr[0]);
    	second = parseInt(timeArr[1]);
    }

    console.log('time: ' + hour + ' ' + minute + ' ' + second);


    let totalTime = (hour * 60 * 60) + (minute * 60) + second;
    console.log(totalTime);



    if(time == '00:00') {
      totalTime = totalTime;
      newVertPos = newVertPos;
    }
    else {
      totalTime -= 1;
      newVertPos = newVertPos + verticalNum;
    }

    console.log("new Vert: " +  newVertPos);
    vertPosition = changeTransitionDirection(newVertPos);
    console.log("vertical perc: " + verticalNum);

    let newHour = Math.floor((totalTime/3600) % 24);
    let newMinute = checkTime(Math.floor((totalTime/60) % 60));
    let newSecond = checkTime(Math.floor(totalTime % 60));

    console.log('hour: ' + newHour);
    console.log('min: ' + newMinute);
    console.log('sec: ' + newSecond);
    let newTime = "";

    if(newHour == 0 ) {
    	newTime = newMinute + ":" + newSecond;
    }
    else {
    	newTime = newHour + ":" + newMinute + ":" + newSecond;
    }


    let backgroundPos = "0% " + vertPosition  + "%";
    console.log(backgroundPos);
    $timerDisplay.css("background-position", backgroundPos);
    $pomodoroContainer.css("background-position", backgroundPos);
    $sessionSettings.css("background-position", backgroundPos);
    $breakSettings.css("background-position", backgroundPos);

    console.log(newTime);
    $timer.text(newTime);


    initialStart += interval;
    timeID = setTimeout(startTime, Math.max(0, interval - drift), newTime);

  }


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


  function checkTime(value) {
  	if(value < 10) {
    	value = "0" + value;
    }
    return value;
  }


  function displayAnimation(startFlag) {

    if(startFlag) {
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

  function changeTransitionDirection(verticalPosition) {

	if((newVertPos >= (timerTime * timerPercent))&& verticalNum == timerPercent) {
     verticalNum = breakPercent;
     $breakSettings.removeClass('timerSettingDown');
     $timerDisplay.removeClass('timerDown');
     $breakSettings.addClass('timerSettingStart');
     $timerDisplay.addClass('timerStart');

     newVertPos = 100;
     return newVertPos;
    }
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
