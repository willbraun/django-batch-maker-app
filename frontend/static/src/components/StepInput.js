import { useState } from 'react';
import StepIngredient from './StepIngredient';

const StepInput = ({addEditRecipeState, setAddEditRecipeState}) => {
    const [state, setState] = useState({
        number: addEditRecipeState.steps.length + 1,
        ingredients: [],
        directions: '',
    })

    const handleInput = (e) => {
        const {name, value} = e.target;
        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    const ingredientList = state.ingredients.map((ingredient, i) => <StepIngredient key={i} {...ingredient} stepInputState={state} setStepInputState={setState} start={false}/>)
    
    return (
        <section>
            <p>Step {state.number}</p>
            {ingredientList}
            <StepIngredient key={ingredientList.length + 1} stepInputState={state} setStepInputState={setState} start={true} />
            {/* Add another step once the above step has been added */}

            <div>
                <label htmlFor="step-description"></label>
                <textarea 
                    name="step-description"
                    id="step-description"
                    value={state.description}
                    type="text" 
                    placeholder="What directions go with this step?"
                    required
                    onChange={handleInput} />
            </div>
            <button type="button">Add another step</button>
        </section>
    )
}

export default StepInput;