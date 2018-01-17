$(document).ready(function() {

  //Cache DOM elements
  var $breakLength = $('#breakLength');
  var $timerLength = $('#timerLength');
  var $timer = $('#timer');

  $('#increaseBreak, #decreaseBreak').on('click', function() {
    let buttonId = $(this).attr('id');
    let currBreakTime = $breakLength.text().replace(/\s/g, "");

    console.log(buttonId);

    if(buttonId == 'increaseBreak') {
      let incBreak =  parseInt(currBreakTime) + 1;
      $breakLength.text(incBreak);
    }
    else if(buttonId == 'decreaseBreak') {
      let decBreak = parseInt(currBreakTime) - 1;
      $breakLength.text(decBreak);
    }
    else {
      console.log('error');
    }

  });

  $('#increaseTimer, #decreaseTimer').on('click', function() {
    let id = $(this).attr('id');
    let currTimerTime = $timerLength.text().replace(/\s/g, "");

    console.log(id);

    if(id == 'increaseTimer') {
      let incTime =  parseInt(currTimerTime) + 1;
      $timerLength.text(incTime);
    }
    else if(id == 'decreaseTimer') {
      let decTime = parseInt(currTimerTime) - 1;
      $timerLength.text(decTime);
    }
    else {
      console.log('error');
    }

  });

});
