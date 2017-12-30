$(document).ready(function() {

  var zero = $('#zero');
  var one = $('#one');
  var two = $('#two');
  var three = $('#three');
  var four = $('#four');
  var five = $('#five');
  var six = $('#six');
  var seven = $('#seven');
  var eight = $('#eight');
  var nine = $('#nine');

  $('#zero, #one, #two, #three, #four, #five, #six, #seven, #eight, #nine').on('click', function() {
    console.log("Button pressed: " + this.id);
  });


});
