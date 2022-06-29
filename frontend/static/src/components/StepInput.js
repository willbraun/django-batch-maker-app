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
    
    return (
        <section>
            <p>Step {state.number}</p>
            
            <StepIngredient stepInputState={state} setStepInputState={setState} />
        </section>
    )
}

export default StepInput;