import 'react-native-gesture-handler';
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './src/redux/reducer';
import Login from './src/components/auth/Login';
import Signup from './src/components/auth/Signup';
import Home from './src/components/Home';
import Workouts from './src/components/workouts/Workouts';
import Exercises from './src/components/workouts/Exercises';
import WorkoutMode from './src/components/workouts/WorkoutMode';
import Profile from './src/components/profile/Profile';
import Settings from './src/components/Settings';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';

const store = createStore(reducer);
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
            return <Icon name={iconName} size={size} color={color} />;
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
            return <IonIcon name={iconName} size={size} color={color} />;
          } else if (route.name === 'Workouts') {
            iconName = focused ? 'dumbbell' : 'dumbbell';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'account' : 'account-outline';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#aa00ff',
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen name='Home' component={HomeStack} />
      <Tab.Screen name='Workouts' component={WorkoutsStack} />
      <Tab.Screen name='Profile' component={ProfileStack} />
      <Tab.Screen name='Settings' component={SettingsStack} />
    </Tab.Navigator>
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
      }}>
      <Stack.Screen name='Workouts' component={Workouts} />
      <Stack.Screen name='Exercises' component={Exercises} />
      <Stack.Screen name='WorkoutMode' component={WorkoutMode} />
    </Stack.Navigator>
  );
};

const ProfileStack = () => {
  return (
    <Stack.Navigator
      initialRouteName='Profile'
      screenOptions={{
        headerStyle: { backgroundColor: '#aa00ff' },
        headerTintColor: '#fff',
        headerTitleStyle: 'bold',
      }}>
      <Stack.Screen name='Profile' component={Profile} />
    </Stack.Navigator>
  );
};

const SettingsStack = () => {
  return (
    <Stack.Navigator
      initialRouteName='Settings'
      screenOptions={{
        headerStyle: { backgroundColor: '#aa00ff' },
        headerTintColor: '#fff',
        headerTitleStyle: 'bold',
      }}>
      <Stack.Screen name='Settings' component={Settings} />
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
          <Stack.Screen name='HomeStack' component={HomeTabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
