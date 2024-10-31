
// weather.js
const apiKey = 'b9a2874331405faf841f67a3ecd83769'; // Replace with your OpenWeatherMap API key

export function getCurrentWeather(city, callback) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`)
        .then(response => response.json())
        .then(data => {
            callback(data, 'current');
        })
        .catch(error => {
            console.error('Error fetching current weather:', error);
        });
}

export function getWeatherForecast(city, callback) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`)
        .then(response => response.json())
        .then(data => {
            callback(data, 'forecast');
        })
        .catch(error => {
            console.error('Error fetching weather forecast:', error);
        });
}
