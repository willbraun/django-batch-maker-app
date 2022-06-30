import { useState } from 'react';
import Cookies from 'js-cookie';
import RecipeForm from './RecipeForm';
import { handleError } from './../helpers';

const AddRecipe = () => {
    const blank = {
        image: null,
        title: '',
        by: '',
        publicRecipe: false,
        recipeType: '',
        prepTime: '',
        cookTime: '',
        cookTemp: '',
        tempUnit: 'FA',
        yieldQuantity: '',
        yieldName: '',
        steps: [{
            id: 0,
            number: 1,
            ingredients: [],
            directions: '',
        }],
        notes: ''
    }
    
    const [state, setState] = useState(blank);
    const [stepUid, setStepUid] = useState(0);

    const addRecipe = async () => {
        setState({...state, steps: JSON.stringify(state.steps)});

        const formData = new FormData();
        Object.entries(state).forEach(entry => formData.append(entry[0], entry[1]))
        
        const options = {
            headers: {
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
            body: formData,
        }

        const response = await fetch('/api_v1/recipes/add/', options).catch(handleError);

        if (!response.ok) {
            throw new Error('Network request not ok!');
        }
    }
    
    return (
        <main>
            <RecipeForm 
                addEditRecipeState={state} 
                setAddEditRecipeState={setState}
                stepUid={stepUid}
                setStepUid={setStepUid}
                parentSubmit={addRecipe}/>
        </main>
    )
}

export default AddRecipe;