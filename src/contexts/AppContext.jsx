import React, { useState, useEffect, createContext } from 'react';
import {
	parseCurrentWeather,
	parseDailyWeather,
	parseHourlyWeather,
} from '../utils/parse';
import axios from 'axios';

export const appContext = createContext();

const AppContext = ({ children }) => {
	const [currentWeatherData, setCurrentWeatherData] = useState({});
	const [days, setDays] = useState([]);
	const [hours, setHours] = useState([]);
	const [loading, setLoading] = useState(false);
	const [latitude, setLatitude] = useState(null);
	const [longitude, setLongitude] = useState(null);
	const [areaName, setAreaName] = useState('');

	const makeWeatherRequest = (lat, lon, timezone) => {
		setLoading(true);
		const URL =
			'https://api.open-meteo.com/v1/forecast?&hourly=temperature_2m,apparent_temperature,precipitation_probability,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&current_weather=true&timeformat=unixtime';

		axios
			.get(URL, {
				params: {
					latitude: lat,
					longitude: lon,
					timezone,
				},
			})
			.then(({ data }) => {
				setCurrentWeatherData(parseCurrentWeather(data));
				setDays(parseDailyWeather(data));
				setHours(parseHourlyWeather(data));
				setLoading(false);
			});
	};

	useEffect(() => {
		if (!latitude && !longitude) {
			const success = (position) => {
				setLatitude(position.coords.latitude);
				setLongitude(position.coords.longitude);
			};

			const error = () => {
				console.error('Unable to retrieve your location');
			};

			navigator.geolocation.getCurrentPosition(success, error);
		}
	}, []);

	useEffect(() => {
		if (latitude && longitude) {
			makeWeatherRequest(
				latitude,
				longitude,
				Intl.DateTimeFormat().resolvedOptions().timeZone
			);
		}
	}, [latitude, longitude]);

	const getLocationName = async (latitude, longitude) => {
		try {
			const response = await axios.get(
				`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${
					import.meta.env.VITE_MAPS_API_KEY
				}`
			);
			const locationName = response.data.results[0].formatted_address;
			return locationName;
		} catch (error) {
			console.error(error);
		}
	};
	useEffect(() => {
		if (latitude && longitude) {
			getLocationName(latitude, longitude).then((res) => setAreaName(res));
		}
	}, [latitude, longitude]);

	// console.log(currentWeatherData);
	// const getLocationName(latitude, longitude).then((res) => {
	// 	setAreaName(res);
	// 	console.log(res);
	// });

	const appStates = {
		setCurrentWeatherData,
		currentWeatherData,
		setDays,
		days,
		setHours,
		hours,
		loading,
		setLoading,
		areaName,
	};

	return (
		<appContext.Provider value={appStates}>{children}</appContext.Provider>
	);
};

export default AppContext;
