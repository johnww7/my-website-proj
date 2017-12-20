$(document).ready(function() {

  //Cached DOM elements
  var resultTemplate = $('#result-template').html();
  var $searchResult = $('#searchResult');
  var $helpText = $('#helpText');

  //Creates Wiki entry results by calling mustache template and appending
  //template to search result area.
  function addResult (val) {
    $searchResult.append(Mustache.render(resultTemplate, val));
  }

  //Object used to hold wiki response from json query. Holding the title
  //description and target for the entry response.
  var Query = function (title, target, description) {
    this.title = title;
    this.target = target;
    this.description = description;
  }

  //When search image is clicked, the input text area slides in as
  //image disappears.
  $('#searchImage').on('click', function() {
    var $imageRow = $('#imageRow');
    var $queryRow = $('#queryRow');

    $imageRow.slideUp();
    $queryRow.fadeIn(500);
  });

  //When the 'X' button in search container is clicked, performs an action of
  //clearing out input text area.
  $('#cancel').on('click', function() {
    //Cached DOM elements
    var $imageRow= $('#imageRow');
    var $queryRow = $('#queryRow');
    var $searchBox = $('#searchBox');
    var $query = $('#query');
    var $searchContainer = $('#searchContainer');

    //Checks to see if search box has class searchBoxQuery or not. If true, input text
    //area fades out and image fades in to replace it. Else, clears out the entries in
    //the search result area, returns the search container back to center of screen, and
    //empties the input text area of any input.
    if($searchBox.hasClass("searchBoxQuery")){
      $queryRow.slideUp();
      $imageRow.fadeIn(500);
    }
    else {
      $searchResult.empty();
      $queryRow.slideUp();
      $imageRow.fadeIn(2500);
      $searchBox.removeClass("searchBoxRes");
      $searchBox.addClass("searchBoxQuery");
      $query.val('');
      $helpText.show();
      $searchContainer.removeClass("searchBoxBorder2");
      $searchContainer.addClass("searchBoxBorder");
    }

  });

  //Listens for the enter button on keyboard to be pressed in the input text
  //area. So it can make a json call to wiki api with search entry.
  $('#query').keypress(function(e) {
    //Cached DOM
    var $searchContainer = $('#searchContainer');
    var $searchBox = $('#searchBox');

    //Checks for enter key being pressed.
    if (e.which == 13) {
      jQuery(this).blur();
      jQuery('#submit').focus().click();
      //Gets contents of input text
      var res = $('#query').val();

      //Checks to see if search box has CSS class searchBoxQuery, if true
      //moves search box to top of screen and removes the help text.
      if ($searchBox.hasClass("searchBoxQuery")) {
        $searchBox.removeClass("searchBoxQuery");
        $searchBox.addClass("searchBoxRes");
        $helpText.hide();
        $searchContainer.removeClass("searchBoxBorder");
        $searchContainer.addClass("searchBoxBorder2");
      }

      //Contains the url query to the wiki api containing the search title we want to
      //look up.
      var urlString = "https://en.wikipedia.org/w/api.php?action=query&srsearch=" + res +
      "&list=search&srwhat=text&origin=*&format=json&formatversion=2&utf8";

      //Checks to see if search result area has any wiki response entries from previous
      //search or not. If it doesn't makes a call to makeWikiQuery, or else it empties
      //search result area of previous entries then makes call to makeWikiQuery.
      if ($searchResult.children().length == 0 ) {
        makeWikiQuery(urlString);

      }
      else {
        $searchResult.empty();
        makeWikiQuery(urlString);

      }
    }
  });

  //Takes a url string and makes a JSON call to wiki API and gets a response back
  //of entries for searched item.
  function makeWikiQuery(urlString) {
    $.getJSON(urlString, function(data) {
        var output = "";

        var d, i;
        var retQuery = new Query("beginning", 889999, "http://www.example.com");
        var target;

        //Goes through all 10 entries that we get from as a response from our query
        //to wiki api.
        for (i = 0; i < data.query.search.length; i++) {
          d = data.query.search[i];

          target = "https://en.wikipedia.org?curid=" + d.pageid;
          retQuery.title = d.title;
          retQuery.target = target;
          var cleanSnippet = decodeSnippet(d.snippet);
          retQuery.description = cleanSnippet;

          //Calls addResult function to html format retQuery object which contains
          //each entries data.
          addResult(retQuery);
        }

      });
  }

  //Parses and replaces html and other unwanted characters from wiki response snippet.
  function decodeSnippet(str) {
    if(str && typeof str === 'string') {
      // strip script/html tags
      str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
      str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
    }
    return str;
  }


});
