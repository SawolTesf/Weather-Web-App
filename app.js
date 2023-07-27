// Variables
const mainContainer = document.getElementById('main-container');
const formContainer = document.getElementById('form-container');
const liveDate = document.getElementById('date');
const clock = document.getElementById('clock');
const weatherContainer = document.getElementById('weather-container');
const locationName = document.getElementById('location-name');
const currentDate = document.getElementById('current-date');
const currentTime = document.getElementById('current-time');
const weatherIcon = document.getElementById('weather-icon');
const weatherDescription = document.getElementById('weather-description');
const currentTemp = document.getElementById('current-temp');
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const errorMessage = document.getElementById('error-message');
const unitSwitch = document.getElementById('unit-switch');
const unitLabel = document.getElementById('unit-label');

// Event Listeners

// Clear search input field on page load
window.onload = () => {
    searchInput.value = '';
}

// Get weather data when search form is submitted
searchForm.addEventListener('submit', e => {
    e.preventDefault();
    const location = searchInput.value;
    getWeather(location);
});

// Update temperature display when unit switch is changed
unitSwitch.addEventListener('change', () => {
    updateTempDisplay();
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

        // Update weather information with data from API
        locationName.textContent = data.location.name + ', ' + data.location.region;
        currentTemp.temp_c = data.current.temp_c; // Store temperature in Celsius
        currentTemp.temp_f = data.current.temp_f; // Store temperature in Fahrenheit
        weatherIcon.src = data.current.condition.icon;
        weatherDescription.textContent        = data.current.condition.text;
        currentDate.textContent = getDate(data.current.last_updated.substr(0,10)) + " at " + getTime(data.current.last_updated_epoch);
        errorMessage.textContent = '';
    } catch (error) {
        // Display error message
        errorMessage.textContent = "No weather data found. Please make sure your location entered is in the format of City, State or City, Country.";

        // Clear weather data
        currentTemp.textContent = 'N/A';
        locationName.textContent = 'N/A';
        currentDate.textContent = 'N/A';
        weatherDescription.textContent = 'N/A';
    }

    // Update temperature display
    updateTempDisplay();
}

// Get weather data for default location on page load
getWeather('Dallas, Texas');

// Update temperature display based on selected unit
function updateTempDisplay() {
    if (currentTemp.temp_c && currentTemp.temp_f) {
        if (unitSwitch.checked) {
            currentTemp.textContent = currentTemp.temp_f + '°F';
            unitLabel.textContent = '°F';
        } 
        else {
            currentTemp.textContent = currentTemp.temp_c + '°C';
            unitLabel.textContent = '°C';
        }
    }
}

// Format date string
function getDate(dateString) {
    // Parsing date string
    let [year, month, day] = dateString.split('-').map(Number);

    // Creating a date object
    let today = new Date(year, month - 1, day);

    // Getting short month name (e.g. "Oct")
    let monthName = today.toLocaleString('en-us', { month: 'long' });

    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let dayName = days[today.getDay()];

    let fullYear = today.getFullYear();

    liveDate.textContent = day + ' ' + monthName + ' ' + fullYear + "   |";

    return 'Last updated: ' + dayName + ', ' + monthName + ' ' + day + ', ' + fullYear;
}

// Format time string
function getTime(timestamp) {
    let date = new Date(timestamp * 1000);
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    let formattedTime = hours + ':' + minutes.slice(-2);
    return formattedTime;
}

// Update clock display
function updateClock() {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let session = "AM";

    if (hours == 0) {
        hours = 12;
    }
    if (hours > 12) {
        hours = hours - 12;
        session = "PM";
    }

    // Format time string
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    let time = hours + ":" + minutes + ":" + seconds + " " + session;

    clock.textContent = time;
    setTimeout(updateClock, 1000);
}
updateClock();