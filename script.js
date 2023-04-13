//setting the cityAPI link so that we can run the first api to get the longitude and latitude

cityAPI =
  "https://api.openweathermap.org/geo/1.0/direct?q=" +
  cityName +
  "&limit=1&appid=df9f9d160078f47bbbf19615908c6a7d";

var cityName = "";
var submitBtn = document.getElementById("submit-button");

var longitude = "";
var latitude = "";

var currentTime = dayjs().format("MM/DD/YYYY");

//updates the date on each card to the current date

document.getElementById("theDate").textContent = currentTime;
document.getElementById("time-2").textContent = dayjs().add(2, 'day').format("MM/DD/YYYY");
document.getElementById("time-3").textContent = dayjs().add(3, 'day').format("MM/DD/YYYY");
document.getElementById("time-4").textContent = dayjs().add(4, 'day').format("MM/DD/YYYY");
document.getElementById("time-5").textContent = dayjs().add(5, 'day').format("MM/DD/YYYY");



//this is an eventlistener and on-click it runs the first api that grabs the longitude and latitude of the search text entered

submitBtn.addEventListener("click", function () {
  event.preventDefault();
  var cityName = document.getElementById("city-name").value;

  var cityAPI =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
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
//run the getWeather function after we've retrieved the city information - then apply so calculations to change the temprature and the wind speed.
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
//this if else loop changes the pictures of the cards depending on the weather
          if (data.weather[0].main === "Clear") {
            var image = document.getElementById("border-1");
            image.setAttribute("src", "./assets/" + 4 + ".png");
          } else if (data.weather[0].main === "Clouds") {
            var image = document.getElementById("border-1");
            image.setAttribute("src", "./assets/" + 1 + ".png");
          } else if (data.weather[0].main === "Rain") {
            var image = document.getElementById("border-1");
            image.setAttribute("src", "./assets/" + 3 + ".png");
          } else if (data.weather[0].main === "Sunny") {
            var image = document.getElementById("border-1");
            image.setAttribute("src", "./assets/" + 2 + ".png");
          }
      });
  }
  function fiveDay() {
    fetch(fiveAPI)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        var forecast = [];
        forecast = data;
      
//this loop gets the element by the id and changes the text to correct weather parameters
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


            
            var image = document.getElementById("pic-" + [i]);

          if (forecast.list[i].weather[0].main === "Clear") {
            image.setAttribute("src", "./assets/" + 4 + ".png");
          } else if (forecast.list[i].weather[0].main === "Clouds") {
            image.setAttribute("src", "./assets/" + 1 + ".png");
          } else if (forecast.list[i].weather[0].main === "Rain") {
            image.setAttribute("src", "./assets/" + 3 + ".png");
          } else if (forecast.list[i].weather[0].main === "Sunny") {
            image.setAttribute("src", "./assets/" + 2 + ".png");
          } else {
            image.setAttribute("src", "./assets/" + 5 + ".png");
          }
        }
      });
  }
  getCity();
});

// Get the search history from local storage and parse it as an array
var searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

// Get the history list element
var historyList = document.getElementById('history-list');

// Iterate over the search history and append each item to the list
searchHistory.forEach(function(item) {
  var li = document.createElement('li');
  li.textContent = item;
  historyList.appendChild(li);
});

// Add an event listener to the submit button to store the search history
submitBtn.addEventListener("click", function(event) {
  event.preventDefault();
  var searched = document.getElementById("city-name").value;
  // Add the searched item to the search history
  searchHistory.push(searched);
  // Save the search history to local storage
  localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  // Append the searched item to the history list
  var li = document.createElement('li');
  li.textContent = searched;
  historyList.appendChild(li);
});
