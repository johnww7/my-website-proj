$(document).ready(function(){

	//Initial asynchronous HTTP request to quote API to load page with a quote.
	$.ajax( {
		type: 'GET',
		url: 'https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&_jsonp=mycallback',
		dataType: 'jsonp',
		jsonpCallback: 'mycallback',
		cache: false,
		success: function(data){
			//Assign quote data to to author and quote data to respective div id's
			var post = data.shift();
			$('#author').text(post.title);
			$('#quote').html(post.content);
			//Pass quote and author text to quoteLength function to form Tweeter
			//text string query. Then assign formated query to Twitter button's href attribute.
			var quoteText = $('#quote').text();
			var author = $('#author').text();
			var txtString = quoteLength(quoteText, author);
			var twitterUrl = "https://www.twitter.com/intent/tweet?text=" + encodeURIComponent(txtString);
			document.getElementById('tweetQuote').href = twitterUrl;

			//Call changeBackground function and assign returned color to body element
			//and quoteSource id.
			var color = changeBackground();
			document.body.style.background = color;
			document.getElementById("quoteSource").style.background = color;

		},
		error: function(){
			console.log('error on recieving quote');
		}
	});


	//Perform quote API call, Twitter href attribute assignment and change background
	//color assignment when new quote button clicked.
	$('#getQuote').on('click', function(e) {
		e.preventDefault();
		$.ajax( {
			type: 'GET',
			url: 'https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&_jsonp=mycallback',
			dataType: 'jsonp',
			jsonpCallback: 'mycallback',
			cache: false,
			success: function(data){
				//Assign quote data to to author and quote data to respective div id's
				var post = data.shift();
				$('#author').text(post.title);
				$('#quote').html(post.content);
				//Pass quote and author text to quoteLength function to form Tweeter
				//text string query. Then assign formated query to Twitter button's href attribute.
				var quoteText = $('#quote').text();
				var author = $('#author').text();
				var txtString = quoteLength(quoteText, author);
				var twitterUrl = "https://www.twitter.com/intent/tweet?text=" + encodeURIComponent(txtString);
				document.getElementById('tweetQuote').href = twitterUrl;

				//Call changeBackground function and assign returned color to body element
				//and quoteSource id.
				var color = changeBackground();
				document.body.style.background = color;
				document.getElementById("quoteSource").style.background = color;

			},
			error: function(){
				console.log('error on recieving quote');
			}
		});
	});

	/*Checks to see if quote is greater then Twitter 140 character limit, and if so
	* formats the quote and author into a new string thats 140 characters or less.
	* If not, creates a new string with quote and author in it.
	*/
	function quoteLength(quote, auth) {
		var quotLength = quote.length;
		var authLength = auth.length+1;
		var txtTotal = 140 - authLength;

		if (quotLength >= txtTotal) {
			var newQuote = quote.slice(0, (txtTotal));
			var retQuote = newQuote + "-" + auth;
			return retQuote;
		}
		else {
			var retQuote = quote + "-" + auth;
			return retQuote;
		}
	}

	/*Assigns random numbers to red, green and blue attributes for rgb color
	 *and formats it into a rgb() string and returns it.
	*/
	function changeBackground() {

		var max = 255;
		var min = 0;
		var red = Math.floor(Math.random() * (max - min + 1)) + min;
		var green = Math.floor(Math.random() * (max - min + 1)) + min;
		var blue = Math.floor(Math.random() * (max - min + 1)) + min;
		var rgbColor = "rgb(" + red + "," + green + "," + blue + ")";
		return rgbColor;

	}

});
