import React, { useState, useEffect, createContext } from 'react';
// import { makeWeatherRequest } from '../services/weatherApiRequest';
import {
	parseCurrentWeather,
	parseDailyWeather,
	parseHourlyWeather,
} from '../utils/parse';
import axios from 'axios';
import { ICON_MAP } from '../services/iconRequest';

export const appContext = createContext();

const AppContext = ({ children }) => {
	const [weatherData, setWeatherData] = useState({});
	const [icon, setIcon] = useState({});
	const latitude = 51.04577997809304; // replace with your latitude coordinate
	const longitude = -114.07146356971506; // replace with your longitude coordinate

	const getIconUrl = (iconCode) => {
		console.log(iconCode);
		return setIcon(`../../assets/${ICON_MAP.get(iconCode)}.svg`);
	};

	const makeWeatherRequest = (lat, lon, timezone) => {
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
				console.log(data);
				setWeatherData({
					current: parseCurrentWeather(data),
					daily: parseDailyWeather(data),
					hourly: parseHourlyWeather(data),
				});
				getIconUrl(data?.current_weather?.weathercode);
			});
	};

	useEffect(() => {
		// getCollection();
		// const unsubscribe =
		makeWeatherRequest(
			latitude,
			longitude,
			Intl.DateTimeFormat().resolvedOptions().timeZone
		);

		// Stop listening for updates when the component unmounts
		// return () => {
		// 	unsubscribe();
		// };
	}, []);

	const appStates = {
		weatherData,
		setWeatherData,
		icon,
	};

	return (
		<appContext.Provider value={appStates}>{children}</appContext.Provider>
	);
};

export default AppContext;
