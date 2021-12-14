import './App.css';

/* Importing react router so we can have multiple pages */
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import { Navbar } from './components/Navbar';
import { SocialMediaHomePage } from './components/pages/SocialMediaHomePage';
import { MePage } from './components/pages/MePage';
import { LoginPage } from './components/pages/LoginPage';

function App() {
  return (
    <Router>
      <Navbar />
        <Switch>
          <Route exact path="/">
            <SocialMediaHomePage />
          </Route>
          <Route exact path="/me">
            <MePage/>
          </Route>
          <Route path="/login">
            <LoginPage/>
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
