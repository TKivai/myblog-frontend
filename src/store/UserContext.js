import {createContext, useState} from 'react';
// import {useCookies} from 'react-cookie';


const UserContext = createContext({
    isLoggedIn: false,
    name: null,
    email: null,
    jwt: null,
    setUser:(userName) => {},
    setEmail:(userEmail) => {},
    setIsLoggedIn: (logged_in) => {},
    setJwt: (token) => {}
});

export function UserContextProvider (props) {
    // const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("userisloggedin") || false);
    const [userName, setUserName] = useState(localStorage.getItem("username") || "");
    const [userEmail, setUserEmail] = useState(localStorage.getItem("useremail") || "");
    const [jwt, setJwt] = useState(localStorage.getItem("token") || "");

    function setUserNameHandler (user_name) {
        setUserName(user_name);
    }
    function setUserEmailHandler (user_email) {
        setUserEmail(user_email);
    }

    function setisLoggedInHandler (logged_in) {
        setIsLoggedIn(logged_in);
    }

    function setJwtHandler (token) {
        setJwt(token);
    }

    const context = {
        isLoggedIn: isLoggedIn,
        name: userName,
        email: userEmail,
        jwt: jwt,
        setUser: setUserNameHandler,
        setEmail: setUserEmailHandler,
        setIsLoggedIn: setisLoggedInHandler,
        setJwt: setJwtHandler
    }

    return (
        <UserContext.Provider value={context}>
            {props.children}
        </UserContext.Provider>
    );
}

export default UserContext;