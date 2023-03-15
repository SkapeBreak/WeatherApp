import React from 'react';
import { getIconUrl } from '../../services/iconRequest';
import './hours.css';

export default function Hours({ data }) {
	const DAY_FROMATTER = new Intl.DateTimeFormat(undefined, { weekday: 'long' });
	const HOUR_FROMATTER = new Intl.DateTimeFormat(undefined, {
		hour: 'numeric',
	});
	// console.log(data);
	return (
		<>
			<div className='hour' key={HOUR_FROMATTER?.format(data?.timestamp)}>
				<p id='formatted-day'>{DAY_FROMATTER?.format(data?.timestamp)} </p>
				<p style={{ minWidth: 'fit-content' }}>
					{HOUR_FROMATTER?.format(data?.timestamp)}
				</p>
				<img
					src={getIconUrl(data?.iconCode)}
					alt='icon'
					width={20}
					height={20}
				/>
				<p>
					Feels Like
					<br />
					{data?.feelsLike}
				</p>
				<p>
					High
					<br />
					{data?.temp}
				</p>
				<p>
					{data?.windSpeed}
					<br />
					Km/h
				</p>
				<p>
					P.O.P
					<br />
					{data?.precip} %
				</p>
			</div>
		</>
	);
}
