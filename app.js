        const API_KEY = 'demo'; 
        let currentWeatherData = null;

        const mockWeatherData = {
            'london': {
                location: 'London, UK',
                temperature: 18,
                description: 'partly cloudy',
                humidity: 65,
                windSpeed: 12,
                pressure: 1013,
                visibility: 10,
                uvIndex: 3,
                icon: '⛅',
                forecast: [
                    { day: 'Today', icon: '⛅', high: 20, low: 15, desc: 'Partly Cloudy' },
                    { day: 'Tomorrow', icon: '🌧️', high: 17, low: 12, desc: 'Light Rain' },
                    { day: 'Friday', icon: '☀️', high: 22, low: 16, desc: 'Sunny' },
                    { day: 'Saturday', icon: '🌤️', high: 19, low: 14, desc: 'Mostly Sunny' },
                    { day: 'Sunday', icon: '⛈️', high: 16, low: 11, desc: 'Thunderstorms' }
                ]
            },
            'paris': {
                location: 'Paris, France',
                temperature: 22,
                description: 'sunny',
                humidity: 55,
                windSpeed: 8,
                pressure: 1018,
                visibility: 15,
                uvIndex: 6,
                icon: '☀️',
                forecast: [
                    { day: 'Today', icon: '☀️', high: 24, low: 18, desc: 'Sunny' },
                    { day: 'Tomorrow', icon: '🌤️', high: 21, low: 16, desc: 'Mostly Sunny' },
                    { day: 'Friday', icon: '⛅', high: 19, low: 14, desc: 'Partly Cloudy' },
                    { day: 'Saturday', icon: '🌧️', high: 17, low: 12, desc: 'Rainy' },
                    { day: 'Sunday', icon: '⛅', high: 20, low: 15, desc: 'Partly Cloudy' }
                ]
            },
            'new york': {
                location: 'New York, USA',
                temperature: 25,
                description: 'clear sky',
                humidity: 70,
                windSpeed: 15,
                pressure: 1015,
                visibility: 12,
                uvIndex: 7,
                icon: '☀️',
                forecast: [
                    { day: 'Today', icon: '☀️', high: 27, low: 22, desc: 'Clear Sky' },
                    { day: 'Tomorrow', icon: '🌤️', high: 24, low: 19, desc: 'Mostly Sunny' },
                    { day: 'Friday', icon: '⛈️', high: 21, low: 17, desc: 'Thunderstorms' },
                    { day: 'Saturday', icon: '🌧️', high: 18, low: 14, desc: 'Heavy Rain' },
                    { day: 'Sunday', icon: '⛅', high: 23, low: 18, desc: 'Partly Cloudy' }
                ]
            },
            'tokyo': {
                location: 'Tokyo, Japan',
                temperature: 28,
                description: 'hot and humid',
                humidity: 80,
                windSpeed: 6,
                pressure: 1008,
                visibility: 8,
                uvIndex: 9,
                icon: '🌤️',
                forecast: [
                    { day: 'Today', icon: '🌤️', high: 30, low: 25, desc: 'Hot & Humid' },
                    { day: 'Tomorrow', icon: '⛈️', high: 26, low: 22, desc: 'Thunderstorms' },
                    { day: 'Friday', icon: '🌧️', high: 23, low: 19, desc: 'Rainy' },
                    { day: 'Saturday', icon: '☀️', high: 29, low: 24, desc: 'Sunny' },
                    { day: 'Sunday', icon: '⛅', high: 27, low: 23, desc: 'Partly Cloudy' }
                ]
            }
        };

        function searchWeather() {
            const city = document.getElementById('cityInput').value.trim().toLowerCase();
            if (!city) {
                showError('Please enter a city name.');
                return;
            }

            showLoading();
            
            setTimeout(() => {
                if (mockWeatherData[city]) {
                    displayWeather(mockWeatherData[city]);
                } else {
                    showError(`Weather data for "${city}" not found. Try: London, Paris, New York, or Tokyo`);
                }
            }, 1000);
        }

        function getCurrentLocation() {
            if (navigator.geolocation) {
                showLoading();
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        setTimeout(() => {
                            displayWeather(mockWeatherData['london']);
                        }, 1000);
                    },
                    (error) => {
                        showError('Unable to get your location. Please search for a city instead.');
                    }
                );
            } else {
                showError('Geolocation is not supported by this browser.');
            }
        }

        function showLoading() {
            document.getElementById('weatherContainer').innerHTML = `
                <div class="loading">
                    <div style="font-size: 3rem; margin-bottom: 20px;">🌀</div>
                    Loading weather data...
                </div>
            `;
        }

        function showError(message) {
            document.getElementById('weatherContainer').innerHTML = `
                <div class="error">
                    ❌ ${message}
                </div>
            `;
        }

        function displayWeather(data) {
            const now = new Date();
            const dateString = now.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });

            const weatherHTML = `
                <div class="weather-card">
                    <div class="current-weather">
                        <div class="location">${data.location}</div>
                        <div class="date">${dateString}</div>
                        <div class="weather-icon">${data.icon}</div>
                        <div class="temperature">${data.temperature}°C</div>
                        <div class="description">${data.description}</div>
                        
                        <div class="weather-details">
                            <div class="detail-item">
                                <div class="detail-label">💧 Humidity</div>
                                <div class="detail-value">${data.humidity}%</div>
                            </div>
                            <div class="detail-item">
                                <div class="detail-label">💨 Wind Speed</div>
                                <div class="detail-value">${data.windSpeed} km/h</div>
                            </div>
                            <div class="detail-item">
                                <div class="detail-label">🌡️ Pressure</div>
                                <div class="detail-value">${data.pressure} hPa</div>
                            </div>
                            <div class="detail-item">
                                <div class="detail-label">👁️ Visibility</div>
                                <div class="detail-value">${data.visibility} km</div>
                            </div>
                            <div class="detail-item">
                                <div class="detail-label">☀️ UV Index</div>
                                <div class="detail-value">${data.uvIndex}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="weather-card">
                    <h2 style="color: white; text-align: center; margin-bottom: 20px;">5-Day Forecast</h2>
                    <div class="forecast-container">
                        ${data.forecast.map(day => `
                            <div class="forecast-item">
                                <div class="forecast-day">${day.day}</div>
                                <div class="forecast-icon">${day.icon}</div>
                                <div style="font-size: 0.9rem; opacity: 0.8; margin: 5px 0;">${day.desc}</div>
                                <div class="forecast-temps">
                                    <span>High: ${day.high}°</span>
                                    <span>Low: ${day.low}°</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;

            document.getElementById('weatherContainer').innerHTML = weatherHTML;
            currentWeatherData = data;
        }

        document.getElementById('cityInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchWeather();
            }
        });

        window.addEventListener('load', () => {
            displayWeather(mockWeatherData['london']);
        });

        document.addEventListener('DOMContentLoaded', function() {
            setInterval(() => {
                const icons = document.querySelectorAll('.weather-icon, .forecast-icon');
                icons.forEach(icon => {
                    icon.style.transform = `translateY(${Math.sin(Date.now() / 1000) * 3}px)`;
                });
            }, 50);
        });