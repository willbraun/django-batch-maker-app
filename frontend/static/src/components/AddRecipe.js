import { useState } from 'react';
import RecipeInput from './RecipeInput';

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
    
    return (
        <main>
            <RecipeInput addEditRecipeState={state} setAddEditRecipeState={setState}/>
        </main>
    )
}

export default AddRecipe;