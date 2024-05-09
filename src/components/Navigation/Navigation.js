import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../Screens/HomeScreen';
import OnboardingScreen from '../../Screens/Onboarding/Onboarding';
import SignInScreen from '../../Screens/SignIn';

const Stack = createNativeStackNavigator();
const Navigation = () => {
  return (
    <NavigationContainer >
    <Stack.Navigator>
      
    {/* <Stack.Screen name="SignIn"  component={SignInScreen} /> */}

      {/* <Stack.Screen name="OnboardingScreen"  component={OnboardingScreen} /> */}
      <Stack.Screen name="HomeScreen" options={{title:'BeFriends'}} component={HomeScreen} />

    </Stack.Navigator>
  </NavigationContainer>
  )
}

export default Navigation