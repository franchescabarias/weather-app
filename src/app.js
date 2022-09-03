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
};

let currentDay = document.querySelector('#current-day');
currentDay.innerHTML = `${formatDate()}`;


let currentCity = document.querySelector('#search-form');
currentCity.addEventListener('submit', function searchCity(e) {
  e.preventDefault();
  const apiKey = "d9a1ffbb13c0cf12ce582064cf96a4eb";
  let city = document.querySelector('#search-input').value;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  axios.get(apiUrl).then(showTemperature);
});

const apiKey = "d9a1ffbb13c0cf12ce582064cf96a4eb";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=48.8566&lon=2.3522&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(showTemperature);

function showTemperature(response) {
  console.log(response.data);
  document.querySelector('#city').innerHTML = response.data.name;
  document.querySelector('#temperature').innerHTML = Math.round(response.data.main.temp);
  let descriptionElement = document.querySelector('#description');
  let humidityElement = document.querySelector('#humidity');
  let windElement = document.querySelector('#wind');
  let iconElement = document.querySelector('#current-icon');

  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
};



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