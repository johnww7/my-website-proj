$(document).ready(function(){

  var $lat = $('#latitude');
  var $long = $('#longitude');

  function getLocation() {
    if(navigator.location) {
      navigator.geolocation.getCurrentPosition(myPosition, showError);
    }
    else {
      $lat.text('Not supported by this browser');
      $long.text('Not supported by this browser');
    }
  }

  function myPosition(position) {
    var cordLat = position.coords.latitude;
    var cordLong = position.coords.longitude;
    var positionInfo = "Your current position is (" + "Latitude: " + position.coords.latitude + ", " + "Longitude: " + position.coords.longitude + ")";
    $('#location').text(positionInfo);
    //$lat.text(cordLat);
    //$long.text(cordLong);
  }

  function showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        console.log("User denied request for Geolocation");
        break;
      case error.POSITION_UNAVAILABLE:
        console.log("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        console.log("Request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        console.log("Unknown error occured.");
        break;
    }
  }

  getLocation();


});
