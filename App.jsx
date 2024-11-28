import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ImagePredictions from './src/screens/ImagePredictions';
import HomeScreen from './src/screens/homeScreen';
import LoginScreen from './src/screens/loginScreen';
import SignUpScreen from './src/screens/SignupScreen';
import MLandDLScreen from './src/screens/MLandDLScreen';
import MLScreen from './src/screens/MLScreen';
import DLScreen from './src/screens/DLScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignUpScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ImagePredictions" component={ImagePredictions} />
        <Stack.Screen name="MLandDLScreen" component={MLandDLScreen} />
        <Stack.Screen name="ML" component={MLScreen} />
        <Stack.Screen name="DL" component={DLScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;