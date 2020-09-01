import 'react-native-gesture-handler';
import 'react-native-gesture-handler';
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
import WorkoutMode from './src/components/WorkoutMode';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, Button } from 'react-native';

const store = createStore(reducer);

const Stack = createStackNavigator();

const App = () => {
  return (
    // <Provider store={store}>
    //   <Router>
    //     <Header />
    //     <Switch>
    //       <Route path='/' exact>
    //         <Home />
    //       </Route>
    //       <Route path='/workouts' exact>
    //         <Workouts />
    //       </Route>
    //       <Route path='/workouts/log' exact>
    //         {/* <Log /> */}
    //       </Route>
    //       <Route path='/profile' exact>
    //         <Profile />
    //       </Route>
    //       <Route path='/profile/dashboard' exact>
    //         {/* <Dashboard /> */}
    //       </Route>
    //       <Route path='/workouts/:name' exact>
    //         <Exercises />
    //       </Route>
    //       <Route path='/workouts/:name/workout-mode' exact>
    //         <WorkoutMode />
    //       </Route>
    //       <Route path='/settings' exact>
    //         <Settings />
    //       </Route>
    //     </Switch>
    //     <Drawer />
    //   </Router>
    // </Provider>
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='Home'
          screenOptions={{
            headerStyle: {
              backgroundColor: '#aa00ff',
            },
            headerTintColor: '#fff',
          }}>
          <Stack.Screen name='Home' component={Home} />
          <Stack.Screen name='Workouts' component={Workouts} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
