import { Link } from "react-router"
import logo from "../assets/logo.png"


const Nav = (props) => {

    const handleSignOut = () => {
        localStorage.removeItem('token')
        props.setUser(null)
    }

    return (
        <nav>
            <Link className="nav-brand" to="/"><img src={logo} alt="Collab" /> Collab</Link>
            { props.user ? (
                <ul>
                    <li>
                        <Link to="/">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/workspaces/:workspaceId/meetings">Meetings</Link>
                    </li>
                    <li>
                        <Link to="/workspaces">My workspaces</Link>
                    </li>
                    <li>
                        <Link to="/" onClick={handleSignOut}>Sign Out</Link>
                    </li>
                </ul>
            ) : (
            <ul>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to='/sign-up'>Sign Up</Link>
                </li>
                <li>
                    <Link to='/sign-in'>Sign In</Link>
                </li>
            </ul>
            ) }

        </nav>
    )
}

export default Nav