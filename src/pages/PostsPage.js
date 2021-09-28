import {useState, useEffect} from 'react';
import PostComponent from '../components/PostComponent';
import PageLoadingComponent from '../components/PageLoading';

function PostsPage () {

    const [isLoading, setIsLoading] = useState(true);
    const [loadedPosts, setloadedPosts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/posts',{credentials: 'include'})
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
    []);
    
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