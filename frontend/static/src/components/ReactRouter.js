import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Login from './Login';
import CreateAccount from './CreateAccount';
import Home from './Home';
import MyRecipes from './MyRecipes';
import Public from './Public';
import Popular from './Popular';

const ReactRouter = ({appState, setAppState}) => {
    return (
        <BrowserRouter>
            {appState.auth && 
                <>
                <Header appState={appState} setAppState={setAppState}/>
                <Sidebar />
                </>
            }
            <Routes>
                <Route path='/login' element={<Login appState={appState} setAppState={setAppState}/>}/>
                <Route path='/create-account' element={<CreateAccount appState={appState} setAppState={setAppState}/>}/>
                <Route path='/' element={appState.auth ? undefined : <Navigate to='/login' />}>
                    <Route index element={<Home />}/>
                    <Route path='my-recipes' element={<MyRecipes />}/>
                    <Route path='public-recipes' element={<Public />}/>
                    <Route path='popular-recipes' element={<Popular />}/>
                    
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default ReactRouter;