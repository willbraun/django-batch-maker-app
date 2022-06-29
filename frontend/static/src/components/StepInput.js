import { useState } from 'react';
import StepIngredient from './StepIngredient';

const StepInput = ({addEditRecipeState, setAddEditRecipeState, start}) => {
    const [isEditing, setIsEditing] = useState(start);
    const [uid, setUid] = useState(0);
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

    const addStep = () => {
        const newList = addEditRecipeState.steps;
        newList.push(state)
        setAddEditRecipeState({...addEditRecipeState, steps: newList});
    }

    const ingredientList = state.ingredients.map((ingredient, i) => <StepIngredient key={i} {...ingredient} stepInputState={state} setStepInputState={setState} start={false}/>)
    
    return (
        <section>
            <p>Step {state.number}</p>
            {ingredientList}
            <StepIngredient 
                key={ingredientList.length + 1} 
                stepInputState={state} 
                setStepInputState={setState} 
                start={true}
                uid={uid}
                setUid={setUid} />

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
            <button type="button" onClick={() => addStep()}>Add another step</button>
        </section>
    )
}

export default StepInput;