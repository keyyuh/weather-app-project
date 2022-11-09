let now = new Date();
function formatDate() {
  const days = [
    `SUNDAY`,
    `MONDAY`,
    `TUESDAY`,
    `WEDNESDAY`,
    `THURSDAY`,
    `FRIDAY`,
    `SATURDAY`,
  ];
  let currentTime = document.querySelector("#time");
  let currentDay = days[now.getDay()];
  let hour = now.getHours();
  let minute = now.getMinutes().toString().padStart(2, 0);
  currentTime.innerHTML = `${currentDay} ${hour}:${minute}`;
}
formatDate();

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

  return days[day];
}

function searchCity(city) {
  const apiKey = `2a47b687e58bcb415fc20ba1bc5a6217`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showWeather);
  document.querySelector(`#city-name`).innerHTML = city;
}

function showWeather(response) {
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector(`#temp`).innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(
    `#humidity`
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
  document.querySelector(`#wind`).innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )}mph`;
  document.querySelector(`#current-weather`).innerHTML =
    response.data.weather[0].main;
  document
    .querySelector(`#weather-icon`)
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  imperialTemp = response.data.main.temp;
  getForecast(response.data.coord);
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector(`#forecast`);
  let forecastHTML = `<div class= "row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
      <div class = "forecat-day">${formatDay(forecastDay.dt)}</div>
        <div class="forecast"></div> <img src= "http://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png"/>
        <div class="temperature"><span class="maxTemp">${Math.round(
          forecastDay.temp.max
        )}°</span> <span class="minTemp">${Math.round(
          forecastDay.temp.min
        )}°</span></div>
    </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = `701f06352d61835bc4fc894e7b084629`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function showTempF(event) {
  event.preventDefault();
  convertToC.classList.remove("active");
  convertToF.classList.add("active");
  let displayTempF = document.querySelector("#temp");
  displayTempF.innerHTML = Math.round(imperialTemp);
}

function showTempC(event) {
  event.preventDefault();
  convertToC.classList.add("active");
  convertToF.classList.remove("active");
  let displayTempC = document.querySelector("#temp");
  displayTempC.innerHTML = Math.round((imperialTemp - 32) * (5 / 9));
}

function searchBar(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchCurrentLocation(position) {
  let apiKey = `2a47b687e58bcb415fc20ba1bc5a6217`;
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrentLocation);
}

let imperialTemp = null;

let convertToF = document.querySelector("#imperial-temp");
convertToF.addEventListener("click", showTempF);

let convertToC = document.querySelector("#metric-temp");
convertToC.addEventListener("click", showTempC);

let search = document.querySelector("#search-bar");
search.addEventListener("submit", searchBar);

let currentLocationBtn = document.querySelector(`#current-location`);
currentLocationBtn.addEventListener("click", getCurrentLocation);

//for default display
searchCity(`Seattle`);
displayForecast();
