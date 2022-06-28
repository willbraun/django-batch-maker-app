import { useState } from 'react';
import ReactRouter from './components/ReactRouter';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  	const [state, setState] = useState({
		auth: false,
	})

	// useEffect to download all unit data once, only when the app loads. that is how we get the FK so we can set units on other things
	
	return (
		<ReactRouter appState={state} setAppState={setState}/>
  	);
}

export default App;
