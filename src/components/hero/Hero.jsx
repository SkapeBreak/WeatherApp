import React, { useContext } from 'react';
import './hero.css';
import { appContext } from '../../contexts/AppContext';
import Days from '../days/Days';
import Current from '../currentWeather/Current';

export default function Hero() {
	const { days, hours } = useContext(appContext);

	return (
		<>
			<div className='hero'>
				<div className='mainContent'>
					<Current />
				</div>
				<div className='hourlyWeather'></div>
				<div className='dailyWeather'>
					{days?.map((day) => (
						<>
							<Days data={day} />
						</>
					))}
				</div>
			</div>
		</>
	);
}
