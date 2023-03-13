import { getIconUrl } from '../../services/iconRequest';
import './days.css';

export default function Days({ data }) {
	const DAY_FROMATTER = new Intl.DateTimeFormat(undefined, { weekday: 'long' });
	return (
		<>
			<div style={{ width: '20px', height: '20px' }}>
				<img
					src={getIconUrl(data?.iconCode)}
					alt='icon'
					style={{ width: '100%', height: '100%' }}
				/>
			</div>
			<p>{data?.maxTemp}</p>
			<p>{DAY_FROMATTER?.format(data?.timestamp)}</p>
		</>
	);
}
