import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import StepIngredient from './StepIngredient';

const Step = ({addEditRecipeState, setAddEditRecipeState, stepUid, setStepUid, isEditing, number, ingredients, directions}) => {
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
            stepState={state} 
            setStepState={setState} 
            isEditing={false}
        />)
    
    return (
        <section>
            <p>Step {state.number}</p>

            {ingredientList}
            <StepIngredient 
                key={ingredientList.length + 1} 
                stepState={state} 
                setStepState={setState} 
                isEditing={true}
                ingUid={ingUid}
                setIngUid={setIngUid} />

            <Form.Group controlId="directions">
                <Form.Control 
                    as="textarea" 
                    rows={3}
                    name="directions"
                    value={state.directions}
                    placeholder="What directions go with this step?"
                    onChange={handleInput} />
            </Form.Group>

            {isEditing ?
                <Button className="btn btn-secondary" type="button" onClick={() => addStep()}>Add another step</Button> :
                <Button className="btn" type="button" onClick={() => deleteStep()}>Delete step</Button>
            }
        </section>
    )
}

export default Step;