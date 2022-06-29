import { useState } from 'react';
import { units } from './../data';

const StepIngredient = ({stepInputState, setStepInputState}) => {
    const [isEditing, setIsEditing] = useState(true);
    const [state, setState] = useState({
        amount: '',
        unit: '',
        name: '',
    });
    
    const handleInput = (e) => {
        const {name, value} = e.target;
        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const unitList = units.filter(unit => unit.measureIngredient).map(unit => <option value={unit.id}>{unit.name}s</option>);
    
    return (
        <article>
            <div>
                <label htmlFor="ingredient-amount"></label>
                <input 
                    name="ingredient-amount"
                    id="ingredient-amount"
                    value={state.amount}
                    type="number" 
                    min="0"
                    placeholder="Amount"
                    required
                    onChange={handleInput} />
            </div>
            <div>
                <label htmlFor="ingredient-unit"></label>
                <select 
                    name="ingredient-unit" 
                    id="ingredient-unit"
                    value={state.unit}  
                    onChange={handleInput}> 
                        <option value="">Unit</option>
                        {unitList}
                </select>
            </div>
            <div>
                <label htmlFor="ingredient-name"></label>
                <input 
                    name="ingredient-name"
                    id="ingredient-name"
                    value={state.name}
                    type="text" 
                    placeholder="Ingredient"
                    required
                    onChange={handleInput} />
            </div>
            {isEditing ? 
                <button type="button">+</button> :
                <button type="button">-</button>
            }
        </article>
    )
}

export default StepIngredient;