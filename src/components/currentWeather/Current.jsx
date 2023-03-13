import React, { useContext } from 'react';
import { getIconUrl } from '../../services/iconRequest';
import { appContext } from '../../contexts/AppContext';
import './current.css';

export default function Current() {
	const { currentWeatherData } = useContext(appContext);
	return (
		<>
			<h1>
				Current Weather <br /> Calgary, AB
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
			<h3>Feels Like: {currentWeatherData?.lowFeelsLike}</h3>
			<h2>Winds Spped: {currentWeatherData?.windSpeed} Km/hr</h2>
		</>
	);
}
