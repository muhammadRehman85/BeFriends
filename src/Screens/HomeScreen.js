import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const HomeScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Facebook</Text>
      </View>
      <View style={styles.content}>
        <Text>Welcome to Facebook</Text>
        <Image source={require('../assets/onboard.png')} style={styles.logo} />
        {/* Example posts */}
        <View style={styles.post}>
          <Text style={styles.postText}>Post 1: This is an example post. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
        </View>
        <View style={styles.post}>
          <Text style={styles.postText}>Post 2: Another example post. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    backgroundColor: '#3b5998',
    paddingVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  content: {
    width: '90%',
    alignItems: 'center',
  },
  logo: {
    width: windowWidth * 0.5,
    height: windowWidth * 0.5,
    resizeMode: 'contain',
    marginTop: 20,
  },
  post: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
    width: '100%',
    maxWidth: 600,
  },
  postText: {
    fontSize: 16,
  },
});

export default HomeScreen;
