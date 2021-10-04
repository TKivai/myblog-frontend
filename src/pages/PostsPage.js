import {useState, useEffect, useContext} from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import PostComponent from '../components/PostComponent';
import PageLoadingComponent from '../components/PageLoading';
import UserContext from '../store/UserContext';
import PaginationLinksComponent from '../components/PaginationLinks';

function PostsPage () {

    const [isLoading, setIsLoading] = useState(true);
    const [loadedPosts, setloadedPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(null);
    const [numPages, setNumPages] = useState(null);
    const usercontext = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const pageNumber = new URLSearchParams(location.search).get('page');
    let pageUrlQuery = "";
    if (pageNumber) {
        pageUrlQuery = `?page=${pageNumber}`
    } else {
        pageUrlQuery = `?page=1`
    }
    console.log(pageUrlQuery);
    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${usercontext.jwt}`
            },
        };
        fetch(`${process.env.REACT_APP_BASE_URL}/posts${pageUrlQuery}`,options)
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
        .then(res => {
            setCurrentPage(res.currentPage);
            setNumPages(res.numPages);
            setIsLoading(false);
            setloadedPosts(res.posts);
        })
        .catch (err => {
            console.log("Err");
            console.log(err);
        });
    },
    [usercontext.jwt, history, usercontext, pageUrlQuery]);
    
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
            <PaginationLinksComponent currentPage={parseInt(currentPage)} numPages={parseInt(numPages)}/>
        </div>
        );
}

export default PostsPage;