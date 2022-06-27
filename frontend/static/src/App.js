import { useState } from 'react';
import ReactRouter from './components/ReactRouter';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  	const [state, setState] = useState({
		auth: false,
	})
	
	return (
		<ReactRouter appState={state} setAppState={setState}/>
  	);
}

export default App;
