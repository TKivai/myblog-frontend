import {createContext, useState} from 'react';

import WelcomePage from '../pages/WelcomePage'
import HeaderBar from '../components/HeaderBar';
import LoginPage from '../pages/auth/LoginPage';

const UserContext = createContext({
    name: "",
    email: "",
    setUser:(userName) => {},
    setEmail:(userEmail) => {}
});

export function UserContextProvider (props) {
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");

    function setUserNameHandler (user_name) {
        setUserName(user_name);
    }
    function setUserEmailHandler (user_email) {
        setUserEmail(user_email);
    }

    const context = {
        name: userName,
        email: userEmail,
        setUser: setUserNameHandler,
        setEmail: setUserEmailHandler
    }

    return (
        <UserContext.Provider value={context}>
            {props.children}
        </UserContext.Provider>
    );
}

export default UserContext;