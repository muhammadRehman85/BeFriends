import React, {useState} from 'react';
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
import Navigation from '../components/Navigation/Navigation';
import notifee from '@notifee/react-native';
const Signup = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [username,setUsername]=useState();

  // ---------------------Notification----------
  const onDisplayNotification = async () => {
    console.log('send');
    // Request permissions (required for iOS)
    await notifee.requestPermission();

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
      title: 'Notification Title',
      body: 'user with email:' + email + 'is registered',
      android: {
        channelId,
        // smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
      },
    });
  };

  const [isExist, setIsExist] = useState();
  const saveData = () => {
    console.log('calledddd');
    // ----------------fetching Users Data-------------------
    firestore()
      .collection('Users')
      // Filter results
      .where('email', '==', email)
      .get()
      .then(querySnapshot => {
        setIsExist(querySnapshot.docs.length);
        console.log(querySnapshot.docs.length);
      });
    // -------------checking that a user email already exist or not -----
    if (isExist > 0) {
      Alert.alert('Email Already Exist');
    } else {
      firestore()
        .collection('Users')
        .add({
          username:username,
          email: email,
          password: password,
        })
        .then(() => {
          console.log('User added!');
          onDisplayNotification();
          // navigation.navigate('HomeScreen');
        });
    }
  };
  return (
    <View style={styles.container}>
      <View style={{height: '20vmin', paddingTop: 60, paddingLeft: 20}}>
        <Text style={{fontSize: 40, fontWeight: 'bold', color: '#d9346d'}}>
          Sign Up
        </Text>
        <View style={{width: '86%', paddingTop: 5}}>
          <Text style={{fontWeight: 'bold', color: 'black', fontSize: 16}}>
            Please login or sign up to continue to use our app{' '}
          </Text>
        </View>
      </View>
      <View
        style={{height: '30%', justifyContent: 'center', alignItems: 'center'}}>
        <View>
          <Text
            style={{
              fontSize: 20,
              color: '#d9346d',
              fontWeight: 'bold',
              marginBottom: 15,
            }}>
            Enter Via facebook or Google{' '}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
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
            }}>
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
              // elevation: 2,
              margin: 10,
              justifyContent: 'center',
              alignItems: 'center',
              elevation: 15,
              shadowColor: '#d9346d',
              backgroundColor: '#ecf0f1',
            }}>
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
            placeholder="username"
            placeholderTextColor="grey"
            keyboardType="text"
            autoCapitalize="none"
            value={username}
            onChangeText={text => setUsername(text)}
          /></View><View style={styles.inputContainer}>
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
          {/* <FontAwesomeIcon
            name="lock"
            size={20}
            color="#d9346d"
            style={styles.icon}
          /> */}
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="grey"
            secureTextEntry={true}
            value={password}
            onChangeText={text => setPassword(text)}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={() => saveData()}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      < TouchableOpacity onPress={()=>navigation.navigate('Login')} style={{flexDirection:'row',paddingTop:10}}><Text style={{fontSize:16,color:'black'}}>You Already have an acount? </Text><Text style={{color:'#d9346d',fontSize:16}}>Login</Text></TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor:'#ecf0f1',
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
    // backgroundColor:'grey',
    elevation: 3,
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

export default Signup;
