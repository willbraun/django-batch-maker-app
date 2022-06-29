import { useState } from 'react';
import StepIngredient from './StepIngredient';

const Step = ({addEditRecipeState, setAddEditRecipeState, stepUid, setStepUid, start, number, ingredients, directions}) => {
    const isEditing = start
    const [ingUid, setIngUid] = useState(0);
    const [state, setState] = useState({
        id: stepUid,
        number: number ? number : addEditRecipeState.steps.length + 1,
        ingredients: ingredients ? ingredients : [],
        directions: directions ? directions : '',
    })

    const handleInput = (e) => {
        const {name, value} = e.target;
        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    const addStep = () => {
        if (state.directions.length > 0) {
            const newList = addEditRecipeState.steps;
            newList.push(state)
            setAddEditRecipeState({...addEditRecipeState, steps: newList});
            setStepUid(stepUid + 1);
        }
        else {
            alert('Step is missing directions')
        }
    }

    const deleteStep = () => {
        const newList = addEditRecipeState.steps;
        const index = newList.findIndex(step => step.id === state.id);
        newList.splice(index, 1);
        setAddEditRecipeState({...addEditRecipeState, steps: newList});
    }



    const ingredientList = state.ingredients.map((ingredient, i) => 
        <StepIngredient 
            key={i} 
            {...ingredient} 
            StepState={state} 
            setStepState={setState} 
            start={false}
        />)
    
    return (
        <section>
            <p>Step {state.number}</p>
            {ingredientList}
            <StepIngredient 
                key={ingredientList.length + 1} 
                stepState={state} 
                setStepState={setState} 
                start={true}
                ingUid={ingUid}
                setIngUid={setIngUid} />

            <div>
                <label htmlFor="directions"></label>
                <textarea 
                    name="directions"
                    id="directions"
                    value={state.directions}
                    type="text" 
                    placeholder="What directions go with this step?"
                    required
                    onChange={handleInput} />
            </div>
            {isEditing ?
                <button type="button" onClick={() => addStep()}>Add another step</button> :
                <button type="button" onClick={() => deleteStep()}>Delete step</button>
            }
        </section>
    )
}

export default Step;