import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './loginScreen';
import SignupScreen from './SignupScreen';
import HomeScreen from './homeScreen';
import MobileVerificationScreen from './MobileVerificationScreen';
import SplashScreen from './SplashScreen';
import Rainfallpred from './Rainfallpred';
import Croppred from './Croppred';
import Yieldpred from './Yieldpred';
import Dlpred from './Dlpred';

// Create a native stack navigator
const Stack = createNativeStackNavigator();

// Define the MainNavigation component
function MainNavigation() {
    // Return the JSX for the main navigation
    return (
        // Create a navigation container
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="SplashScreen" component={SplashScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Signup" component={SignupScreen} />
                <Stack.Screen name="MobileVerificationScreen" component={MobileVerificationScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Rainfallpred" component={Rainfallpred}/>
                <Stack.Screen name="Croppred" component={Croppred} />
                <Stack.Screen name="Yieldpred" component={Yieldpred} />
                <Stack.Screen name="Dlpred" component={Dlpred} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

// Export the MainNavigation component as the default export
export default MainNavigation;