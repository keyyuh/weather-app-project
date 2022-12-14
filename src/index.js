function formatDate(timestamp) {
  let now = new Date(timestamp);
  let hour = now.getHours();
  let minute = now.getMinutes().toString().padStart(2, 0);
  const days = [
    `SUNDAY`,
    `MONDAY`,
    `TUESDAY`,
    `WEDNESDAY`,
    `THURSDAY`,
    `FRIDAY`,
    `SATURDAY`,
  ];
  let currentDay = days[now.getDay()];
  return `${currentDay} ${hour}:${minute}`;
}

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
}

function showWeather(response) {
  document.querySelector("#date-time").innerHTML = `LAST UPDATED: ${formatDate(
    response.data.dt * 1000
  )}`;
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector(`#temp`).innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#feels-like").innerHTML = `Feels like: ${Math.round(
    response.data.main.feels_like
  )}°`;
  document.querySelector(
    `#humidity`
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
  document.querySelector(`#wind`).innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )}mph`;
  document.querySelector(`#current-weather`).innerHTML =
    response.data.weather[0].description;
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
        }@2x.png" width="70px"/>
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

let search = document.querySelector("#search-bar");
search.addEventListener("submit", searchBar);

let currentLocationBtn = document.querySelector(`#current-location`);
currentLocationBtn.addEventListener("click", getCurrentLocation);

//for default display
searchCity(`Seattle`);
displayForecast();
