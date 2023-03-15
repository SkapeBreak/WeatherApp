import { getIconUrl } from '../../services/iconRequest';
import './days.css';

export default function Days({ data }) {
	const DAY_FROMATTER = new Intl.DateTimeFormat(undefined, { weekday: 'long' });
	console.log(data);
	return (
		<>
			<div className='day'>
				<img
					src={getIconUrl(data?.iconCode)}
					alt='icon'
					width={20}
					height={20}
				/>
				<p>{data?.maxTemp}</p>
				<p id='formatted-day'>{DAY_FROMATTER?.format(data?.timestamp)}</p>
			</div>
		</>
	);
}
