import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../Screens/HomeScreen';
import OnboardingScreen from '../../Screens/Onboarding/Onboarding';
import SignInScreen from '../../Screens/SignIn';
import Login from '../../Screens/Login';
import Signup from '../../Screens/Signup';
import AddPostScreen from '../../Screens/AddPostScreen';

const Stack = createNativeStackNavigator();
const Navigation = () => {
  return (
    <NavigationContainer >
    <Stack.Navigator  screenOptions={{
        headerShown: false // This line removes the header
      }}>
      
    {/* <Stack.Screen name="SignIn"  component={SignInScreen} /> */}

      <Stack.Screen name="AddPostScreen"  component={AddPostScreen} />
      <Stack.Screen name="OnboardingScreen"  component={OnboardingScreen} />
      <Stack.Screen name="Login"  component={Login} />
      <Stack.Screen name="Signup"  component={Signup} />
      <Stack.Screen name="HomeScreen" options={{title:'BeFriends'}} component={HomeScreen} />

    </Stack.Navigator>
  </NavigationContainer>
  )
}

export default Navigation