import 'react-native-gesture-handler';
import 'react-native-gesture-handler';
import React from 'react';
import Hamburger from './src/components/Hamburger';
import DrawerContent from './src/components/DrawerContent';
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
import { createDrawerNavigator } from '@react-navigation/drawer';
import Workout from './src/components/Workout';

const store = createStore(reducer);
const DrawerNavigator = createDrawerNavigator();
const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName='Home'
      screenOptions={{
        headerStyle: { backgroundColor: '#aa00ff' },
        headerTintColor: '#fff',
        headerTitleStyle: 'bold',
        headerLeft: props => <Hamburger {...props} />,
      }}>
      <Stack.Screen name='Home' component={Home} />
    </Stack.Navigator>
  );
};
const WorkoutsStack = () => {
  return (
    <Stack.Navigator
      initialRouteName='Workouts'
      screenOptions={{
        headerStyle: { backgroundColor: '#aa00ff' },
        headerTintColor: '#fff',
        headerTitleStyle: 'bold',
        headerLeft: props => <Hamburger {...props} />,
      }}>
      <Stack.Screen name='Workouts' component={Workouts} />
      <Stack.Screen name='Workout' component={Exercises} />
      <Stack.Screen name='WorkoutMode' component={WorkoutMode} />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <DrawerNavigator.Navigator
          drawerContent={props => <DrawerContent {...props} />}>
          <DrawerNavigator.Screen name='Home' component={HomeStack} />
          <DrawerNavigator.Screen name='Workouts' component={WorkoutsStack} />
        </DrawerNavigator.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
