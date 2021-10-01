import { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PostComponent from '../components/PostComponent';
import UserContext from '../store/UserContext';
import PageLoadingComponent from '../components/PageLoading';


function PostPage (props) {
    const history = useHistory();
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
        fetch(`${process.env.REACT_APP_BASE_URL}/posts/${postid}`, options)
        .then(response => {
            if (response.status === 401 || response.status === 403) {
                usercontext.setJwt("");
                usercontext.setIsLoggedIn(false);
                localStorage.clear();
                history.replace('/users/login')
            }
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
    }, [postid,usercontext.jwt, history, usercontext]);
    
    if(isLoading){
        return (
            <PageLoadingComponent/>
        );
    }
    return (
        <PostComponent
         post={loadedPost}
         showFullLink={false}
         canEdit={canEdit}
         authorName={authorName}
         setLoadedPost={setloadedPost}
         setCanEdit={setCanEdit}
         setAuthorName={setAuthorName}/>
    );
}

export default PostPage;