import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import Navigation from './src/components/Navigation/Navigation'

import OnboardingScreen from './src/Screens/Onboarding/Onboarding'

const App = () => {
  return (
<>

<StatusBar
        backgroundColor="white" // Change the background color
        barStyle="light-content"  // Change text color (dark or light)
        translucent={false}       // Make the status bar translucent or not
      />
{/* <OnboardingScreen/> */}
<Navigation/>

</>
  )
}

export default App