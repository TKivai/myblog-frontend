import {useRef} from 'react'

function LoginForm (props) {
    const emailRef = useRef();
    const passwordRef = useRef();

    function submitLoginDetails (event){
        event.preventDefault();

        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        const loginData = {
            email,
            password
        }

        props.loginUser(loginData);

        // console.log(userData);
    }
    return (
        <form onSubmit={submitLoginDetails}>

            <div className="form-group">
                <label htmlFor="email" className="form-label mt-4">Email address</label>
                <div className="input-group w-50">
                    <span className="input-group-text" id="basic-addon1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope" viewBox="0 0 16 16">
                            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z"/>
                        </svg>
                    </span>
                    <input type="email" name="email" className="form-control" id="email" ref={emailRef} placeholder="Email" aria-label="Input group example" aria-describedby="basic-addon1"/>
                </div>
            </div>

            <div className="form-group w-50">
                <label htmlFor="password" className="form-label mt-4">Password</label>
                <input type="password" name="password" className="form-control" id="password" ref={passwordRef} placeholder="Password"/>
            </div>

            <button className="btn btn-primary mt-4">Register</button>
        </form>
    );
}

export default LoginForm;