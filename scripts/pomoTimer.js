$(document).ready(function() {

  //Cache DOM elements
  var $breakLength = $('#breakLength');
  var $timerLength = $('#timerLength');
  var $timer = $('#timer');
  var timeID; //identifies the timer created by setTimeout()
  var timerButtonToggle = false;
  var timerOn = true;

  $('#increaseBreak, #decreaseBreak').on('click', function() {
    let buttonId = $(this).attr('id');
    let currBreakTime = $breakLength.text().replace(/\s/g, "");

    console.log(buttonId);

    if(buttonId == 'increaseBreak' && timerButtonToggle == false) {
      let incBreak =  parseInt(currBreakTime) + 1;
      $breakLength.text(incBreak);
    }
    else if(buttonId == 'decreaseBreak' && timerButtonToggle == false && (currBreakTime == '1' || currBreakTime == 1)) {
      $breakLength.text(currBreakTime);
    }
    else if(buttonId == 'decreaseBreak' && timerButtonToggle == false) {
      let decBreak = parseInt(currBreakTime) - 1;
      $breakLength.text(decBreak);
    }

    else {
      console.log('error');
    }

  }).css('cursor', 'pointer');

  $('#increaseTimer, #decreaseTimer').on('click', function() {
    let id = $(this).attr('id');
    let currTimerTime = $timerLength.text().replace(/\s/g, "");

    console.log(id);

    if(id == 'increaseTimer' && timerButtonToggle == false) {
      let incTime =  parseInt(currTimerTime) + 1;
      $timerLength.text(incTime);
      $timer.text(incTime + ":00");
    }
    else if(id == 'decreaseTimer' && timerButtonToggle == false && (currTimerTime == '1' || currTimerTime == 1)) {
      $timerLength.text(currTimerTime);
      $timer.text(currTimerTime + ":00");
    }
    else if(id == 'decreaseTimer' && timerButtonToggle == false) {
      let decTime = parseInt(currTimerTime) - 1;
      $timerLength.text(decTime);
      $timer.text(decTime + ":00");
    }
    else {
      console.log('error');
    }

  }).css('cursor', 'pointer');

  $('#timerDisplay').on('click', function() {
    let currentDisplay = $timer.text().replace(/\s/g, "");
    let animationTime = parseInt(currentDisplay) * 60;

    if(!timerButtonToggle) {
      console.log("State:" + timerButtonToggle);
      timerButtonToggle = true;
      timerAnimation(animationTime);
      startTime(currentDisplay);
    }
    else {
      console.log("State:" + timerButtonToggle);
      timerButtonToggle = false;
      clearTimeout(timeID);
    }


    console.log('timer clicked');

  });

  function startTime(time) {
  	let timeArr = [];
    let hour = 0;
    let minute = 0;
    let second = 0;

    if(time == '00:00' && timerOn == true) {
      timerOn = false;
      let tempBreak = $breakLength.text().replace(/\s/g, "");
      tempBreak = tempBreak + ':00';
      timeArr = tempBreak.split(':', 3);

    }
    else if(time == '00:00' && timerOn == false) {
      timerOn = true;
      let tempDisp = $timerLength.text().replace(/\s/g, "");
      tempDisp = tempDisp + ':00';
      timeArr = tempDisp.split(':', 3);
    }
    else {
      timeArr = time.split(':', 3);
    }
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
    console.log(minute);
    console.log(second);

    let totalTime = (hour * 60 * 60) + (minute * 60) + second;
    console.log(totalTime);

    totalTime -= 1;

    let newHour = Math.floor((totalTime/3600) % 24);
    let newMinute = checkTime(Math.floor((totalTime/60) % 60));
    let newSecond = checkTime(Math.floor(totalTime % 60));

    console.log('min: ' + newMinute);
    console.log('sec: ' + newSecond);
    let newTime = "";

    if(hour == "0" || hour == 0 ) {
    	newTime = newMinute + ":" + newSecond;
    }
    else {
    	newTime = newHour + ":" + newMinute + ":" + newSecond;
    }

    console.log(newTime);
    $timer.text(newTime);

    timeID = setTimeout(startTime, 1000, newTime);
    //timeID = setTimeout(startTime, 500, newTime);
  }

  function checkTime(value) {
  	if(value < 10) {
    	value = "0" + value;
    }
    return value;
  }

  //clockTime = totalTime
  function timerAnimation(clockTime) {
    let $timerDisplay = $('#timerDisplay');
    let $pomodoroContainer = $('#pomodoroContainer');
    let delayTime = "background-position " + 60 + "s";

    if(timerOn) {
      $timerDisplay.removeClass('timerStart');
      $timerDisplay.addClass('timerDown');
      $timerDisplay.css("transition", delayTime);
      $pomodoroContainer.removeClass('pomodoroConStart');
      $pomodoroContainer.addClass('pomodoroConDown');
      $pomodoroContainer.css("transition", delayTime);
    }
    else {
      $timerDisplay.removeClass('timerDown');
      $timerDisplay.addClass('timerStart');
      $timerDisplay.css("transition", delayTime);
      $pomodoroContainer.removeClass('pomodoroConDown');
      $pomodoroContainer.addClass('pomodoroConStart');
      $pomodoroContainer.css("transition", delayTime);

    }
  }

});
