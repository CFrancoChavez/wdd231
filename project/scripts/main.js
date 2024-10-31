
// Import functions at the top level
import { initNameSearch } from './nameApi.js';
import { getCurrentWeather, getWeatherForecast } from './weather.js';

document.addEventListener('DOMContentLoaded', () => {
    // Cache DOM elements inside DOMContentLoaded to ensure they are available
    const cityInput = document.getElementById('cityInput');
    const weatherContainer = document.getElementById('weatherContainer');
    const nameSearchContainer = document.getElementById('name-results');
    let lastWeatherData = null;

    // Initialize search functionality
    initNameSearch();

    // Event listeners for the weather app buttons
    document.getElementById('currentWeatherBtn').addEventListener('click', () => {
        const city = cityInput.value;
        getCurrentWeather(city, displayWeatherData);
        // Add scrolling control to the weather result
        const weatherContainer = document.getElementById('weatherContainer');
        weatherContainer.style.maxHeight = "150px"; // Limit height
        weatherContainer.style.overflowY = "auto"; // Enable scrolling if needed
    });

    document.getElementById('forecastBtn').addEventListener('click', () => {
        const city = cityInput.value;
        getWeatherForecast(city, displayWeatherData);
        // Add scrolling control to the weather result
        const weatherContainer = document.getElementById('weatherContainer');
        weatherContainer.style.maxHeight = "150px"; // Limit height
        weatherContainer.style.overflowY = "auto"; // Enable scrolling if needed
    });

    // Function to display weather data in the DOM
    function displayWeatherData(data, type) {
        // Check if data is the same as last to prevent redundant updates
        if (JSON.stringify(data) === JSON.stringify(lastWeatherData)) return;
        lastWeatherData = data;

        // Clear previous weather information
        weatherContainer.innerHTML = '';
        if (type === 'current') {
            const iconCode = data.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
            weatherContainer.innerHTML = `
                <h3>Current Weather for ${data.name}</h3>
                <img src="${iconUrl}" alt="${data.weather[0].description}">
                <p><strong>Temperature:</strong> ${data.main.temp} °F</p>
                <p><strong>Feels Like:</strong> ${data.main.feels_like} °F</p>
                <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
                <p><strong>Weather:</strong> ${data.weather[0].description}</p>
                <p><strong>Wind Speed:</strong> ${data.wind.speed} mph</p>
            `;
        } else if (type === 'forecast') {
            weatherContainer.innerHTML = `<h3>Weather Forecast for ${data.city.name}</h3>`;
            const fragment = document.createDocumentFragment();
            data.list.slice(0, 5).forEach(item => {
                const forecastElem = document.createElement('div');
                const iconCode = item.weather[0].icon;
                const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

                forecastElem.innerHTML = `
                    <p><strong>Date/Time:</strong> ${new Date(item.dt * 1000).toLocaleString()}</p>
                    <img src="${iconUrl}" alt="${item.weather[0].description}">
                    <p><strong>Temperature:</strong> ${item.main.temp} °F</p>
                    <p><strong>Weather:</strong> ${item.weather[0].description}</p>
                    <p><strong>Wind Speed:</strong> ${item.wind.speed} mph</p>
                    <hr>
                `;
                fragment.appendChild(forecastElem);
            });
            weatherContainer.appendChild(fragment);
        }
    }

    // Event listener to clear results when clicking outside specific containers
    document.addEventListener('click', (event) => {
        const isOutsideWeather = !weatherContainer.contains(event.target);
        const isOutsideNameSearch = !nameSearchContainer.contains(event.target);

        // Clear content if clicked outside both containers
        if (isOutsideWeather && isOutsideNameSearch) {
            weatherContainer.innerHTML = '';
            nameSearchContainer.innerHTML = ''; // Clear name search results
        }
    });
    window.addEventListener('scroll', () => {
        const parallaxBg = document.querySelector('.parallax-background');
        let offset = window.scrollY; // Using scrollY instead of pageYOffset
        parallaxBg.style.transform = `translateY(${offset * 0.5}px)`;
    });
    window.addEventListener('scroll', () => {
    const title = document.querySelector('.title');
    const scrollPosition = window.scrollY; // Track vertical scroll

    // Adjust scroll threshold as needed
    if (scrollPosition > 200) {
        title.classList.add('dark-text'); // Change to darker color
    } else {
        title.classList.remove('dark-text'); // Reset to light color
    }
});

// Menú de hamburguesa

});
