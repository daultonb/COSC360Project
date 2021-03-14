import { Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import './App.css';

import { StoreProvider } from 'easy-peasy';
import PostsStore from './stores/posts.store';

import PostsList from './components/posts-list.component'
import Login from './components/login.component';
import Homepage from './components/homepage.component';

function App() {
  return (
    <StoreProvider store={PostsStore}>
      <Link to={"/login"} className="linkTo">
        Login
      </Link>
      <div className="App">
        <Switch>
          <Route exact path={["/"]} component={Homepage} />
          <Route exact path={["/posts"]} component={PostsList} />
          <Route exact path={["/login"]} component={Login} />
        </Switch>
      </div>
    </StoreProvider>
  );
}

export default App;
