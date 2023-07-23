const mainContainer = document.getElementById('main-container');
const currentTemp = document.getElementById('current-temp');

async function getWeather(location) {
    const url = 'https://api.weatherapi.com/v1/current.json?key=27816db68c274bc9bd405434232007&q=' + location;
    const response = await fetch(url, {mode: 'cors'});
    const data = await response.json();
    console.log(data);
    currentTemp.textContent = data.current.temp_c;
}
getWeather('London');
