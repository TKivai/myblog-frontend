import {useContext} from 'react';
import UserContext from '../store/UserContext';

function WelcomePage () {
    const usercontext = useContext(UserContext);
    let username = usercontext.name.split(' ')[0];
    console.log(usercontext.name);
    console.log(usercontext.jwt);

    return (
        <div className="" style={{height: "100vh", width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
            <h1>Welcome <strong>{username}</strong>!</h1>
        </div>
    );
}

export default WelcomePage;