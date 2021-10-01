import { useHistory } from 'react-router-dom';

import RegisterForm from '../../components/RegisterForm'
function RegisterPage () {
    const history = useHistory();
    function addUser (userData) {
        const options = {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        };

        fetch(`${process.env.REACT_APP_BASE_URL}/users/register`, options)
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