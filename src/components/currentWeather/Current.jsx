import React, { useContext, useState } from 'react';
import { getIconUrl } from '../../services/iconRequest';
import { appContext } from '../../contexts/AppContext';
import './current.css';

export default function Current() {
	const { currentWeatherData, areaName } = useContext(appContext);
	return (
		<>
			<div className='center'>
				<h1 id='current-title'>
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
					<h1>{currentWeatherData?.currentTemp}</h1>
				</div>

				<h3 id='other'>
					Feels Like: {currentWeatherData?.highFeelsLike}
					<br />
					Winds Spped: {currentWeatherData?.windSpeed} Km/h
				</h3>
			</div>
		</>
	);
}
