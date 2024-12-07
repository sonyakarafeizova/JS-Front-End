function attachEvents() {
    const locationInput = document.getElementById('location');
    const submitButton = document.getElementById('submit');
    const forecastDiv = document.getElementById('forecast');
    const currentDiv = document.getElementById('current');
    const upcomingDiv = document.getElementById('upcoming');

    submitButton.addEventListener('click', async () => {
        const locationName = locationInput.value;
        currentDiv.innerHTML = '<div class="label">Current conditions</div>';
        upcomingDiv.innerHTML = '<div class="label">Three-day forecast</div>';
        forecastDiv.style.display = 'none';

        try {
            const locationsResponse = await fetch('http://localhost:3030/jsonstore/forecaster/locations');
            if (!locationsResponse.ok) {
                throw new Error('Failed to fetch locations');
            }
            const locations = await locationsResponse.json();
            const location = locations.find(loc => loc.name.toLowerCase() === locationName.toLowerCase());

            if (!location) {
                throw new Error('Location not found');
            }

            const code = location.code;

            const [currentWeatherResponse, upcomingWeatherResponse] = await Promise.all([
                fetch(`http://localhost:3030/jsonstore/forecaster/today/${code}`),
                fetch(`http://localhost:3030/jsonstore/forecaster/upcoming/${code}`)
            ]);

            if (!currentWeatherResponse.ok || !upcomingWeatherResponse.ok) {
                throw new Error('Failed to fetch weather data');
            }

            const currentWeather = await currentWeatherResponse.json();
            const upcomingWeather = await upcomingWeatherResponse.json();

            forecastDiv.style.display = 'block';

            const symbol = getWeatherSymbol(currentWeather.forecast.condition);
            const degrees = '&#176;';

            const currentHTML = `
                <div class="forecasts">
                    <span class="condition symbol">${symbol}</span>
                    <span class="condition">
                        <span class="forecast-data">${currentWeather.name}</span>
                        <span class="forecast-data">${currentWeather.forecast.low}${degrees}/${currentWeather.forecast.high}${degrees}</span>
                        <span class="forecast-data">${currentWeather.forecast.condition}</span>
                    </span>
                </div>
            `;
            currentDiv.innerHTML += currentHTML;

            const upcomingHTML = `
                <div class="forecast-info">
                    ${upcomingWeather.forecast.map(day => `
                        <span class="upcoming">
                            <span class="symbol">${getWeatherSymbol(day.condition)}</span>
                            <span class="forecast-data">${day.low}${degrees}/${day.high}${degrees}</span>
                            <span class="forecast-data">${day.condition}</span>
                        </span>
                    `).join('')}
                </div>
            `;
            upcomingDiv.innerHTML += upcomingHTML;

        } catch (error) {
            forecastDiv.style.display = 'block';
            currentDiv.innerHTML += '<div class="label">Error</div>';
        }
    });
}

function getWeatherSymbol(condition) {
    switch (condition) {
        case 'Sunny': return '&#x2600;';
        case 'Partly sunny': return '&#x26C5;';
        case 'Overcast': return '&#x2601;';
        case 'Rain': return '&#x2614;';
        default: return '';
    }
}

attachEvents();