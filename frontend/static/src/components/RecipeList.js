import { useState, useEffect } from 'react';
import { handleError } from '../helpers';
import RecipePreview from './RecipePreview';
import './../styles/recipelist.css'

const RecipeList = ({pageTitle, url}) => {
    const [state, setState] = useState({
        recipes: [],
    })

    useEffect(() => {
        const getRecipeList = async () => {
            const response = await fetch(url).catch(handleError);
    
            if (!response.ok) {
                throw new Error('Network response was not ok!');
            }
    
            const data = await response.json();
            setState({...state, recipes: data});
        }

        getRecipeList();
    }, [])

    const recipeList = state.recipes.map(recipe => <RecipePreview key={recipe.id} {...recipe}/>)
    
    return (
        <main>
            <h2>{pageTitle}</h2>
            <section className="recipe-box">
                {recipeList}
            </section>
        </main>
    )
}

export default RecipeList;