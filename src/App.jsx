import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppContext from './contexts/AppContext';
import Hero from './components/hero/Hero';

function App() {
	return (
		<>
			<AppContext>
				<Router>
					<Routes>
						<Route path='/' element={<Hero />} />
					</Routes>
				</Router>
			</AppContext>
		</>
	);
}

export default App;
