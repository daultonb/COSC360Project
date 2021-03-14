import { Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import './App.css';

import PostsList from './components/posts-list.component'
import Login from './components/login.component';
import Homepage from './components/homepage.component';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path={["/"]} component={Homepage} />
        <Route exact path={["/posts"]} component={PostsList} />
        <Route exact path={["/login"]} component={Login} />
      </Switch>
    </div>
  );
}

export default App;
