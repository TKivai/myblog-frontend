import {useContext, useRef} from 'react';
import UserContext from '../store/UserContext';
import { useHistory } from 'react-router-dom';



function CreatePostPage () {
    const history = useHistory();
    const titleInputRef = useRef();
    const bodyInputRef = useRef();
    const usercontext = useContext(UserContext);

    function submitPostHandler (event) {
        event.preventDefault();
        const enteredPostTitle = titleInputRef.current.value;
        const enteredPostBody = bodyInputRef.current.value;

        const postData = {
            post_title: enteredPostTitle,
            post_body: enteredPostBody
        };
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${usercontext.jwt}`
            },
            body: JSON.stringify(postData),
        };
        fetch(`${process.env.REACT_APP_BASE_URL}/posts/create`, options)
            .then(response => {
                console.log(response.status);
                if (response.status === 403) {
                    usercontext.setJwt("");
                    usercontext.setIsLoggedIn(false);
                    localStorage.clear();
                    history.replace('/users/login')
                }
                response.json();
            })
            .then(update => {
                console.log(update);
            })
            .catch(e => {
                console.log(e);
            });
    }
    return (
        <div className="" style={{width: "70%"}}>
            <h1 className="mt-4">Create a Post</h1>

            <form style={{width: "70%"}} onSubmit={submitPostHandler}>
                <div className="form-group">
                    <label htmlFor="post_title" className="form-label col-form-label">Post Title</label>
                    <input type="text" className="form-control" name="post_title" id="post_title" ref={titleInputRef}/>
                </div>
                <div className="form-group">
                    <label htmlFor="post_body" className="form-label col-form-label mt-4">Post Body</label>
                    <textarea className="form-control" id="post_body" rows="7" ref={bodyInputRef}></textarea>
                </div>
                <button className="btn btn-primary mt-4">Create Post</button>
            </form>
        </div>
    );
}

export default CreatePostPage;