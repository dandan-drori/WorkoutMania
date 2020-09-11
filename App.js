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
import Login from './src/components/auth/Login';
import Signup from './src/components/auth/Signup';
import { AsyncStorage } from 'react-native';

const store = createStore(reducer);
const DrawerNavigator = createDrawerNavigator();
const Stack = createStackNavigator();

const HomeDrawer = () => {
  return (
    <DrawerNavigator.Navigator
      initialRouteName='HomeStack'
      drawerContent={({ navigation }) => (
        <DrawerContent navigation={navigation} />
      )}>
      <DrawerNavigator.Screen name='HomeStack' component={HomeStack} />
    </DrawerNavigator.Navigator>
  );
};

const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName='Home'
      screenOptions={{
        headerStyle: { backgroundColor: '#aa00ff' },
        headerTintColor: '#fff',
        headerTitleStyle: 'bold',
        headerRight: props => <Hamburger {...props} />,
      }}>
      <Stack.Screen name='Home' component={Home} />
      <Stack.Screen name='Workouts' component={Workouts} />
      <Stack.Screen name='Exercises' component={Exercises} />
      <Stack.Screen name='WorkoutMode' component={WorkoutMode} />
      <Stack.Screen name='Settings' component={Settings} />
      <Stack.Screen name='Profile' component={Profile} />
    </Stack.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName='Login'
      screenOptions={{
        headerShown: false,
        headerStyle: { backgroundColor: '#aa00ff' },
        headerTintColor: '#fff',
        headerTitleStyle: 'bold',
      }}>
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='Signup' component={Signup} />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='AuthStack'
          screenOptions={{ headerShown: false }}>
          <Stack.Screen name='AuthStack' component={AuthStack} />
          <Stack.Screen name='HomeStack' component={HomeDrawer} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
