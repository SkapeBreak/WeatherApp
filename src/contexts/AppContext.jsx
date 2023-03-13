import React, { useState, useEffect, createContext } from 'react';
// import { makeWeatherRequest } from '../services/weatherApiRequest';
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
	const latitude = 51.188373; // replace with your latitude coordinate
	const longitude = -114.0674; // replace with your longitude coordinate

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
		const unsubscribe = makeWeatherRequest(
			latitude,
			longitude,
			Intl.DateTimeFormat().resolvedOptions().timeZone
		);

		// Stop listening for updates when the component unmounts
		return () => {
			unsubscribe();
		};
	}, []);

	const appStates = {
		setCurrentWeatherData,
		currentWeatherData,
		setDays,
		days,
		setHours,
		hours,
		loading,
		setLoading,
	};

	return (
		<appContext.Provider value={appStates}>{children}</appContext.Provider>
	);
};

export default AppContext;
