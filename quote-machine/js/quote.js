$('#get-another-quote-button').on('click', function(e) {
  e.preventDefault();
  $.ajax( {
    url: 'https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1',
    success: function(data) {
      var quote = data.shift(); // The data is an array of posts. Grab the first one.
      //console.log(quote);
      $('#quote-title').text(quote.title);
      $('#quote-content').html(quote.content);
    },
    cache: false
  });
});
