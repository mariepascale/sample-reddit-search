(function($) {
  'use strict';

	$(function () {

		var redditAPI = "http://www.reddit.com/search.json",
			feed = false;
		
		$( ".searchText" ).keypress(function( event ) {
			if ( event.which == 13 ) {
				getRedditData();
				return false;
			 }
		});

		$( ".searchButton" ).click(function() {
			getRedditData();
		});

		function getRedditData(){
			$('.resultContainer').empty();	
			$.ajax({
			  type: 'GET',
			  url: redditAPI + "?q=" + $('.searchText').val() + "&sort=new",
			  dataType: "json",
			}).done(function(resultContainer) {
				feed = resultContainer.data;
				if (feed.children === undefined || feed.children.length == 0) {
					$('.resultContainer').append('<h3 class="results">No Results</h3>');
				}
				else {
					$('.resultContainer').append('<h3 class="results">Results:</h3>');
					for (var p in feed.children) {
					    if( feed.children.hasOwnProperty(p) ) {
					    	$('.resultContainer').append('<div class="title"><a href="' + feed.children[p].data.url + '" target="_blank">' + feed.children[p].data.title + '</a></div><br />');
					    } 
					}
				}  
			  }).fail(function() {
			    console.log( "error" );
			});
		}

	});

}(jQuery));





