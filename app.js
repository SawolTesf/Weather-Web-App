// Variables
const mainContainer = document.getElementById('main-container');
const formContainer = document.getElementById('form-container');
const weatherContainer = document.getElementById('weather-container');
const locationName = document.getElementById('location-name');
const weatherIcon = document.getElementById('weather-icon');
const weatherDescription = document.getElementById('weather-description');
const currentDate = document.getElementById('current-date');
const currentTemp = document.getElementById('current-temp');
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const errorMessage = document.getElementById('error-message');

const unitSwitch = document.getElementById('unit-switch');
const unitLabel = document.getElementById('unit-label');



// Event Listeners
searchForm.addEventListener('submit', e => {
    e.preventDefault();
    const location = searchInput.value;
    getWeather(location);
});

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

        locationName.textContent = data.location.name + ', ' + data.location.region;

        currentTemp.temp_c = data.current.temp_c; // Store temperature in Celsius
        currentTemp.temp_f = data.current.temp_f; // Store temperature in Fahrenheit

        weatherIcon.src = data.current.condition.icon;

        weatherDescription.textContent = data.current.condition.text;

        currentDate.textContent = getDate(data.current.last_updated.substr(0,10));

        errorMessage.textContent = '';
    } catch (error) {
        // Display error message
        errorMessage.textContent = "No weather data found. Please make sure your location entered is in the format of City, State or City, Country.";

        // Clear weather data
        currentTemp.textContent = 'N/A';
        locationName.textContent = 'N/A';
    }

    updateTempDisplay();
}


getWeather('Dallas, Texas');

function updateTempDisplay() {
    if (unitSwitch.checked) {
        currentTemp.textContent = currentTemp.temp_f + '°F';
        unitLabel.textContent = '°F';
    } else {
        currentTemp.textContent = currentTemp.temp_c + '°C';
        unitLabel.textContent = '°C';
    }
}


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

    return 'Last updated: ' + dayName + ', ' + monthName + ' ' + day + ', ' + fullYear;
}

