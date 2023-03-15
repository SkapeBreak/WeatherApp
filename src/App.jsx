import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppContext from './contexts/AppContext';
import Home from './pages/Home';

function App() {
	return (
		<>
			<AppContext>
				<Router>
					<Routes>
						<Route path='/' element={<Home />} />
					</Routes>
				</Router>
			</AppContext>
		</>
	);
}

export default App;
