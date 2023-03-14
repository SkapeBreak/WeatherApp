import React, { useContext, useState } from 'react';
import { getIconUrl } from '../../services/iconRequest';
import { appContext } from '../../contexts/AppContext';
import './current.css';

export default function Current() {
	const { currentWeatherData, areaName } = useContext(appContext);
	console.log(currentWeatherData);
	return (
		<>
			<h1>
				Current Weather <br /> {areaName}
			</h1>
			<div className='iconTemp'>
				<div className='iconWrapper'>
					<img
						src={getIconUrl(currentWeatherData?.iconCode)}
						alt='icon'
						style={{ width: '100%', height: '100%' }}
					/>
				</div>
				<h2>{currentWeatherData?.currentTemp}</h2>
			</div>
			<h3>Feels Like: {currentWeatherData?.highFeelsLike}</h3>
			<h2>
				Winds Spped:
				<br /> {currentWeatherData?.windSpeed} Km/hr
			</h2>
		</>
	);
}
