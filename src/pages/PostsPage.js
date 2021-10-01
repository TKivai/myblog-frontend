import {useState, useEffect, useContext} from 'react';
import { useHistory } from 'react-router-dom';

import PostComponent from '../components/PostComponent';
import PageLoadingComponent from '../components/PageLoading';
import UserContext from '../store/UserContext';


function PostsPage () {

    const [isLoading, setIsLoading] = useState(true);
    const [loadedPosts, setloadedPosts] = useState([]);
    const usercontext = useContext(UserContext);
    const history = useHistory();

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${usercontext.jwt}`
            },
        };
        fetch(`${process.env.REACT_APP_BASE_URL}/posts`,options)
        .then(response => {
            console.log(response.status);
            if (response.status === 401 || response.status === 403) {
                usercontext.setJwt("");
                usercontext.setIsLoggedIn(false);
                localStorage.clear();
                history.replace('/users/login')
            } 
            return response.json(); 
        })
        .then(posts => {
            setIsLoading(false);
            setloadedPosts(posts); 
        })
        .catch (err => {
            console.log("Err");
            console.log(err);
        });
    },
    [usercontext.jwt]);
    
    if(isLoading){
        return (
            <PageLoadingComponent/>
        );
    }

    return (
        <div className="" id="blog_posts_container" >
            {
                loadedPosts.map((loadedPost) => {
                    return <PostComponent post={loadedPost} showFullLink={true} key={loadedPost._id}/>
                })
            }
        </div>
        );
}

export default PostsPage;