import {useState} from 'react';
import PostComponent from '../components/PostComponent';

function PostsPage () {

    const [isLoading, setIsLoading] = useState(true);
    const [loadedPosts, setloadedPosts] = useState([]);

    fetch('http://localhost:4000/posts')
        .then(response => {
            return response.json(); 
        })
        .then(posts => {
            setIsLoading(false);
            setloadedPosts(posts); 
        })
        .catch (err => {
            console.log("Error");
            console.log(err);
        });
    
    if(isLoading){
        return (
            <div className="spinner-grow text-primary" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        );
    }

    return (
        <div className="" id="blog_posts_container" >
            {
                loadedPosts.map((loadedPost) => {
                    return <PostComponent post={loadedPost} />
                })
            }
        </div>
        );
}

export default PostsPage;