$(document).ready(function() {

  //Cache DOM elements
  var $breakLength = $('#breakLength');
  var $timerLength = $('#timerLength');
  var $timer = $('#timer');
  var timeID; //identifies the timer created by setTimeout()
  var timerButtonToggle = false;

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
    //let currentDisplayTime = parseInt(currentDisplay);

    if(!timerButtonToggle) {
      console.log("State:" + timerButtonToggle);
      timerButtonToggle = true;
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
  	let timeArr = time.split(':',3);
    let hour = 0;
    let minute = 0;
    let second = 0;
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

  }

  function checkTime(value) {
  	if(value < 10) {
    	value = "0" + value;
    }
    return value;
  }

});
