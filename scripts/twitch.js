$(document).ready(function() {

  var $twitchList = $('#twitchList');
  var channelTemplate = $('#channel-template').html();

  //Array of twitch users we want to follow
  var userNames = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp",
  "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

  //Arrays to hold what users are online or offline.
  var userOnline = [];
  var userOffline = [];

  //function to create a user object containing api data needed for each user we follow.
  function userObject(name, logo, details, url, viewers, status, badgeC) {

    this.name = name;
    this.logo = logo;
    this.details = details;
    this.url = url;
    this.viewers = viewers;
    this.status = status;
    this.badgeC = badgeC;

  }

  //Creates list group items for each user channel we follow by using mustache
  //templates.
  function addChannel (val) {
    $twitchList.append(Mustache.render(channelTemplate, val));
  }

  //Function cycles through userName array containing the users we want to follow
  //and makes a call to userStream function for each user.
  function createUserInfo () {

    for (var i = 0; i < userNames.length; i++){

      userStream(i);

    }

  }

  //Function makes call to twitch.tv channel api in case of user steam being offline.
  function userChannel (val) {
    var url = "https://wind-bow.gomix.me/twitch-api/channels/" + userNames[val] + "?callback=?";
    $.getJSON(url, function(data) {
      var viewers = 0;
      var name = data.name;
      var details = "";
      var logo = data.logo;
      var uUrl = data.url;
      var status = "Offline";
      var badgeC = "invisible";

     var user = new userObject(name, logo, details, uUrl, viewers, status, badgeC);;

     var userChan = userNames[val];

     addOfflineUser(userChan);
     addChannel(user);

    });

  }


  /* Function recieves a user name as parameter value and makes a jsonp api call to TWITCHtv
     and tests to see if stream is live or offline.
  */
  function userStream (val) {
    var url = "https://wind-bow.gomix.me/twitch-api/streams/" + userNames[val] + "?callback=?";

    $.getJSON(url, function(data) {
      //Checks data from jsonp call for if the stream is live or offline. If offline calls
      //userChannel function or gets necessary data for user's channel.
      if (data.stream === null){
        userChannel (val);

      }
      else {
        //User variables containing needed data for userObject.
        var viewers = data.stream.viewers;
        var name = data.stream.channel.name;
        var details = data.stream.channel.status;
        var logo = data.stream.preview.small;
        var uUrl = data.stream.channel.url;
        var status = "Online";
        var badgeC = "badge-success";

        //Creates a new object called user.
        var user = new userObject(name, logo, details, uUrl, viewers, status, badgeC);

        var userChan = userNames[val];

        //Makes call to addOnlineUser function
        addOnlineUser(userChan);
        //Sends user object to addChannl function
        addChannel(user);


      }
    });

  }

  //Calls createUserInfo function once page loads.
  createUserInfo();

  //When All Streams button is pressed, empties out current list of user streams append
  //and makes a call to createUserInfo function.
  $('#all').on('click', function() {
    var $twitchList = $('#twitchList');
    $twitchList.empty();

    createUserInfo();
  });

  //When Online button pressed, empties current user streams, and makes a json api
  //streams call based on the users listed in userOnline array.
  $('#online').on('click', function() {
    var $twitchList = $('#twitchList');
    $twitchList.empty();

    for (var i = 0; i < userOnline.length; i++) {
      var url = "https://wind-bow.gomix.me/twitch-api/streams/" + userOnline[i] + "?callback=?";
      $.getJSON(url, function(data) {
        var viewers = data.stream.viewers;
        var name = data.stream.channel.name;
        var details = data.stream.channel.status;
        var logo = data.stream.preview.small;
        var uUrl = data.stream.channel.url;
        var status = "Online";
        var badgeC = "badge-success";
        var user = new userObject(name, logo, details, uUrl, viewers, status, badgeC);
        addChannel(user);

      });
    }

  });

  //When Offline button clicked, empties current user streams, and makes a json api channl call
  //based on the users listed in userOffline array.
  $('#offline').on('click', function() {
    var $twichList = $('#twitchList');
    $twitchList.empty();

    for (var i = 0; i < userOffline.length; i++){
      var url = "https://wind-bow.gomix.me/twitch-api/channels/" + userOffline[i] + "?callback=?";
      $.getJSON(url, function(data) {
        var viewers = 0;
        var name = data.name;
        var details = "";
        var logo = data.logo;
        var uUrl = data.url;
        var status = "Offline";
        var badgeC = "invisible";

        var user = new userObject(name, logo, details, uUrl, viewers, status, badgeC);
        addChannel(user);

      });
    }
  });

  //Function adds users to userOnline array based on if they haven't been added yet
  //or if they have just returns back to function that made call.
  function addOnlineUser (val) {
    if (userOnline.includes(val)) {
      return;
    }
    else {
      userOnline.push(val);
    }
  }

  //Function adds users to userOffline array based on if they haven't been added yet
  //or if they have just returns back to function that made call.
  function addOfflineUser (val) {
    if (userOffline.includes(val)) {
      return;
    }
    else {
      userOffline.push(val);
      return;
    }
  }

});
