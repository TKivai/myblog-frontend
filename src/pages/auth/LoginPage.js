import { useHistory } from 'react-router-dom';
import {useContext} from 'react';
import UserContext from '../../store/UserContext';

import LoginForm from '../../components/LoginForm';


function LoginPage () {
    const history = useHistory();
    const usercontext = useContext(UserContext);
    function loginUser (loginData) {
        const options = {
            method: 'POST',
            withCredentials: true,
            credentials: 'include',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData)
        };

        // console.log(userData);

        // fetch('http://localhost:4000/users/login', options)
        fetch('https://appblog-nodejs.herokuapp.com/users/login', options)
            .then(response => {
                if (!response.ok) {
                    throw Error(response.status);
                }
                console.log("Response");
                return response.json();
            })
            .then(update => {
                usercontext.setIsLoggedIn(true);
                usercontext.setUser(update.user.name);
                usercontext.setEmail(update.user.email);
                document.cookie = 'token='+ update.token +'; Path=/; Secure';
                localStorage.setItem("username", update.user.name);
                localStorage.setItem("useremail", update.user.email);
                localStorage.setItem("userisloggedin", true);
                history.replace('/');
            })
            .catch(e => {
                console.log("Response");
                console.log(e);
            });
    }
    return (
        <div className="" style={{width: "70%"}}>
            <LoginForm loginUser={loginUser}/>
        </div>
    );
}

export default LoginPage;