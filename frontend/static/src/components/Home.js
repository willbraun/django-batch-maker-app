import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { handleError } from '../helpers';
import RecipePreview from './RecipePreview';
import './../styles/home.css'

const Home = () => {
    const [state, setState] = useState({
        myRecipes: [],
        public: [],
        popular: [],
        favorites: [],
        ingredients: [],
    })

    
    useEffect(() => {
        const getHomeList = async () => {
            const response = await fetch('/api_v1/home/').catch(handleError);
    
            if (!response.ok) {
                throw new Error('Network response was not ok!');
            }
    
            const data = await response.json();
            setState({...state, 
                myRecipes: data["my_recipes"],
                public: data.public,
                popular: data.popular,
                favorites: data.favorites,
                // ingredients eventually
            });
        }

        getHomeList();
    }, [])

    const myRecipesHomeList = state.myRecipes.map(recipe => <RecipePreview key={recipe.id} {...recipe}/>)
    const publicHomeList = state.public.map(recipe => <RecipePreview key={recipe.id} {...recipe}/>)
    const popularHomeList = state.popular.map(recipe => <RecipePreview key={recipe.id} {...recipe}/>)
    const favoritesHomeList = state.favorites.map(recipe => <RecipePreview key={recipe.id} {...recipe}/>)

    return (
        <main className="main-home">
            <section>
                <h3>My Recipes</h3>
                <div className="home-row">
                    <Link to={'my-recipes/add/'} className="add-recipe-box">
                        Add Recipe
                    </Link>
                    {myRecipesHomeList}
                </div>
            </section>
            <section>
                <h3>Public Recipes</h3>
                <div className="home-row">
                    {publicHomeList}
                </div>
            </section>
            <section>
                <h3>Popular Recipes</h3>
                <div className="home-row">
                    {popularHomeList}
                </div>
            </section>
            <section>
                <h3>My Favorite Recipes</h3>
                <div className="home-row">
                    {favoritesHomeList}
                </div>
            </section>
            <section>
                <h3>My Pantry</h3>
                <div className="home-row">
                    <div>Ingredients</div>
                </div>
            </section>
        </main>
    )
}

export default Home;