function currentTime() {
  let currentTime = new Date();
  const minutes = String(currentTime.getMinutes()).padStart(2, '0');
  let fulltime = currentTime.getHours() + ':' + minutes;

  return fulltime;
}

let timeNow = document.querySelector('#time-now');
timeNow.innerHTML = `${currentTime()}`;

function formatDate() {
  let now = new Date();
  let day = now.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  day = days[now.getDay()];

  return day;
}

let currentDay = document.querySelector('#day');
currentDay.innerHTML = `${formatDate()}`;

function showTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector('#temperature');
  let cityElement = document.querySelector('#city');
  let descriptionElement = document.querySelector('#description');
  let humidityElement = document.querySelector('#humidity');
  let windElement = document.querySelector('#wind');
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
};

let apiKey = "d9a1ffbb13c0cf12ce582064cf96a4eb";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=40.730610&lon=-73.935242&appid=${apiKey}&units=metric`;

console.log(apiUrl);
axios.get(apiUrl).then(showTemperature);

let fahrenheit = document.querySelector('#fahrenheit');
fahrenheit.addEventListener('click', function convertToFahrenheit(e) {
  e.preventDefault();
  let temperatureElement = document.querySelector('#temperature');
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round((temperature * 9 / 5 + 32));
});

let celcius = document.querySelector('#celcius');
celcius.addEventListener('click', function convertToCelcius(e) {
  e.preventDefault();
  let temperatureElement = document.querySelector('#temperature');
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round((temperature - 32) * 5 / 9);
});