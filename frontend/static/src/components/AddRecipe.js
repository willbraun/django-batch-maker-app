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
        tempUnit: '',
        yieldQuantity: '',
        yieldName: '',
        steps: {},
        notes: ''
    }
    
    const [state, setState] = useState(blank);
    
    return (
        <main>
            <div>Temporary - add form</div>
            <RecipeInput parentState={state} setParentState={setState}/>
        </main>
    )
}

export default AddRecipe;