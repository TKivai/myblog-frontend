import {useState, useEffect, useContext} from 'react';
import PostComponent from '../components/PostComponent';
import PageLoadingComponent from '../components/PageLoading';
import UserContext from '../store/UserContext';


function PostsPage () {

    const [isLoading, setIsLoading] = useState(true);
    const [loadedPosts, setloadedPosts] = useState([]);
    const usercontext = useContext(UserContext);

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${usercontext.jwt}`
            },
        };
        // fetch('http://localhost:4000/posts',options)
        fetch('https://appblog-nodejs.herokuapp.com/posts',options)
        .then(response => {
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