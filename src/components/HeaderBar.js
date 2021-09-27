import { Link } from "react-router-dom";
import {useContext} from 'react';
import UserContext from '../store/UserContext';

function HeaderBar () {
    const usercontext = useContext(UserContext);
    const username = usercontext.name.split(' ')[0];

    function CreatePostLink () {
        return (
            <li className="nav-item">
                <Link to="/posts/create" className="nav-link active" aria-current="page">Create A Post</Link>
            </li>
        );
    }
    
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary" style={{width: "100%"}}>
            <div className="container-fluid">      
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to="/" className="nav-link active" aria-current="page">HOME</Link>
                        </li>
                        
                        {username}
                    </ul>
                    <div>{username}</div>
                    <Link to="/users/login" className="nav-link active" aria-current="page" style={{color: "white"}}>Login</Link>
                    <Link to="/users/register" className="nav-link active" aria-current="page" style={{color: "white"}}>Register</Link>
                    <form action="/users/logout" method="post">
                        <button className="btn btn-danger" type="submit">Logout</button>
                    </form>
                </div>
            </div>
        </nav>
    );
}

export default HeaderBar;