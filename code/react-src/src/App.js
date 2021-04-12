import { Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import './App.css';

import { StoreProvider } from 'easy-peasy';
import MainStore from './stores/main.store';

import PostsList from './components/posts-list.component'
import NavBar from './components/navbar.component';
import MyAccount from './components/myaccount.component';
import Footer from './components/footer.component';
import Login from './components/login.component';
import Homepage from './components/homepage.component';
import CreatePost from './components/createPost.component';
import Admin from './components/admin.component';


function App() {
  return (
    <StoreProvider store={MainStore}>
      <div className="App">
        <NavBar/>
        <Switch>
          <Route exact path={["/"]} component={Homepage} />
          <Route exact path={["/posts"]} component={PostsList} />
          <Route exact path={["/createpost"]} component={CreatePost}/>
          <Route exact path={["/login"]} component={Login}/>
          <Route exact path={["/myaccount"]} component={MyAccount}/>
          <Route exact path={["/admin"]} component={Admin}/>
        </Switch>
      </div>
    </StoreProvider>
  );
}

export default App;
