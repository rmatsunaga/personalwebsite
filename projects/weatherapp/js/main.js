$(document).ready(function(){
  $("#submitCity").click(function(){
    let city = $("#citySearch").val();
    if(city === ''){
      alert("Please input a value");
    } else {
      $.ajax({
        url: "http://api.openweathermap.org/data/2.5/weather?q=" + city
            + "&units=metric" + "&APPID=ad7507de962e3eec8ba2bc524b91b064",
        dataType:"jsonp",
        success: function(data) {
          $(".cityName").text(city);
          $(".weatherType").text(data.weather[0].main);
          $(".temp").text(data.main.temp + " C");
          $(".date").text((new Date() + "").substring(0,3) + "day");
          $(".low").text(data.main.temp_min);
          $(".high").text(data.main.temp_max);
          var sunriseSec = data.sys.sunrise;
          var sunriseDate = new Date(sunriseSec * 1000);
          var sunriseTimestr = sunriseDate.toLocaleTimeString();
          $(".sunrise").text("Sunrise: " + sunriseTimestr);
          var sunsetSec = data.sys.sunset;
          var sunsetDate = new Date(sunsetSec * 1000);
          var sunsetTimestr = sunsetDate.toLocaleTimeString();
          $(".sunset").text("Sunset: " + sunsetTimestr);
          $(".description").text("Description: " + data.weather[0].description);
          $(".humidity").text("Humidity: " + data.main.humidity + "%");
          $(".windSpeed").text("Wind Speed: " + data.wind.speed + " meters per second");
          $(".coordinates").text("Coordinates: " + data.coord.lat + ", " + data.coord.lon);
          $(".visibility").text("Visibility: " + data.visibility + " meters");
          $(".pressure").text("Pressure: " + data.main.pressure + " hPa");
        },
        type:"GET"
      });
    }
  });
});
