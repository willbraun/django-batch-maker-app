
import Form from 'react-bootstrap/Form';
import './../styles/recipeinput.css'

const RecipeInput = ({ parentState, setParentState }) => {
    const { image, title, by, publicRecipe } = parentState;
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
        <Form>
            <Form.Group className="mb-3" controlId="image">
                <Form.Label htmlFor="image" className="upload-recipe-image">
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
                    value={publicRecipe}
                    required
                    onChange={togglePublic}
                />
            </Form.Group>
        </Form>
    )
}

export default RecipeInput;