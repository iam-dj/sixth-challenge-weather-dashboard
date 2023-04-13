cityAPI =
  "http://api.openweathermap.org/geo/1.0/direct?q=" +
  cityName +
  "&limit=1&appid=df9f9d160078f47bbbf19615908c6a7d";

var cityName = "";
var submitBtn = document.getElementById("submit-button");

var longitude = "";
var latitude = "";

var currentTime = dayjs().format("MM/DD/YYYY");



document.getElementById("theDate").textContent = currentTime;
// document.getElementById("time-1").textContent = dayjs().format("MM/DD/YYYY");
document.getElementById("time-2").textContent = dayjs().add(2, 'day').format("MM/DD/YYYY");
document.getElementById("time-3").textContent = dayjs().add(3, 'day').format("MM/DD/YYYY");
document.getElementById("time-4").textContent = dayjs().add(4, 'day').format("MM/DD/YYYY");
document.getElementById("time-5").textContent = dayjs().add(5, 'day').format("MM/DD/YYYY");

function storeValue(event) {
    console.log(event.target);
    var searched = event.target.value();
    localStorage.setItem("searched", searched);
    return searched;
  }
  console.log(localStorage);
  submitBtn.addEventListener("click", storeValue);

submitBtn.addEventListener("click", function () {
  event.preventDefault();
  var cityName = document.getElementById("city-name").value;

//   var searched = document.createElement("button");
//   searched.textContent = cityName;
//   var container = document.createElement("div");
//   container.append(searched);

//   localStorage.setItem('searched',cityName)



  var cityAPI =
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
    cityName +
    "&limit=1&appid=df9f9d160078f47bbbf19615908c6a7d";

  var weatherAPI;
  var latitude;
  var longitude;

  function getCity() {
    fetch(cityAPI)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        longitude = data[0].lon;
        latitude = data[0].lat;
        fiveAPI =
          "https://api.openweathermap.org/data/2.5/forecast?lat=" +
          latitude +
          "&lon=" +
          longitude +
          "&appid=df9f9d160078f47bbbf19615908c6a7d";
        weatherAPI =
          "https://api.openweathermap.org/data/2.5/weather?lat=" +
          latitude +
          "&lon=" +
          longitude +
          "&appid=df9f9d160078f47bbbf19615908c6a7d";
        return { longitude, latitude };
      })
      .then(function () {
        getWeather();
        fiveDay();
      });
  }

  function getWeather() {
    fetch(weatherAPI)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        //   console.log(data);
        //   (298K − 273.15) × 9/5 + 32 = 76.73°F
        var temprature = data.main.temp;
        var newTemp = ((temprature - 273.15) * 9) / 5 + 32;
        var realTeam = Math.trunc(newTemp);
        // console.log(temprature)
        var wind = data.wind.speed * 2.237;
        var realWind = Math.trunc(wind);
        var humidity = data.main.humidity;
        var cityCalled = data.name;
        document.getElementById("city-temp").textContent =
          realTeam + "° faranheit";
        document.getElementById("city-wind").textContent = realWind + " MPH";

        document.getElementById("cityname").textContent = cityCalled;

        document.getElementById("city-humid").textContent =
          humidity + "% of humidity";
      });
  }
  function fiveDay() {
    fetch(fiveAPI)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // console.log(data.main.temp);
        var forecast = [];
        forecast = data;
        // console.log(forecast);
        // console.log(forecast.list[1].main.temp);
        // var theTime = dayjs().format("MM/DD/YYYY");

        for (let i = 1; i < 6; i++) {
          var temprature = forecast.list[i].main.temp;
          var newTemp = ((temprature - 273.15) * 9) / 5 + 32;
          var realTeam = Math.trunc(newTemp);
          // console.log(temprature)
          var wind = forecast.list[i].wind.speed * 2.237;
          var realWind = Math.trunc(wind);
          var humidity = forecast.list[i].main.humidity;
          document.getElementById("temp-" + [i]).textContent =
            realTeam + "° faranheit";
          document.getElementById("wind-" + [i]).textContent =
            realWind + " MPH";
          document.getElementById("humid-" + [i]).textContent =
            humidity + "% of humidity";


            

          // console.log(forecast.list[i].weather[0].main);
          if (forecast.list[i].weather[0].main === "Clear") {
            var image = document.getElementById("pic-" + [i]);
            image.setAttribute("src", "./assets/" + 4 + ".png");
          } else if (forecast.list[i].weather[0].main === "Clouds") {
            var image = document.getElementById("pic-" + [i]);
            image.setAttribute("src", "./assets/" + 1 + ".png");
          } else if (forecast.list[i].weather[0].main === "Rain") {
            var image = document.getElementById("pic-" + [i]);
            image.setAttribute("src", "./assets/" + 3 + ".png");
          } else if (forecast.list[i].weather[0].main === "Sunny") {
            var image = document.getElementById("pic-" + [i]);
            image.setAttribute("src", "./assets/" + 2 + ".png");
          }
        }
      });
  }
  getCity();
});
