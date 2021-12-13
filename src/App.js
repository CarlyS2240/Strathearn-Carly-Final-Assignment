import './App.css';

/* Importing react router so we can have multiple pages */
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import { SocialMediaHomePage } from './components/pages/SocialMediaHomePage';
import { LoginPage } from './components/pages/LoginPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <SocialMediaHomePage />
        </Route>
        <Route exact path="/me">
          <div>Me</div>
        </Route>
        <Route path="/login">
          <LoginPage/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
