import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

const AddPostScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [media, setMedia] = useState(null);
  const [mediaType, setMediaType] = useState('');
  const [uploading, setUploading] = useState(false);

  const selectMediaFromGallery = () => {
    launchImageLibrary({ mediaType: 'mixed' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const asset = response.assets[0];
        setMedia(asset);
        if (asset.type.startsWith('image')) {
          setMediaType('image');
        } else if (asset.type.startsWith('video')) {
          setMediaType('video');
        }
      }
    });
  };

  const selectMediaFromCamera = () => {
    launchCamera({ mediaType: 'mixed' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.errorMessage) {
        console.log('Camera Error: ', response.errorMessage);
      } else {
        const asset = response.assets[0];
        setMedia(asset);
        if (asset.type.startsWith('image')) {
          setMediaType('image');
        } else if (asset.type.startsWith('video')) {
          setMediaType('video');
        }
      }
    });
  };

  const uploadPost = async () => {
    if (!title || !media) {
      Alert.alert('Please enter a title and select an image or video.');
      return;
    }

    setUploading(true);
    let mediaUrl = '';

    if (mediaType === 'image') {
      const reference = storage().ref(`images/${Date.now()}_${media.fileName}`);
      const task = reference.putFile(media.uri);

      task.on('state_changed', (taskSnapshot) => {
        console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
      });

      try {
        await task;
        mediaUrl = await reference.getDownloadURL();
      } catch (error) {
        Alert.alert('Error uploading image. Please try again.');
        console.error(error);
        setUploading(false);
        return;
      }
    }

    try {
      await firestore().collection('posts').add({
        title,
        media: mediaUrl,
        type: mediaType,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
      Alert.alert('Post uploaded successfully!');
      setTitle('');
      setMedia(null);
      setMediaType('');
    } catch (error) {
      Alert.alert('Error uploading post. Please try again.');
      console.error(error);
    }

    setUploading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create a Post</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter title"
          placeholderTextColor="#888"
          value={title}
          onChangeText={setTitle}
        />
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.mediaButton} onPress={selectMediaFromCamera}>
          <FontAwesomeIcon name="camera" size={30} color="#fff" />
          <Text style={styles.mediaButtonText}>Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.mediaButton} onPress={selectMediaFromGallery}>
          <FontAwesomeIcon name="photo" size={30} color="#fff" />
          <Text style={styles.mediaButtonText}>Gallery</Text>
        </TouchableOpacity>
      </View>
      {media && (
        <View style={styles.mediaPreview}>
          {mediaType === 'image' && <Image source={{ uri: media.uri }} style={styles.mediaImage} />}
          {mediaType === 'video' && (
            <View>
              <Text style={styles.videoText}>Video selected: {media.fileName}</Text>
            </View>
          )}
        </View>
      )}
      <TouchableOpacity style={styles.uploadButton} onPress={uploadPost} disabled={uploading}>
        {uploading ? <ActivityIndicator size="small" color="#fff" /> : <Text style={styles.uploadButtonText}>Upload Post</Text>}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#d9346d',
    marginBottom: 20,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  inputContainer: {
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  input: {
    fontSize: 16,
    color: '#000',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  mediaButton: {
    flexDirection: 'row',
    backgroundColor: '#d9346d',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    width: '40%',
  },
  mediaButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  mediaPreview: {
    marginBottom: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  mediaImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  videoText: {
    fontSize: 16,
    color: '#d9346d',
  },
  uploadButton: {
    backgroundColor: '#d9346d',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddPostScreen;
