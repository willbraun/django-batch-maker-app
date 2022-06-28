import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Login from './Login';
import CreateAccount from './CreateAccount';
import Home from './Home';
import RecipeList from './RecipeList';

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
                    <Route path='my-recipes' element={<RecipeList key={0} pageTitle={'My Recipes'} url={`/api_v1/recipes/`} />}/>
                    <Route path='public-recipes' element={<RecipeList key={1} pageTitle={'Public Recipes'} url={`/api_v1/recipes/public/`} />}/>
                    <Route path='popular-recipes' element={<RecipeList key={2} pageTitle={'Popular Recipes'} url={`/api_v1/recipes/popular/`} />}/>
                    
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default ReactRouter;