import {Route, Switch} from 'react-router-dom';

import PostsPage from './pages/PostsPage';
import WelcomePage from './pages/WelcomePage';
import CreatePostsPage from './pages/CreatePostPage';
import PostPage from './pages/PostPage';

import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';



import PostComponent from './components/PostComponent';
import HeaderBar from './components/HeaderBar';
function App() {
  return (
    <div className="page_content">
      <HeaderBar/>
      <Switch>
        <Route path='/'>
          <PostsPage/>
        </Route>
        <Route path='/posts/create'>
          <CreatePostsPage/>
        </Route>
        <Route path='/post/postid'>
          <PostPage/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
