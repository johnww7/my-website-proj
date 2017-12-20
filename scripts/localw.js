
$(document).ready(function(){
  var longitude;
  var latitude;
  function showPosition(){
      if(navigator.geolocation){
          navigator.geolocation.getCurrentPosition(function(position){
              latitude = position.coords.latitude;
              longitude = position.coords.longitude;
              var positionInfo = "Your current position is (" + "Latitude: " + position.coords.latitude + ", " + "Longitude: " + position.coords.longitude + ")";

              getWeather();
          });
      } else{
          alert("Sorry, your browser does not support HTML5 geolocation.");
      }
  }
  showPosition();

  function getWeather() {

    var reqString = "https://fcc-weather-api.glitch.me/api/current?lon=" + longitude + "&lat=" + latitude;

    $.getJSON(reqString, function(json) {
      filterData(json);

    });
  }

  function filterData(val) {

    var $temp = $('#temp');
    var $place = $('#place');
    var $icon = $('#icon');
    var $weather = $('#weather');
    var skyCondition;
    var country;
    var town;


    for(x in val) {
      switch (x) {
        case "weather":
          $weather.text(val.weather[0].description);
          skyCondition = val.weather[0].description;
          break;
        case "main":
          var tempVal = (val[x].temp).toFixed(1);
          $temp.html(tempVal + "C");
          break;
        case "sys":
          country = val[x].country;
          break;
        case "name":
          town = val[x];
          break;

      }
    }
    $place.text(town + ", " + country);
    weatherLookup(skyCondition);
  }

  function weatherLookup(val) {
    var result = "";
    var image = "";

    var condition = {
        "clearsky": "http://www.lakescientist.com/wp-content/uploads/2014/11/Lake_mapourika_NZ.jpeg",
        "partlycloudy": "https://www.azernews.az/media/2016/08/16/weather.jpg",
        "cloudy": "https://hdwallsource.com/img/2014/7/cloudy-sky-background-33821-34582-hd-wallpapers.jpg",
        "foggy": "https://www.scienceabc.com/wp-content/uploads/2016/01/rain-and-fog.jpg",
        "lightrain": "http://www.eve.com.mt/wp-content/uploads/2016/07/ass.jpg",
        "rain": "https://images.alphacoders.com/201/201751.jpg",
        "snow": "https://vignette4.wikia.nocookie.net/phobia/images/a/aa/Snow.jpg/revision/latest?cb=20161109045734",
        "sleet": "https://wonderopolis.org/wp-content/uploads//2015/02/97_1.jpg",
        "thunderstorm": "https://23711-presscdn-pagely.netdna-ssl.com/wp-content/uploads/2015/06/Thunderstorm-5best.jpg"
    };
    if(val == "clear sky" || val == "clear" || val =="sunny") {
      result = condition.clearsky;
      image = "http://donaldcameron77.info/weatherappfcc/weatherIcons/sunny.png";
    }
    else if(val == "partly cloudy" || val == "broken clouds" || val == "partial cloudy"){
      result = condition.partlycloudy;
      image ="http://downloadicons.net/sites/default/files/sunny-to-partly-cloudy-icons-38702.png";
    }
    else if (val == "cloudy" || val == "dark clouds") {
      result = condition.cloudy;
      image = "http://wfarm1.dataknet.com/static/resources/icons/set58/fb0c3f34.png";
    }
    else if(val == "foggy" || val == "fog" || val == "mist") {
      result = condition.foggy;
      image = "http://downloadicons.net/sites/default/files/foggy-wear-icons-47354.png";
    }
    else if(val == "light rain" || val == "drizzle") {
      result = condition.lightrain;
      image = "http://boothamphitheatre.com/wp-content/uploads/2016/02/dc6o4KBc9.png";
    }
    else if(val == "rain" || val == "heavy rain" || val == "showers") {
      result = condition.rain;
      image = "http://icons.iconarchive.com/icons/large-icons/large-weather/512/rain-icon.png";
    }
    else if(val == "snow" || val == "heavy snow" || val == "light snow") {
      result = condition.snow;
      image = "https://cdn0.iconfinder.com/data/icons/large-weather-icons/512/Heavy_snow.png";
    }
    else if(val == "sleet" || val == "freezing rain") {
      result = condition.sleet;
      image = "http://icons.iconarchive.com/icons/large-icons/large-weather/512/sleet-icon.png";
    }
    else if(val == "thunderstorm" || val == "lightning" || val == "thunder"){
      result = condition.thunderstorm;
      image = "https://cdn2.iconfinder.com/data/icons/weather-icon-set/256/thunderstorm.png";
    }
    else {
      result = "none"
      image = "none";
      $('body').css('background-color', 'black');

    }
    console.log(result);
    if(result !== "none") {
      $('body').css('background-image', 'url(' + result + ')');
      $('#icon').attr('src', image);
    }
  }

  var $temp = $('#temp');
  $temp.on('click', function() {
    var tempVal = $temp.text();
    var position = tempVal.search(/[A-Z]/g);
    console.log(position);
    var val = tempVal.slice(0, position);
    var degrees = tempVal.substr(position);
    console.log(val);
    console.log(degrees);
    if (degrees == "C") {
      var farenheit = (val * (9/5) + 32).toFixed(1);
      $temp.text(farenheit + 'F');
      console.log(farenheit);
    }
    else {
      var celsius = ((val - 32) * (5/9)).toFixed(1);
      $temp.text(celsius + 'C');
    }
  });

});
