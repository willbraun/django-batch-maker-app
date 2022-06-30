import { useState } from 'react';
import RecipeForm from './RecipeForm';

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
        steps: [],
        notes: ''
    }
    
    const [state, setState] = useState(blank);
    const [stepUid, setStepUid] = useState(state.steps.length);
    
    return (
        <main>
            <RecipeForm 
                addEditRecipeState={state} 
                setAddEditRecipeState={setState}
                stepUid={stepUid}
                setStepUid={setStepUid}/>
        </main>
    )
}

export default AddRecipe;