import React, { useContext } from 'react';
import './hero.css';
import { appContext } from '../../contexts/AppContext';

export default function Hero() {
	const { weatherData, icon } = useContext(appContext);

	return (
		<>
			<div className='hero'>
				<div className='mainContent'>
					<h1>
						Current Weather <br /> Calgary, AB
					</h1>
					<div className='iconTemp'>
						<div className='iconWrapper'>
							<img
								src={icon}
								alt='icon'
								style={{ width: '100%', height: '100%' }}
							/>
						</div>
						<h2>{weatherData?.current?.currentTemp}</h2>
					</div>
					<h3>Feels Like: {weatherData?.current?.lowFeelsLike}</h3>
					<h2>Winds Spped: {weatherData?.current?.windSpeed} Km/hr</h2>
				</div>
				<div className='hourlyWeather'></div>
				<div className='dailyWeather'></div>
			</div>
		</>
	);
}
