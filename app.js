// Variables
const mainContainer = document.getElementById('main-container');
const formContainer = document.getElementById('form-container');
const weatherContainer = document.getElementById('weather-container');
const weatherIcon = document.getElementById('weather-icon');
const currentTemp = document.getElementById('current-temp');
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const errorMessage = document.getElementById('error-message');


// Event Listeners
searchForm.addEventListener('submit', e => {
    e.preventDefault();
    const location = searchInput.value;
    getWeather(location);
});

// Functions

// Get weather data from API
async function getWeather(location) {
    try {
        const url = 'https://api.weatherapi.com/v1/current.json?key=27816db68c274bc9bd405434232007&q=' + location;
        const response = await fetch(url, {mode: 'cors'});
        if(!response.ok) {
            throw new Error('No weather data found');
        }
        const data = await response.json();
        console.log(data);
        currentTemp.textContent = data.current.temp_c;
        weatherIcon.src = data.current.condition.icon;
        errorMessage.textContent = '';
    } catch (error) {
        errorMessage.textContent = "No weather data found. Please make sure your location entered is in the format of City, State or City, Country.";
        currentTemp.textContent = 'N/A';
    }
}

getWeather('Dallas, Texas');

