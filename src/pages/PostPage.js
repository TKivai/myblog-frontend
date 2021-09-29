import { useState, useEffect, useContext } from 'react';
// import {useParams} from 'react-router-dom';
import PostComponent from '../components/PostComponent';
import UserContext from '../store/UserContext';

function PostPage (props) {
    const [isLoading, setIsLoading] = useState(true);
    const [loadedPost, setloadedPost] = useState([]);

    const [canEdit, setCanEdit] = useState(false);
    const [authorName, setAuthorName] = useState(true);
    const usercontext = useContext(UserContext);
    const {postid} = props.match.params;

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${usercontext.jwt}`
            },
        };
        fetch(`https://appblog-nodejs.herokuapp.com/posts${postid}`, options)
        // fetch(`http://localhost:4000/posts/${postid}`, options)
        .then(response => {
            return response.json(); 
        })
        .then(data => {
            setIsLoading(false);
            setloadedPost(data.post);
            setCanEdit(data.canEdit);
            setAuthorName(data.authorName);
        })
        .catch (err => {
            console.log("Error");
            console.log(err);
        });
    }, [postid,usercontext.jwt]);
    
    if(isLoading){
        return (
            <div className="spinner-grow text-primary" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        );
    }
    return (
        <PostComponent post={loadedPost} showFullLink={false} canEdit={canEdit} authorName={authorName}/>
    );
}

export default PostPage;