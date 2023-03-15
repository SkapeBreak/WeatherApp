import React, { useContext, useEffect } from 'react';
import './hero.css';
import { appContext } from '../../contexts/AppContext';
import Days from '../days/Days';
import Current from '../currentWeather/Current';
import Hours from '../hours/Hours';
import Spinner from '../spinner/Spinner';

export default function Hero() {
	const { days, hours, loading } = useContext(appContext);
	return (
		<>
			<div className={`${loading ? 'loading' : 'hero '}`}>
				{loading && <Spinner />}
				{!loading && (
					<>
						<div className='mainContent'>
							<Current />
						</div>
						<div className='sectionontainer'>
							<h3>Daily</h3>
							<div className='dailyWeather'>
								{days?.slice(1)?.map((day) => (
									<>
										<Days data={day} key={day?.timestamp} />
									</>
								))}
							</div>
						</div>
						<div className='sectionontainer'>
							<h3>Hourly</h3>
							<div className='hourlyWeather'>
								{hours?.slice(1, 24)?.map((hour) => (
									<>
										<Hours data={hour} />
									</>
								))}
							</div>
						</div>
					</>
				)}
			</div>
		</>
	);
}
