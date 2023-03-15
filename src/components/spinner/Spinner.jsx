import './spinner.css';

function Spinner() {
	return (
		<div className='lds-grid flex__center'>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	);
}

export default Spinner;
