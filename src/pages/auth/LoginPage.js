import { useHistory } from 'react-router-dom';
import {useContext} from 'react';
import UserContext from '../../store/UserContext';

// import {useCookies} from 'react-cookie';

import LoginForm from '../../components/LoginForm';


function LoginPage () {
    const history = useHistory();
    const usercontext = useContext(UserContext);
    // const [cookies, setCookie] = useCookies(['token']);
    function loginUser (loginData) {
        const options = {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData)
        };

        // console.log(userData);

        fetch(`${process.env.REACT_APP_BASE_URL}/users/login`, options)
        // fetch('https://appblog-nodejs.herokuapp.com/users/login', options)
            .then(response => {
                if (!response.ok) {
                    throw Error(response.status);
                }
                return response.json();
            })
            .then(update => {
                usercontext.setIsLoggedIn(true);
                usercontext.setUser(update.user.name);
                usercontext.setEmail(update.user.email);
                usercontext.setJwt(update.token);
                // setCookie('token', update.token, {
                //     path: '/',
                //     sameSite: "lax",
                //     maxAge: 600
                // });
                localStorage.setItem("username", update.user.name);
                localStorage.setItem("useremail", update.user.email);
                localStorage.setItem("userisloggedin", true);
                localStorage.setItem("token", update.token);
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