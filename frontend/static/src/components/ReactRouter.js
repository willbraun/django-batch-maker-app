import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './Header';
import Login from './Login';
import CreateAccount from './CreateAccount';
import Home from './Home';

const ReactRouter = ({appState, setAppState}) => {
    return (
        <BrowserRouter>
            {appState.auth && <Header appState={appState} setAppState={setAppState}/>}
            <Routes>
                <Route path='/login' element={<Login appState={appState} setAppState={setAppState}/>}/>
                <Route path='/create-account' element={<CreateAccount />}/>
                <Route path='/' element={appState.auth ? <Home /> : <Navigate to='/login' />}>
                    <Route  />
                    
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default ReactRouter;