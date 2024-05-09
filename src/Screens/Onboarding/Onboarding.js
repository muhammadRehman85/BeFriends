import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const HomeScreen = () => {
  const handleLike = () => {
    // Handle like button press
  };

  const handleComment = () => {
    // Handle comment button press
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Facebook</Text>
      </View>
      <View style={styles.content}>
        <Text>Welcome to Facebook</Text>
        <Image source={require('../../assets/onboard.png')} style={styles.logo} />
        {/* Example posts */}
        <View style={styles.post}>
          <Image source={require('../../assets/onboard.png')} style={styles.postImage} />
          <Text style={styles.postText}>This is an example post. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.button} onPress={handleLike}>
              <Text>Like</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleComment}>
              <Text>Comment</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Add more posts as needed */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
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
  postImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
    borderRadius: 10,
  },
  postText: {
    fontSize: 16,
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#3b5998',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
});

export default HomeScreen;
