$( document ).ready(function(e) {
  $.ajax({
    url: 'https://freegeoip.net/json',
    dataType: "jsonp",
    success: function(data) {
      var city = data.city;
      var region = data.region_name;
      var countryCode = data.country_code;
      $('#city').text(city);
      $('#region').text(region);

      var yql = "select * from weather.forecast where woeid in (select woeid from geo.places(1) where text = '" + city + ', ' + region + "')"
      $.ajax( {
        url: 'https://query.yahooapis.com/v1/public/yql?q=' + yql + '&format=json',
        success: function(data) {
          var temperatureUnits = data.query.results.channel.units.temperature;
          var astronomy = data.query.results.channel.astronomy;
          var condition = data.query.results.channel.item.condition;
          var temperature = (temperatureUnits === 'F' ? condition.temp : toCelsius(condition.temp));
          $('#temp').html(temperature + '°' + '<span id="temp-units">' + temperatureUnits + '</span>');
          $('#condition').text(condition.text);

          var today = new Date();
          var sunrise = Number(astronomy.sunrise.substring(0,1));
          var sunset = Number(astronomy.sunset.substring(0,1)) + 12;
          var am = ( (today.getHours() >= sunrise) && (today.getHours() < sunset) );

          var background = "";
          switch (today.getMonth()) {
            case 0:
            case 1:
            case 11:
              background = (am ? "./images/Clear-Background-Winter.jpg" : "./images/Clear-Background-Winter-Night.jpg");
              break;
            case 2:
            case 3:
            case 4:
              background = (am ? "./images/Clear-Background-Spring.jpg" : "./images/Clear-Background-Spring-Night.jpg");
              break;
            case 5:
            case 6:
            case 7:
              background = (am ? "./images/Clear-Background-Summer.jpg" : "./images/Clear-Background-Summer-Night.jpg");
              break;
            case 8:
            case 9:
            case 10:
              background = (am ? "./images/Clear-Background-Fall.jpg" : "./images/Clear-Background-Fall-Night.jpg");
              break;
            default:
              break;
          }

          $('body').css('background-image', 'url(' + background + ')');
          switch(condition.text) {
            case 'Clear':
              $('#condition-img').attr("src", (am ? "./images/icons8-Sun-100.png" : "./images/icons8-Moon-and-Stars-100.png"));
              break;
            case 'Mostly Sunny':
              $('#condition-img').attr("src", "./images/icons8-Partly-Cloudy-Day-100.png");
              break;
            case 'Partly Cloudy':
              $('#condition-img').attr("src", (am ? "./images/icons8-Partly-Cloudy-Day-100.png" : "./images/icons8-Partly-Cloudy-Night-100.png"));
              break;
            case 'Sunny':
              $('#condition-img').attr("src", "./images/icons8-Sun-100.png");
              break;
            case 'Thunderstorms':
              $('#condition-img').attr("src", "./images/icons8-Storm-100.png");
              break;
            default:
              break;
          }

          var forecast = data.query.results.channel.item.forecast;
          var forecastli = "";
          for (var i = 0; ((i < forecast.length) && (i < 5)); i++) {
            forecastli += '<li>' + forecast[i].day + ' ' + forecast[i].text +
                            '<span>' + forecast[i].low + '° | ' + forecast[i].high + '°</span></li>';
          }
          $('#forecast-ul').html(forecastli);

          
          //$('#quote-content').html(quote.content);
        },
        cache: false
      });
    },
    cache: false
  });
});


$("#temp").click(function() {
  var text = $("#temp").text();
  var temp = text.substring(0, text.indexOf('°'));
  var unit = text.substring(text.indexOf('°') + 1);
  if (unit === 'F') {
    $('#temp').html(toCelsius(temp) + '°' + '<span id="temp-units">C</span>');
    $('#forecast-ul').html($('#forecast-ul').html().replace(/\d{1,3}/g, toCelsius));
  } else {
    $('#temp').html(toFahrenheit(temp) + '°' + '<span id="temp-units">F</span>');
    $('#forecast-ul').html($('#forecast-ul').html().replace(/\d{1,3}/g, toFahrenheit));
  }
});

function toCelsius(f) {
    return Math.round((f - 32) / 1.8);
};

function toFahrenheit(c) {
    return Math.round((c * 1.8) + 32);
};

function startTime() {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  m = checkTime(m);
  s = checkTime(s);
  document.getElementById('txt').innerHTML = h + ":" + m + ":" + s;
  var t = setTimeout(startTime, 500);
}

function checkTime(i) {
  if (i < 10) {i = "0" + i}; // add zero in front of numbers < 10
  return i;
}


$( document ).ready(function(e) {
  var mydate=new Date()
  var year=mydate.getYear()
  if(year<1000)
  year+=1900
  var day=mydate.getDay()
  var month=mydate.getMonth()
  var daym=mydate.getDate()
  if(daym<10)
  daym="0"+daym
  var dayarray=new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday")
  var montharray=new Array("January","February","March","April","May","June","July","August","September","October","November","December")
  //document.write(""+dayarray[day]+", "+montharray[month]+" "+daym+", "+year+"")
  $('#date').text(""+dayarray[day]+", "+montharray[month]+" "+daym+", "+year+"");
});

