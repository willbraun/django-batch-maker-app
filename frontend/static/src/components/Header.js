import { useNavigate } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Cookies from 'js-cookie';
import { handleError } from '../helpers';

const Header = ({appState, setAppState}) => {
    const navigate = useNavigate();

    const logOut = async () => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
        }

        const response = await fetch("/dj-rest-auth/logout/", options).catch(handleError);

        if (!response.ok) {
            throw new Error('Network response not ok!');
        }

        Cookies.remove("Authorization");
        setAppState({...appState, auth: false});
        navigate('/');
    }
    
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">Batch Maker</Navbar.Brand>
                <Nav className="me-auto">
                    {/* add replace title values with imgs from font awesome */}
                    <NavDropdown title="Plus">
                        <NavDropdown.Item>Add Recipe</NavDropdown.Item>
                        <NavDropdown.Item>Add Ingredient</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="#">Settings Gear</Nav.Link>
                    <NavDropdown title="Profile">
                        <NavDropdown.Item onClick={logOut}>Log out</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Container>
        </Navbar>
        
    )
}

export default Header;