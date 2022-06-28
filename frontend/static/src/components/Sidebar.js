import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import './../styles/display.css';


const Sidebar = () => {
    return (
        <aside className="sidebar">
            <Nav
                activeKey="/home"
                onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
                className="flex-column"
            >
                <Nav.Item>
                    <Link to={'/my-recipes'}>My Recipes</Link>
                </Nav.Item>
                <Nav.Item>
                    <Link to={'/public-recipes'}>Public Recipes</Link>
                </Nav.Item>
                <Nav.Item>
                    <Link to={'/popular-recipes'}>Popular Recipes</Link>
                </Nav.Item>
                <Nav.Item>
                    <Link to={'/favorites'}>Favorites</Link>
                </Nav.Item>
            </Nav>
        </aside>
    )
}

export default Sidebar;