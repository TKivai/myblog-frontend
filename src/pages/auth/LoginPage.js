import LoginForm from '../../components/LoginForm';
import { useHistory } from 'react-router-dom';

function LoginPage () {
    const history = useHistory();
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

        fetch('http://localhost:4000/users/login', options)
            .then(response => {
                if (!response.ok) {
                    throw Error(response.status);
                }
                console.log("Response");
                return response.json();
            })
            .then(update => {
                console.log(update.token);
                // document.cookie = `token=${update.token};SameSite=Lax`
                // console.log(document.cookie);
                history.push('/posts');
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