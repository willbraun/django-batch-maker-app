import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { units } from './../data';

const StepIngredient = ({stepState, setStepState, isEditing, ingUid, setIngUid, amount, unit, name}) => {
    const [state, setState] = useState({
        id: ingUid,
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
            const newList = stepState.ingredients;
            newList.push(state);
            setStepState({...stepState, ingredients: newList});
            setIngUid(ingUid + 1)
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
        const newList = stepState.ingredients;
        const index = newList.findIndex(ingredient => ingredient.id === state.id)
        newList.splice(index, 1);
        setStepState({...stepState, ingredients: newList});
    }

    const unitList = units.filter(unit => unit.measureIngredient).map(unit => <option key={unit.id} value={unit.id}>{unit.name}s</option>);
    
    return (
        <Row className="mb-3 gx-3 ingredient">
            <Col xs={2}>
                <Form.Group>
                    <Form.Control 
                        name="amount"
                        id="amount"
                        value={state.amount}
                        type="number" 
                        min="0"
                        placeholder="Amount"
                        required
                        onChange={handleInput} />
                </Form.Group>
            </Col>
            <Col xs={4}>
                <Form.Group>
                    <Form.Select 
                        name="unit" 
                        id="unit"
                        value={state.unit}  
                        onChange={handleInput}> 
                            <option value="">Unit</option>
                            {unitList}
                    </Form.Select>
                </Form.Group>
            </Col>
            <Col xs={5}>
                <Form.Group>
                    <Form.Control 
                        name="name"
                        id="name"
                        value={state.name}
                        type="text" 
                        placeholder="Ingredient"
                        required
                        onChange={handleInput} />
                </Form.Group>
            </Col>
            <Col xs={1}>
                {isEditing ? 
                    <Button variant="outline-secondary" type="button" onClick={() => addIngredient()}>+</Button> :
                    <Button variant="outline-secondary" type="button" onClick={() => deleteIngredient()}>-</Button> 
                }
            </Col>
        </Row>
    )
}

export default StepIngredient;