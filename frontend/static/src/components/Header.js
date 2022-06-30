import { useNavigate, Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Cookies from 'js-cookie';
import { handleError } from '../helpers';
import './../styles/display.css'
import plus from './../images/plus-solid.svg';
import gear from './../images/gear-solid.svg';
import user from './../images/user-large-solid.svg';


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
        <Navbar className="header justify-content-between align-items-center px-5">
            <Nav.Item>
                <p className="top-left">The kitchen is yours, chef!</p>
            </Nav.Item>
            <Nav.Item>
                <Link className="header-brand" to={'/'}><h1 className="title">Batch Maker</h1></Link>
            </Nav.Item>
            <Nav>
                {/* add replace title values with imgs from font awesome */}
                <NavDropdown id="header-dropdown1" title={<img src={plus} alt="plus"/>}>
                    <NavDropdown.Item href="my-recipes/add">Add Recipe</NavDropdown.Item>
                    <NavDropdown.Item>Add Ingredient</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="#">
                    <img src={gear} alt="settings" />
                </Nav.Link>
                <NavDropdown id="header-dropdown2" title={<img src={user} alt="profile"/>}>
                    <NavDropdown.Item onClick={logOut}>Log out</NavDropdown.Item>
                </NavDropdown>
            </Nav>
        </Navbar>
        
    )
}

export default Header;