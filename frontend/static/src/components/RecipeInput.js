import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Step from './Step';
import './../styles/recipeinput.css';
import plus from './../images/plus-solid.svg'

const RecipeInput = ({ addEditRecipeState, setAddEditRecipeState, stepUid, setStepUid }) => {
    const { image, title, by, publicRecipe, recipeType, prepTime, cookTime, cookTemp, tempUnit, yieldQuantity, yieldName, steps, notes, } = addEditRecipeState;
    const [preview, setPreview] = useState(image);

    const handleInput = (e) => {
        const {name, value} = e.target;
        setAddEditRecipeState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    const handleImage = (e) => {
        const file = e.target.files[0];
        setAddEditRecipeState({...addEditRecipeState, image: file});

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
        }

        reader.readAsDataURL(file);
    }

    const togglePublic = () => {
        setAddEditRecipeState({...addEditRecipeState, publicRecipe: !publicRecipe})
    }

    const stepList = addEditRecipeState.steps.map((step, i) => 
        <Step 
            key={i}   
            {...step} 
            addEditRecipeState={addEditRecipeState} 
            setAddEditRecipeState={setAddEditRecipeState}
            isEditing={false}
        />)
    
    return (
        <Form className="add-recipe-form">
            <div className="text-row">
                <p>Basic Info</p>
                <div className="divider"></div>
            </div>
            <Row>
                <Col xs={3}>
                    <Form.Group className="mb-3" controlId="image">
                        <button 
                            type="button" 
                            className="recipe-image-button"
                            onClick={() => document.querySelector('.recipe-input-image').click()}>
                            <Form.Control 
                                type="file"
                                className="recipe-input-image"
                                onChange={handleImage} />
                            
                            {preview ? 
                                <img className="image-button-background" src={preview} alt={title}/> : 
                                <div className="no-image-background">
                                    <img className="plus" src={plus} alt="plus icon" />
                                    <p>Add Photo</p>
                                </div>}
                        </button>
                    </Form.Group>
                </Col>
                <Col xs={9}>
                    <Row>
                        <Form.Group className="mb-3" controlId="title">
                            <Form.Control 
                                name="title"
                                type="text"
                                value={title}
                                placeholder="Recipe Name"
                                required
                                onChange={handleInput}
                            />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group className="mb-3" controlId="by">
                            <Form.Control 
                                name="by"
                                type="text"
                                value={by}
                                placeholder="By"
                                required
                                onChange={handleInput}
                            />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Col className="checkbox">
                            <Form.Group className="mb-3" controlId="public">
                                <Form.Check 
                                    name="public"
                                    type="checkbox"
                                    checked={publicRecipe}
                                    onChange={togglePublic}
                                    />
                                <Form.Label>Make it Public</Form.Label>
                            </Form.Group>
                        </Col>
                        <Col className="checkbox">
                            <Form.Group className="mb-3" controlId="private">
                                <Form.Check 
                                    name="private"
                                    type="checkbox"
                                    checked={!publicRecipe}
                                    onChange={togglePublic}
                                    />
                                <Form.Label>Keep it Private</Form.Label>
                            </Form.Group>
                        </Col>
                    </Row>
                
                </Col>
            </Row>
            <Row className="time-temp-row gx-2" >
                <Col xs={4}>
                    <Form.Group className="mb-3" controlId="recipeType">
                        <Form.Select 
                            name="recipeType"
                            required 
                            value={recipeType}
                            onChange={handleInput}>
                                <option>Recipe Type</option>
                                <option value="BR">Breakfast</option>
                                <option value="LU">Lunch</option>
                                <option value="DI">Dinner</option>
                                <option value="DE">Dessert</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col xs={2}>
                    <Form.Group className="mb-3" controlId="prepTime">
                        <Form.Control 
                            name="prepTime"
                            type="number"
                            min="0"
                            value={prepTime}
                            placeholder="Prep Time"
                            required
                            onChange={handleInput}
                        />
                    </Form.Group>
                </Col>
                <Col xs={2}>
                    <Form.Group className="mb-3" controlId="cookTime">
                        <Form.Control 
                            name="cookTime"
                            type="number"
                            min="0"
                            value={cookTime}
                            placeholder="Cook Time"
                            required
                            onChange={handleInput}
                        />
                    </Form.Group>
                </Col>
                <Col xs={4}>
                    <InputGroup className="mb-3">
                        <Form.Control 
                            className="w-50"
                            name="cookTemp"
                            type="number"
                            value={cookTemp}
                            placeholder="Cook Temp"
                            required
                            onChange={handleInput}
                            />
                        <Form.Select
                            name="tempUnit"
                            required 
                            value={tempUnit}
                            onChange={handleInput}>
                                <option value="FA">ºF</option>
                                <option value="CE">ºC</option>
                        </Form.Select>
                    </InputGroup>
                </Col>
            </Row>

            <Row className="gx-3">
                <Col xs={3}>
                    <Form.Text>This recipe will make</Form.Text>
                </Col>                
                <Col xs={2}>
                    <Form.Group controlId="yieldQuantity">
                        <Form.Control 
                            name="yieldQuantity"
                            type="number"
                            min="0"
                            value={yieldQuantity}
                            placeholder="Amount"
                            required
                            onChange={handleInput}
                        />
                    </Form.Group>
                </Col>
                <Col xs={7}>
                    <Form.Group controlId="yieldName">
                        <Form.Control 
                            name="yieldName"
                            type="text"
                            value={yieldName}
                            placeholder="cookies, loaves, etc"
                            required
                            onChange={handleInput}
                        />
                    </Form.Group>
                </Col>

            </Row>
            
            {stepList}
            <Step  
                key={steps.length + 1}
                addEditRecipeState={addEditRecipeState} 
                setAddEditRecipeState={setAddEditRecipeState} 
                stepUid={stepUid}
                setStepUid={setStepUid} 
                isEditing={true}
            />

            <div className="text-row">
                <p>Personal Notes</p>
                <div className="divider"></div>
            </div>
            <Form.Group className="mb-3">
                <Form.Control 
                    as="textarea"
                    rows={3}
                    value={notes}
                    onChange={handleInput}/>
            </Form.Group>
            <Col className="right-button">
                <Button variant="success"  type="submit">Save this Recipe!</Button>
            </Col>
        </Form>
    )
}

export default RecipeInput;