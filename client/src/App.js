import React from 'react'
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { Provider } from 'react-redux'
import store from './redux/store';
import Schedule from './pages/Schedule';
import Drivers from './pages/Drivers';
import Home from './pages/Home';
import NavBar from './components/NavBar';
import { PATHS } from './utils/constants';
import { Container, } from "shards-react";
import './App.css';

function App() {

  return (
    <Provider store={store}>
      <Router>
        <NavBar />
        <Container fluid className="pages">
          <Route exact path={PATHS.HOME.route} component={Home} />
          <Route path={PATHS.SCHEDULE.route} component={Schedule} />
          <Route path={PATHS.DRIVERS.route} component={Drivers} />
        </Container>
      </Router>
    </Provider>
  );
}

export default App;
