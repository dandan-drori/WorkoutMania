import React from 'react';
import { NativeRouter as Router, Switch, Route } from 'react-router-native';
import Drawer from './src/components/Drawer';
import Header from './src/components/Header';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './src/redux/reducer';
import Profile from './src/components/Profile';
import Home from './src/components/Home';
import Settings from './src/components/Settings';
import Workouts from './src/components/Workouts';
import Exercises from './src/components/Exercises';

const store = createStore(reducer);

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Switch>
          <Route path='/' exact>
            <Home />
          </Route>
          <Route path='/workouts' exact>
            <Workouts />
          </Route>
          <Route path='/workouts/log' exact>
            {/* <Log /> */}
          </Route>
          <Route path='/profile' exact>
            <Profile />
          </Route>
          <Route path='/profile/dashboard' exact>
            {/* <Dashboard /> */}
          </Route>
          <Route path='/workouts/:name'>
            <Exercises />
          </Route>
          <Route path='/settings' exact>
            <Settings />
          </Route>
        </Switch>
        <Drawer />
      </Router>
    </Provider>
  );
};

export default App;
