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

function searchCity(city) {
  const apiKey = `2a47b687e58bcb415fc20ba1bc5a6217`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showWeather);
  document.querySelector(`#city-name`).innerHTML = city;
}

function showWeather(event) {
  document.querySelector("#city-name").innerHTML = event.data.name;
  document.querySelector(`#temp`).innerHTML = Math.round(event.data.main.temp);
  document.querySelector(
    `#humidity`
  ).innerHTML = `Humidity: ${event.data.main.humidity}%`;
  document.querySelector(`#wind`).innerHTML = `Wind: ${Math.round(
    event.data.wind.speed
  )}mph`;
  document.querySelector(`#current-weather`).innerHTML =
    event.data.weather[0].main;
  document
    .querySelector(`#weather-icon`)
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${event.data.weather[0].icon}@2x.png`
    );
  imperialTemp = event.data.main.temp;
}

function showTempF(event) {
  event.preventDefault();
  let displayTempF = document.querySelector("#temp");
  displayTempF.innerHTML = Math.round(imperialTemp);
}

function showTempC(event) {
  event.preventDefault();
  let displayTempC = document.querySelector("#temp");
  displayTempC.innerHTML = Math.round((imperialTemp - 32) * (5 / 9));
}

function searchBar(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchCurrentLocation(position) {
  const apiKey = `2a47b687e58bcb415fc20ba1bc5a6217`;
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
