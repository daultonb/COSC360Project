import { Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import './App.css';

import PostsList from './components/posts-list.component'
import Login from './components/login.component';

function App() {
  return (
    <div className="App">
      Testing.
      Learn React

      <Link to={"/posts"} className="linkTo">
        Posts
      </Link>

      <Login />

      <div className="testing">
        <Switch>
          <Route exact path={["/", "/posts"]} component={PostsList} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
