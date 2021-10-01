import {useContext, useRef, useState} from 'react';
import UserContext from '../store/UserContext';
import { useHistory } from 'react-router-dom';

function EditPostComponent (props) {
    const titleInputRef = useRef();
    const bodyInputRef = useRef();
    const usercontext = useContext(UserContext);
    const post_id = props.post._id;
    const history = useHistory();
    console.log(post_id)
    const [displayEditForm, setDisplayEditForm] = useState(false);

    function displayEditFormHandler () {
        setDisplayEditForm(!displayEditForm);
    }

    function editPostHandler (event) {
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
        fetch(`${process.env.REACT_APP_BASE_URL}/posts/edit/${post_id}`, options)
            .then(response => {
                if (!response.ok) {
                    throw Error(response.status);
                }
                return response.json();
            })
            .then(update => {
                console.log(props);
                props.setCanEdit(update.canEdit);
                props.setAuthorName(update.authorName);
                props.setLoadedPost(update.post);
                setDisplayEditForm(false);
                // history.replace('/posts')
            })
            .catch(e => {
                console.log(e);
            });
    }
    
    function deletePostHandler (event) {
        event.preventDefault();

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${usercontext.jwt}`
            },
        };
        fetch(`${process.env.REACT_APP_BASE_URL}/posts/delete/${post_id}`, options)
            .then(response => {
                if (!response.ok) {
                    throw Error(response.status);
                }
                return response.json();
            })
            .then(update => {
                console.log(update);
                history.replace('/posts')
            })
            .catch(e => {
                console.log(e);
            });
    }
    return (
        <div>
            <div className="my-3 d-flex align-items-center">
                <button type="button" onClick={displayEditFormHandler} className="btn btn-info mx-5" id="edit_btn" data-bs-toggle="edit_form" data-bs-target="#edit_form" style={{width: "max-content"}}>Edit</button>
                <a href="#" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#delete_modal" id="delete_btn" role="button" style={{width: "max-content"}}>Delete</a>
            </div>
            <hr className="my-2 mb-5"/>
            { displayEditForm ?
            <form className="edit_form my-3 p-3" id="edit_form" >
                <h1 className="col-sm-3" style={{margin: "0 auto", width: "max-content"}}>Edit the post</h1>
                <div className="form-group">
                    <label htmlFor="post_title" className="col-form-label">Post Title</label>
                    <input type="text" className="form-control" ref={titleInputRef} name="post_title" id="post_title" defaultValue={props.post.title}/>
                </div>

                <div className="form-group">
                    <label htmlFor="post_body" className="form-label col-form-label mt-4">Post Body</label>
                    <textarea className="form-control" name="post_body" ref={bodyInputRef} id="post_body" rows="3" defaultValue={props.post.body}></textarea>
                </div>
                <button onClick={editPostHandler} className="btn btn-primary mt-4" id="submit_btn">Update Post</button>
            </form>
            : null}
        <div className="modal fade" id="delete_modal">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Delete Post</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true"></span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p>Are you sure you want to delete this post?</p>
                    </div>
                    <div className="modal-footer">
                            <button className="btn btn btn-primary" onClick={deletePostHandler}>Save changes</button>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" data-target="#delete_modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
</div>
    );
}

export default EditPostComponent;