
import Form from 'react-bootstrap/Form';
import './../styles/recipeinput.css'

const RecipeInput = ({ parentState, setParentState }) => {
    const { image, title, by, publicRecipe, prepTime, cookTime, cookTemp, tempUnit, yieldQuantity, yieldName, steps, notes, } = parentState;
    
    const handleInput = (e) => {
        const {name, value} = e.target;
        setParentState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    const togglePublic = () => {
        setParentState({...parentState, publicRecipe: !publicRecipe})
    }
    
    return (
        <Form className="add-recipe-form">
            <Form.Group className="mb-3" controlId="image">
                <Form.Label className="upload-recipe-image">
                    <Form.Control type="file" />
                    {image ? <img src={image} alt={title}/> : undefined}
                </Form.Label>
            </Form.Group>
            <Form.Group controlId="title">
                <Form.Control 
                    name="title"
                    type="text"
                    value={title}
                    placeholder="Recipe Name"
                    required
                    onChange={handleInput}
                />
            </Form.Group>
            <Form.Group controlId="by">
                <Form.Control 
                    name="by"
                    type="text"
                    value={by}
                    placeholder="By"
                    required
                    onChange={handleInput}
                />
            </Form.Group>
            <Form.Group controlId="public">
                <Form.Check 
                    name="public"
                    type="checkbox"
                    checked={publicRecipe}
                    onChange={togglePublic}
                    />
                <Form.Label>Make it Public</Form.Label>
            </Form.Group>
            <Form.Group controlId="private">
                <Form.Check 
                    name="private"
                    type="checkbox"
                    checked={!publicRecipe}
                    onChange={togglePublic}
                    />
                <Form.Label>Keep it Private</Form.Label>
            </Form.Group>
            <Form.Group controlId="recipeType">
                <Form.Select required>
                    <option>Recipe Type</option>
                    <option value="BR">Breakfast</option>
                    <option value="LU">Lunch</option>
                    <option value="DI">Dinner</option>
                    <option value="DE">Dessert</option>
                </Form.Select>
            </Form.Group>
            <Form.Group controlId="prepTime">
                <Form.Control 
                    name="prepTime"
                    type="number"
                    min="0"
                    value={prepTime}
                    placeholder="Prep Time (min)"
                    required
                    onChange={handleInput}
                />
            </Form.Group>
            <Form.Group controlId="cookTime">
                <Form.Control 
                    name="cookTime"
                    type="number"
                    min="0"
                    value={cookTime}
                    placeholder="Cook Time (min)"
                    required
                    onChange={handleInput}
                />
            </Form.Group>
            <Form.Group controlId="cookTemp">
                <Form.Control 
                    name="cookTemp"
                    type="number"
                    value={cookTemp}
                    placeholder="Cook Temp"
                    required
                    onChange={handleInput}
                />
            </Form.Group>
            <Form.Group controlId="tempUnit">
                <Form.Select>
                    <option value="FA">ºF</option>
                    <option value="CE">ºC</option>
                </Form.Select>
            </Form.Group>
        </Form>
    )
}

export default RecipeInput;