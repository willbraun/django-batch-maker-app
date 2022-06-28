import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Cookies from 'js-cookie';
import { handleError } from '../helpers';

const CreateAccount = ({appState, setAppState}) => {
    const [state, setState] = useState({
        username: '',
        email: '',
        password1: '',
        password2: '',
    })

    const navigate = useNavigate();

    const handleInput = (e) => {
        const {name, value} = e.target;
        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
            body: JSON.stringify(state),
        }

        const response = await fetch("/dj-rest-auth/registration/", options).catch(handleError);

        if (!response.ok) {
            throw new Error('Network response not ok!');
        }

        const data = await response.json();
        Cookies.set("Authorization", `Token ${data.key}`);
        navigate('/');
        setAppState({...appState, auth: true});
    }
    
    return (
        <main className="create-account">
            <h2>Create Account</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                        name="username" 
                        value={state.username}
                        type="text" 
                        placeholder="Enter username" 
                        required 
                        onChange={handleInput} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                        name="email" 
                        value={state.email}
                        type="email" 
                        placeholder="Enter email" 
                        required 
                        onChange={handleInput} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword1">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        name="password1" 
                        value={state.password1}
                        type="password" 
                        placeholder="Enter password" 
                        required 
                        onChange={handleInput} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword2">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control 
                        name="password2" 
                        value={state.password2}
                        type="password" 
                        placeholder="Enter password" 
                        required 
                        onChange={handleInput} />
                </Form.Group>
                <Button variant="primary" type="submit">Create Account</Button>
            </Form>
            <Link className="back-to-login" to={'/login'}>Back to login</Link>
        </main>
    )
}

export default CreateAccount;