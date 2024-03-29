import { Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import './App.css';

import { StoreProvider } from 'easy-peasy';
import MainStore from './stores/main.store';

import NavBar from './components/navbar.component';
import MyAccount from './components/myaccount.component';
import Genres from './components/genres.component';
import Footer from './components/footer.component';
import Login from './components/login.component';
import Homepage from './components/homepage.component';
import CreatePost from './components/createPost.component';
import Admin from './components/admin.component';
import ViewPost from './components/viewpost.component';
import {PrivateRoute} from './components/functional-components/privateroute.component';
import Search from './components/search.component';
import ViewPosts from './components/viewposts.component';
import Profile from './components/profile.component';
import NotFound from './components/style-components/notfound.component';


function App() {
  return (
    <StoreProvider store={MainStore}>
      <div className="App">
        <NavBar/>
        <Switch>
          <Route exact path={["/"]} component={Homepage} />
          <Route exact path={["/genres"]} component={Genres} />
          <Route exact path={["/login"]} component={Login}/>
          <Route exact path={["/post/:postId"]} component={ViewPost}/>
          <Route exact path={["/viewposts"]} component={ViewPosts}/>
          <Route exact path={["/search/:searchString"]} component={Search}/>
          <Route exact path={["/user/:username"]} component={Profile}/>
          <PrivateRoute exact path={["/createpost"]} component={CreatePost}/>
          <PrivateRoute exact path={["/myaccount"]} component={MyAccount}/>
          <PrivateRoute exact path={["/admin"]} component={Admin}/>
          <Route><NotFound /></Route>
        </Switch>
        <Footer/>
      </div>
    </StoreProvider>
  );
}

export default App;
