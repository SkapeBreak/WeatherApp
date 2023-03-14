import React, { useContext } from 'react';
import './hero.css';
import { appContext } from '../../contexts/AppContext';
import Days from '../days/Days';
import Current from '../currentWeather/Current';
import Hours from '../hours/Hours';

export default function Hero() {
	const { days, hours } = useContext(appContext);
	// console.log(hours);
	return (
		<>
			<div className='hero'>
				<div className='mainContent'>
					<Current />
				</div>
				<div className='sectionontainer'>
					<h4>5 days</h4>
					<div className='dailyWeather'>
						{days?.map((day) => (
							<>
								<Days data={day} key={day?.timestamp} />
							</>
						))}
					</div>
				</div>
				<div className='sectionontainer'>
					<h4>hourly</h4>
					<div className='hourlyWeather'>
						{hours?.slice(0, 24)?.map((hour) => (
							<>
								<Hours data={hour} />
							</>
						))}
					</div>
				</div>
			</div>
		</>
	);
}
