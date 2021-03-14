import { Route, Switch } from 'react-router';
import './App.css';

import { StoreProvider } from 'easy-peasy';
import PostsStore from './stores/posts.store';

import PostsList from './components/posts-list.component'
import Login from './components/login.component';
import Homepage from './components/homepage.component';

function App() {
  return (
    <StoreProvider store={PostsStore}>
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
