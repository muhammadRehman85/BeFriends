// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


// Initialize Firebase

import firestore from '@react-native-firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAZkUbao8Uytqgyc99OvcJtJBKC5e62JKs",
    authDomain: "quizzykids-57a81.firebaseapp.com",
    projectId: "quizzykids-57a81",
    storageBucket: "quizzykids-57a81.appspot.com",
    messagingSenderId: "994027824228",
    appId: "1:994027824228:web:1d5e27a1e75282f64cab71",
    measurementId: "G-BFRZHCDC7C"
  };

if (!firestore().apps.length) {
  firestore().initializeApp(firebaseConfig);
}

export default firestore;
