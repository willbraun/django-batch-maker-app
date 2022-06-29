import { useState } from 'react';
import { units } from './../data';

const StepIngredient = ({stepInputState, setStepInputState, start, amount, unit, name}) => {    
    const [isEditing, setIsEditing] = useState(start);
    const [state, setState] = useState({
        id: stepInputState.uid,
        amount: amount ? amount : '',
        unit: unit ? unit : '',
        name: name ? name : '',
    });
    
    const handleInput = (e) => {
        const {name, value} = e.target;
        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const addIngredient = () => {
        const keys = Object.keys(state);
        const values = Object.values(state);
        if (!values.includes('')) {
            const newList = stepInputState.ingredients;
            newList.push(state);
            setStepInputState({...stepInputState, ingredients: newList, uid: stepInputState.uid + 1});
            setIsEditing(false);
        }
        else {
            const missingKeys = keys
                .filter(key => state[key] === '')
                .map(key => key.toString())
                .join(', ')
            alert(`Ingredient is missing: ${missingKeys}`)
        }
    }

    const deleteIngredient = () => {
        const newList = stepInputState.ingredients;
        const index = newList.findIndex(ingredient => ingredient.id === state.id)
        newList.splice(index, 1);
        setStepInputState({...stepInputState, ingredients: newList});
    }

    const unitList = units.filter(unit => unit.measureIngredient).map(unit => <option key={unit.id} value={unit.id}>{unit.name}s</option>);
    
    return (
        <article>
            <div>
                <label htmlFor="amount"></label>
                <input 
                    name="amount"
                    id="amount"
                    value={state.amount}
                    type="number" 
                    min="0"
                    placeholder="Amount"
                    required
                    onChange={handleInput} />
            </div>
            <div>
                <label htmlFor="unit"></label>
                <select 
                    name="unit" 
                    id="unit"
                    value={state.unit}  
                    onChange={handleInput}> 
                        <option value="">Unit</option>
                        {unitList}
                </select>
            </div>
            <div>
                <label htmlFor="name"></label>
                <input 
                    name="name"
                    id="name"
                    value={state.name}
                    type="text" 
                    placeholder="Ingredient"
                    required
                    onChange={handleInput} />
            </div>
            {isEditing ? 
                <button type="button" onClick={() => addIngredient()}>+</button> :
                <button type="button" onClick={() => deleteIngredient()}>-</button> 
                // if minus is clicked, DELETE ingredient component
            }
        </article>
    )
}

export default StepIngredient;