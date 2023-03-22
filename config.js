import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDVyf3aYduxYqKVmHEn-DSs5mSDlaclmqg",
  authDomain: "todoreactnative-5f0e6.firebaseapp.com",
  projectId: "todoreactnative-5f0e6",
  storageBucket: "todoreactnative-5f0e6.appspot.com",
  messagingSenderId: "657773602755",
  appId: "1:657773602755:web:cc80126349254a8ded3f76",
  measurementId: "G-G2JQZSCDQH"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
