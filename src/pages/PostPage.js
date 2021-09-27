import { useState, useEffect } from 'react';
// import {useParams} from 'react-router-dom';
import PostComponent from '../components/PostComponent';

function PostPage (props) {
    const [isLoading, setIsLoading] = useState(true);
    const [loadedPost, setloadedPost] = useState([]);
    const {postid} = props.match.params;

    useEffect(() => {
        fetch(`http://localhost:4000/posts/${postid}`)
        .then(response => {
            return response.json(); 
        })
        .then(post => {
            setIsLoading(false);
            setloadedPost(post); 
        })
        .catch (err => {
            console.log("Error");
            console.log(err);
        });
    }, [postid]);
    
    if(isLoading){
        return (
            <div className="spinner-grow text-primary" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        );
    }
    return (
        <PostComponent post={loadedPost} showFullLink={false}/>
    );
}

export default PostPage;