import React, { useState, useRef } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Dimensions, TouchableOpacity, Modal } from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width, height } = Dimensions.get('window');

const DATA = [
  {
    id: '1',
    title: 'Visit London City Center Visit London City Center Visit London City Visit London City Center Visit London City Center Center Visit London City Center Visit London City Center ',
    media: require('../assets/e.jpeg'),
    type: 'image',
  },
  {
    id: '2',
    title: 'The Green World',
    media: require('../assets/green.jpeg'),
    type: 'image',
  },
  {
    id: '3',
    title: 'The Awesome London',
    media: require('../assets/d.jpeg'),
    type: 'image',
  },
  {
    id: '4',
    title: 'This is Awesome City',
    media: require('../assets/f.jpeg'),
    type: 'image',
  },
  {
    id: '5',
    title: 'Exploring Nature',
    media: require('../assets/v.mp4'),
    type: 'video',
  },
  {
    id: '6',
    title: 'Exploring Nature',
    media: require('../assets/v.mp4'),
    type: 'video',
  },
  // Add more posts as needed
];

const HomeScreen = () => {
  const [fullScreen, setFullScreen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);
  const videoRef = useRef(null);

  const handleVideoPress = (video) => {
    setCurrentVideo(video);
    setFullScreen(true);
  };

  const renderPost = ({ item }) => {
    if (item.type === 'image') {
      return (
        <View style={styles.postContainer}>
          <Image source={item.media} style={styles.postImage} />
          <View style={styles.postContent}>
            <Text style={styles.postTitle}>{item.title}</Text>
            <View style={styles.buttonsContainer}>
              <Icon name="heart-o" size={25} color="grey" />
              <Text>56</Text>
              <Icon name="comments-o" size={25} color="gray" />
              <Text>34</Text>
            </View>
          </View>
        </View>
      );
    } else if (item.type === 'video') {
      return (
        <View style={styles.postContainer}>
          <TouchableOpacity onPress={() => handleVideoPress(item.media)}>
            <Video
              source={item.media}
              style={styles.postVideo}
              resizeMode="cover"
              repeat
              paused={false}
              controls
            />
          </TouchableOpacity>
          <View style={styles.postContent}>
            <Text style={styles.postTitle}>{item.title}</Text>
            <View style={styles.buttonsContainer}>
              <Icon name="heart-o" size={25} color="grey" />
              <Text>56</Text>
              <Icon name="comments-o" size={25} color="gray" />
              <Text>34</Text>
            </View>
          </View>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
      {fullScreen && (
        <Modal
          visible={fullScreen}
          supportedOrientations={['portrait', 'landscape']}
          onRequestClose={() => setFullScreen(false)}
        >
          <View style={styles.fullScreenContainer}>
            <Video
              ref={videoRef}
              source={currentVideo}
              style={styles.fullScreenVideo}
              resizeMode="contain"
              controls
              fullscreen
            />
            <TouchableOpacity style={styles.closeButton} onPress={() => setFullScreen(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  listContainer: {
    paddingBottom: 20,
  },
  postContainer: {
    backgroundColor: '#ffffff',
    marginTop: 20,
    height: 300,
    borderRadius: 10,
    overflow: 'hidden',
  },
  postImage: {
    width: '100%',
    height: '80%',
    borderRadius: 15,
  },
  postVideo: {
    width: '100%',
    height: 200,
  },
  postContent: {
    minHeight: '20%',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  postTitle: {
    width: '50%',
    minHeight: 30,
    flexWrap: 'wrap',
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
    paddingBottom: 15,
    marginTop: 5,
  },
  buttonsContainer: {
    width: 150,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  buttonText: {
    color: '#808080',
    fontWeight: 'bold',
    fontSize: 16,
  },
  fullScreenContainer: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenVideo: {
    width: '100%',
    height: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 30,
    right: 20,
    zIndex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
