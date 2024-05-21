import React, { useState } from 'react';
import { View, Image, StatusBar } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

const OnboardingScreen = ({ navigation }) => {
  const [color, setColor] = useState('#f637ac');

  const handlePageChange = (index) => {
    // Dynamically update status bar color based on the background color of the current page
    const newColor = index === 0 ? '#f637ac' : '#6fd9b6';
    console.log(newColor)
    setColor(newColor);
  };

  return (
    <>
  
      <View style={{ flex: 1 }}>
        <Onboarding
          onDone={() => navigation.navigate('Login')}
          onPageChange={handlePageChange} // Call handlePageChange function on page change
          pages={[
            {
              backgroundColor: '#fff',
              image: <Image source={require('../../assets/Befriend.png')} />,
              title: 'BeFreinds',
              subtitle: 'BeFreinds Connected You To Love One',
            },
            {
              backgroundColor: '#fff',
              image: <Image source={require('../../assets/Explore.png')} />,
              title: 'BeFriends',
              subtitle: 'Explore World with BeFriends',
            },
          ]}
        />
      </View>
    </>
  );
};

export default OnboardingScreen;
