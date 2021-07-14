import React, {lazy, Suspense} from 'react'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Provider } from 'react-redux'
import store from './redux/store';
import Loading from './components/Loading'
import Home from './pages/Home';
import NavBar from './components/NavBar';
import { PATHS } from './utils/constants';
import { Container, } from "shards-react";
import './App.css';
const Schedule = lazy(() => import('./pages/Schedule'));
const Drivers = lazy(() => import('./pages/Drivers'));
const Race = lazy(() => import('./pages/Race'));

function App() {

  return (
    <Provider store={store}>
      <Router>
        <NavBar />
          <Suspense fallback={<Loading />}>
            <Switch>
            <Container fluid className="pages">
              <Route exact path={PATHS.HOME.route} component={Home} />
              <Route path={PATHS.SCHEDULE.route} component={Schedule} />
              <Route path={PATHS.DRIVERS.route} component={Drivers} />
              <Route path={PATHS.RACE.route} component={Race} />
              <Route exact path={PATHS.RACE_NO_PARAMS.route} component={Race} />
            </Container>
            </Switch>
          </Suspense>
      </Router>
    </Provider>
  );
}

export default App;
