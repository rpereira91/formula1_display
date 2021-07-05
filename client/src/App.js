import React from 'react'
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Schedule from './pages/Schedule';
import Drivers from './pages/Drivers';
import Home from './pages/Home';
import NavBar from './components/NavBar';
import { PATHS } from './utils/constants';

import './App.css';
import { Container } from 'semantic-ui-react'

function App() {

  return (
    <Router>
    <Container>
      <NavBar />
      <Route exact path={PATHS.HOME.route} component={Home} />
      <Route path={PATHS.SCHEDULE.route} component={Schedule} />
      <Route path={PATHS.DRIVERS.route} component={Drivers} />
    </Container>
    </Router>
  );
}

export default App;
