import {Route, Switch} from 'react-router-dom';

import WelcomePage from './pages/WelcomePage';
import PostsPage from './pages/PostsPage';
import CreatePostsPage from './pages/CreatePostPage';
import PostPage from './pages/PostPage';

import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';

import HeaderBar from './components/HeaderBar';
function App() {
  return (
    <div className="page_content">
      <HeaderBar/>
      <Switch>
        <Route path='/' exact>
          <WelcomePage/>
        </Route>
        <Route path='/users/login' exact>
          <LoginPage/>
        </Route>
        <Route path='/users/register' exact>
          <RegisterPage/>
        </Route>
        <Route path='/posts/create'>
          <CreatePostsPage/>
        </Route>
        <Route path='/posts/:postid' exact component={PostPage}/>
        <Route path='/posts'>
          <PostsPage/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
