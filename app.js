const mainContainer = document.getElementById('main-container');

fetch('https://api.weatherapi.com/v1/current.json?key=27816db68c274bc9bd405434232007&q=New%20york', {mode: 'cors'})
    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        console.log(response);
        console.log(response.current.temp_c);
    });

