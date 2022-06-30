import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import StepIngredient from './StepIngredient';

const Step = ({currentStep, setCurrentStep, addEditRecipeState, setAddEditRecipeState, stepUid, setStepUid, isEditing, number, ingredients, directions}) => {
    const [ingUid, setIngUid] = useState(0);
    const [state, setState] = useState({
        id: stepUid,
        number: number ? number : addEditRecipeState.steps.length,
        ingredients: ingredients ? ingredients : [],
        directions: directions ? directions : '',
    })

    const blankStep = {
        id: stepUid,
        number: addEditRecipeState.steps.length + 1,
        ingredients: [],
        directions: '',
    }

    const handleInputEditStep = (e) => {
        const {name, value} = e.target;
        const newList = addEditRecipeState.steps;
        const index = newList.findIndex(step => step.id === state.id);
        if (index === -1) {
            newList.push(state)
            setAddEditRecipeState({...addEditRecipeState, steps: newList});
            setStepUid(stepUid + 1);
        }
        else {
            newList[index][name] = value;
            setAddEditRecipeState({...addEditRecipeState, steps: newList});
        }
        
    }

    // const handleInput = (e) => {
    //     const {name, value} = e.target;
    //     setState((prevState) => ({
    //         ...prevState,
    //         [name]: value,
    //     }));
    //     editStep();
    // }

    const addIngToStep = (ingredient) => {
        const newList = addEditRecipeState.steps;
        const index = newList.findIndex(step => step.id === state.id);
        newList[index].ingredients.push(ingredient);
        setAddEditRecipeState({...addEditRecipeState, steps: newList}); 
    }

    const deleteIngFromStep = (ingredient) => {
        const newList = addEditRecipeState.steps;
        const index = newList.findIndex(step => step.id === state.id);
        const step = newList[index];
        const ingIndex = step.ingredients.findIndex(ing => ing.id === ingredient.id)
        console.log(ingIndex);
        step.ingredients.splice(ingIndex, 1);
        setAddEditRecipeState({...addEditRecipeState, steps: newList});
    }

    const addStep = () => {
        const newList = addEditRecipeState.steps;
        newList.push(blankStep)
        setAddEditRecipeState({...addEditRecipeState, steps: newList});
        setStepUid(stepUid + 1);
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
            addIngToStep={addIngToStep}
            deleteIngFromStep={deleteIngFromStep}
        />)
    
    const lastStep = addEditRecipeState.steps.filter(step => step.number === addEditRecipeState.steps.length)[0];

    return (
        <section className="step">
            <div className="text-row">
                <p>Step {state.number}</p>
                <div className="divider"></div>
            </div>

            {ingredientList}
            <StepIngredient 
                key={ingredientList.length + 1} 
                stepState={state} 
                setStepState={setState} 
                isEditing={true}
                ingUid={ingUid}
                setIngUid={setIngUid}
                addIngToStep={addIngToStep}
                deleteIngFromStep={deleteIngFromStep} />

            <Form.Group className="mb-3" controlId="directions">
                <Form.Control 
                    as="textarea" 
                    rows={3}
                    name="directions"
                    value={addEditRecipeState.directions}
                    placeholder="What directions go with this step?"
                    onChange={handleInputEditStep} />
            </Form.Group>
            <Col className="right-button">
                {lastStep.number === state.number ?
                    <Button className="btn btn-secondary" type="button" onClick={() => addStep()}>Add another step</Button> :
                    <Button className="btn btn-secondary" type="button" onClick={() => deleteStep()}>Delete step</Button>
                }
            </Col>
        </section>
    )
}

export default Step;