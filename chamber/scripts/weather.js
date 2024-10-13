
    const apiKey = 'b9a2874331405faf841f67a3ecd83769'; // Sustituye con tu propia API key
    const city = 'La Calera'; // Sustituye con tu ciudad o localización
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`;

    // Función para capitalizar cada palabra
    const capitalizeWords = (str) => {
        return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    // Función para obtener el clima actual
    const getCurrentWeather = async () => {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error('Error al obtener el clima actual');
            const data = await response.json();

            // Actualizar el DOM con los datos recibidos
            document.getElementById('temp').textContent = `${Math.round(data.main.temp)}°F`; // Redondear la temperatura a cero decimales
            document.getElementById('high').textContent = `High: ${Math.round(data.main.temp_max)}°F`; // Redondear a cero decimales
            document.getElementById('low').textContent = `Low: ${Math.round(data.main.temp_min)}°F`; // Redondear a cero decimales
            document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;

            // Mostrar todos los eventos meteorológicos
            if (data.weather && data.weather.length > 0) {
                const weatherDescriptions = data.weather.map(event => capitalizeWords(event.description)); // Capitalizar cada palabra
                document.getElementById('desc').textContent = weatherDescriptions.join(', '); // Mostrar todos los eventos separados por coma
            } else {
                document.getElementById('desc').textContent = 'No weather data available';
            }


            // // Actualizar el DOM con los datos recibidos
            // document.getElementById('temp').textContent = `${data.main.temp}°F`;
            // document.getElementById('desc').textContent = data.weather[0].description;
            // document.getElementById('high').textContent = `High: ${data.main.temp_max}°F`;
            // document.getElementById('low').textContent = `Low: ${data.main.temp_min}°F`;
            // document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;

            // Convertir la hora de Unix para Sunrise y Sunset
            const sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            document.getElementById('sunrise').textContent = `Sunrise: ${sunriseTime}`;
            document.getElementById('sunset').textContent = `Sunset: ${sunsetTime}`;
            // Obtener y mostrar el icono del clima
            const iconCode = data.weather[0].icon;
            const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
            document.getElementById('weather-icon').src = iconUrl; // Asignar el ícono al src
        } catch (error) {
            console.error('Error fetching the weather data:', error);
        }
    };

    // Función para obtener el pronóstico del clima
    const getWeatherForecast = async () => {
        try {
            const response = await fetch(forecastUrl);
            if (!response.ok) throw new Error('Error al obtener el pronóstico del clima');
            const data = await response.json();

            

            // Función para obtener el nombre de los días a partir de una fecha
            const getDayName = (dateStr, locale) => {
                const date = new Date(dateStr);
                return date.toLocaleDateString(locale, { weekday: 'long' });
            };

            // Obtener los próximos tres días
            const forecastDays = [
                { id: 'today', index: 0 },
                { id: 'wednesday', index: 8 }, // Pronóstico para 24 horas después
                { id: 'thursday', index: 16 }, // Pronóstico para 48 horas después
            ];

            // forecastDays.forEach((day, idx) => {
            //     // Crear una nueva fecha sin mutar el valor original
            //     const futureDate = new Date();
            //     futureDate.setDate(futureDate.getDate() + idx); // Sumamos el índice para obtener los días siguientes
            //     const dayName = futureDate.toLocaleDateString('en-US', { weekday: 'long' }); // Obtener el nombre del día
            //     document.getElementById(day.id).textContent = `${dayName}: ${data.list[day.index].main.temp}°F`;
            // });
            // forecastDays.forEach((day, idx) => {
            //     // Crear una nueva fecha sin mutar el valor original
            //     const futureDate = new Date();
            //     futureDate.setDate(futureDate.getDate() + idx); // Sumamos el índice para obtener los días siguientes
            //     const dayName = futureDate.toLocaleDateString('en-US', { weekday: 'long' }); // Obtener el nombre del día
            //     const forecastData = data.list[day.index];

            //     // Obtener la temperatura y redondearla
            //     const temp = Math.round(forecastData.main.temp);
                
            //     // Obtener todas las descripciones de eventos meteorológicos para este día
            //     const weatherDescriptions = forecastData.weather.map(event => capitalizeWords(event.description)).join(', ');

            //     // Actualizar el DOM con el pronóstico
            //     document.getElementById(day.id).textContent = `${dayName}: ${temp}°F, ${weatherDescriptions}`; // Mostrar temp y todos los eventos
            // });
            forecastDays.forEach((day, idx) => {
                // Crear una nueva fecha sin mutar el valor original
                const futureDate = new Date();
                futureDate.setDate(futureDate.getDate() + idx); // Sumamos el índice para obtener los días siguientes
                const dayName = futureDate.toLocaleDateString('en-US', { weekday: 'long' }); // Obtener el nombre del día
                const forecastData = data.list[day.index];

                // Obtener la temperatura y redondearla
                const temp = Math.round(forecastData.main.temp);
                
                // Obtener todas las descripciones de eventos meteorológicos para este día
                const weatherDescriptions = forecastData.weather.map(event => capitalizeWords(event.description)).join(', ');

                // Obtener el icono del clima
                const iconCode = forecastData.weather[0].icon; // Asignar el código del icono
                const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`; // Crear la URL del icono

                // Actualizar el DOM con el pronóstico
                document.getElementById(day.id).innerHTML = `<img src="${iconUrl}" alt="Weather Icon" /> ${dayName}: ${temp}°F, ${weatherDescriptions}`; // Mostrar temp y todos los eventos con el icono
            });

            
        } catch (error) {
            console.error('Error fetching the forecast data:', error);
        }
    };

    // Llamar a las funciones cuando la página cargue
    window.onload = () => {
        getCurrentWeather();
        getWeatherForecast();
    };

