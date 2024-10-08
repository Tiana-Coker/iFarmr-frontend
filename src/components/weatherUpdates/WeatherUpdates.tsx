import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WeatherUpdates: React.FC = () => {
    const [weather, setWeather] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // Function to fetch city name using coordinates
    const fetchCityFromCoordinates = async (lat: number, lon: number): Promise<string | null> => {
        try {
            const geoResponse = await axios.get(import.meta.env.VITE_WEATHER_API_BASE_URL, {
                params: {
                    key: import.meta.env.VITE_OPENCAGE_API_KEY,  
                    q: `${lat},${lon}`,  // Pass latitude and longitude
                },
            });
            
            const city = geoResponse.data.results[0].components.city || geoResponse.data.results[0].components.town || geoResponse.data.results[0].components.village;
            return city || null;
        } catch (err) {
            console.error('Error fetching city from coordinates:', err);
            return null;
        }
    };

    // Function to fetch weather data using city name
    const fetchWeatherData = async (city: string) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/weather`, {
                params: { city },  
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            setWeather(response.data);
            setError(null);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching weather data:', err);
            setError('Failed to fetch weather data from backend.');
            setLoading(false);
        }
    };

    // Use geolocation to get user's location
    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;

                    // Fetch city name from coordinates
                    const city = await fetchCityFromCoordinates(lat, lon);
                    if (city) {
                        fetchWeatherData(city);
                    } else {
                        setError("Unable to determine city from your location.");
                    }
                },
                (err) => {
                    console.error('Geolocation error:', err);
                    setError('Failed to get location from the browser. Please ensure you allow location access.');
                    setLoading(false);
                }
            );
        } else {
            setError("Geolocation is not available on this device.");
            setLoading(false);
        }
    }, []);

    if (loading) {
        return <div className="text-center text-gray-500">Loading weather data...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    return (
        <div className="bg-white border p-2 rounded-lg shadow-sm relative w-full mt-6 font-raleway">
            {weather ? (
                <div className="text-center">
                    <h3 className="text-2xl font-semibold mb-4">Weather Update</h3>
                    <div className="flex justify-center items-center mb-4">
                        <img src={weather.current.condition.icon} alt={weather.current.condition.text} className="w-16 h-16" />
                        <div className="ml-4">
                            <p className="text-4xl font-bold">{weather.current.temp_c}°C</p>
                            <p className="text-lg text-gray-600">{weather.current.condition.text}</p>
                        </div>
                    </div>
                    <p className="text-gray-700 text-sm mb-2">Location: <span className="font-semibold">{weather.location.name}</span></p>
                    <p className="text-gray-700 text-sm mb-2">Wind Speed: <span className="font-semibold">{weather.current.wind_kph} kph</span></p>
                    <p className="text-gray-700 text-sm mb-2">Humidity: <span className="font-semibold">{weather.current.humidity}%</span></p>
                </div>
            ) : (
                <p className="text-center text-gray-500">No weather data available.</p>
            )}
        </div>
    );
};

export default WeatherUpdates;
