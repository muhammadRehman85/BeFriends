import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import notifee from '@notifee/react-native';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const checkLogin = async () => {
    try {
      const querySnapshot = await firestore()
        .collection('Users')
        .where('email', '==', email)
        .get();

      if (querySnapshot.empty) {
        Alert.alert('No user found with this email.');
        return;
      }

      const user = querySnapshot.docs[0].data();

      if (user.password === password && user.email==email) {
        navigation.navigate('HomeScreen');
      } else {
        Alert.alert('Wrong email or password');
      }
    } catch (error) {
      Alert.alert('An error occurred. Please try again.');
    }
  };

  const navigateToSignup = () => {
    navigation.navigate('Signup');
  };

  return (
    <View style={styles.container}>
      <View style={{ height: '20%', paddingTop: 60, paddingLeft: 20 }}>
        <Text style={{ fontSize: 40, fontWeight: 'bold', color: '#d9346d' }}>
          Login Now
        </Text>
        <View style={{ width: '86%', paddingTop: 5 }}>
          <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16 }}>
            Please login or sign up to continue to use our app
          </Text>
        </View>
      </View>
      <View
        style={{ height: '30%', justifyContent: 'center', alignItems: 'center' }}
      >
        <View>
          <Text
            style={{
              fontSize: 20,
              color: '#d9346d',
              fontWeight: 'bold',
              marginBottom: 15,
            }}
          >
            Enter Via Facebook or Google
          </Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 50,
              elevation: 15,
              backgroundColor: '#ecf0f1',
              shadowColor: '#d9346d',
              justifyContent: 'center',
              alignItems: 'center',
              margin: 10,
            }}
          >
            <FontAwesomeIcon
              name="facebook"
              size={40}
              color="blue"
              style={styles.icon}
            />
          </View>
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 50,
              margin: 10,
              justifyContent: 'center',
              alignItems: 'center',
              elevation: 15,
              shadowColor: '#d9346d',
              backgroundColor: '#ecf0f1',
            }}
          >
            <FontAwesomeIcon
              name="google"
              size={40}
              color="blue"
              style={styles.icon}
            />
          </View>
        </View>
      </View>
      <View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="grey"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={text => setEmail(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="grey"
            secureTextEntry={true}
            value={password}
            onChangeText={text => setPassword(text)}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={checkLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={navigateToSignup}
        style={{ flexDirection: 'row', paddingTop: 10 }}
      >
        <Text style={{ fontSize: 16, color: 'black' }}>
          Don't have an account?{' '}
        </Text>
        <Text style={{ color: '#d9346d', fontSize: 16 }}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#d9346d',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    height: 60,
    borderRadius: 10,
    backgroundColor: '#ecf0f1',
    elevation: 3,
    paddingLeft: 15,
  },
  button: {
    backgroundColor: '#d9346d',
    paddingVertical: 12,
    paddingHorizontal: 30,
    height: 70,
    borderRadius: 15,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Login;
