import { useHistory } from 'react-router-dom';

import RegisterForm from '../../components/RegisterForm'
function RegisterPage () {
    const history = useHistory();
    function addUser (userData) {
        const options = {
            method: 'POST',
            withCredentials: true,
            credentials: 'include',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        };

        // console.log(userData);

        // fetch('http://localhost:4000/users/register', options)
        fetch('https://appblog-nodejs.herokuapp.com/users/register', options)
            .then(response => {
                if (!response.ok) {
                    throw Error(response.status);
                }
                console.log("Response");
                return response.json();
            })
            .then(update => {
                console.log(update);
                if (update.msg === "Success"){
                    history.push('/users/login');
                } 
            })
            .catch(e => {
                console.log("Response");
                console.log(e);
            });
    }
    return (
        <div className="" style={{width: "70%"}}>
            <RegisterForm addUser={addUser}/>
        </div>
    );
}

export default RegisterPage;