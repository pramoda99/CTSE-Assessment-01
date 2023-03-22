import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBNJCbXB1uKZ-PHtai26SjVXABe4_RiwlU",
  authDomain: "ctseassessment1.firebaseapp.com",
  projectId: "ctseassessment1",
  storageBucket: "ctseassessment1.appspot.com",
  messagingSenderId: "46874672746",
  appId: "1:46874672746:web:559486e02ecd00af0c9413",
  measurementId: "G-RW7L6G3TSD"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
