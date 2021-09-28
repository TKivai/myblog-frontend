import {createContext, useState} from 'react';

const UserContext = createContext({
    isLoggedIn: false,
    name: null,
    email: null,
    setUser:(userName) => {},
    setEmail:(userEmail) => {},
    setIsLoggedIn: (logged_in) => {}
});

export function UserContextProvider (props) {
    const isTrueSet = (localStorage.getItem("userisloggedin") === 'true');
    const [isLoggedIn, setIsLoggedIn] = useState(isTrueSet);
    const [userName, setUserName] = useState(localStorage.getItem("username"));
    const [userEmail, setUserEmail] = useState(localStorage.getItem("useremail"));

    function setUserNameHandler (user_name) {
        setUserName(user_name);
    }
    function setUserEmailHandler (user_email) {
        setUserEmail(user_email);
    }

    function setisLoggedInHandler (logged_in) {
        setIsLoggedIn(logged_in);
    }

    const context = {
        isLoggedIn: isLoggedIn,
        name: userName,
        email: userEmail,
        setUser: setUserNameHandler,
        setEmail: setUserEmailHandler,
        setIsLoggedIn: setisLoggedInHandler
    }

    return (
        <UserContext.Provider value={context}>
            {props.children}
        </UserContext.Provider>
    );
}

export default UserContext;