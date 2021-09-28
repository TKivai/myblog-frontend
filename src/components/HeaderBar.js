import { Link } from "react-router-dom";
import {useContext} from 'react';
import UserContext from '../store/UserContext';
import NavBarUserInfo from "./NavBarUserInfo";

function HeaderBar () {
    const usercontext = useContext(UserContext);
    const isLoggedIn = usercontext.isLoggedIn;
    let username;

    if (usercontext.name == null) username = "";
    else username = usercontext.name.split(' ')[0];

    function NavLinkControl (props) {
        if (props.isLoggedIn){
            return (
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link to="/posts" className="nav-link active" aria-current="page">View Posts</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/posts/create" className="nav-link active" aria-current="page">Create A Post</Link>
                    </li>
                </ul>
                
            );
        }
        return null;
    }

    function AuthLinkControl (props) {
        if (props.isLoggedIn){
            return (
                <div style={{display: "contents"}}>
                    <NavBarUserInfo user={props.username}/>
                    <form action="/users/logout" method="post">
                        <button className="btn btn-danger" type="submit">Logout</button>
                    </form>
                </div>
            );
        }
        return (
            <div style={{display: "contents"}}>
                <Link to="/users/login" className="nav-link active" aria-current="page" style={{color: "white"}}>Login</Link>
                <Link to="/users/register" className="nav-link active" aria-current="page" style={{color: "white"}}>Register</Link>
            </div>
        );
    }
    
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary" style={{width: "100%"}}>
            <div className="container-fluid">      
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <Link to="/" className="nav-link active" aria-current="page" style={{color: "white"}}>HOME</Link>

                    <NavLinkControl isLoggedIn={isLoggedIn}/>

                    <AuthLinkControl isLoggedIn={isLoggedIn} username={username}/>
                    
                </div>
            </div>
        </nav>
    );
}

export default HeaderBar;