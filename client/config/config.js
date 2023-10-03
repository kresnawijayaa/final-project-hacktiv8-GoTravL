import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD1_Fy7s0Z1R2wMyPDi5HjTByN12K5qL-0",
  authDomain: "production-trvl.firebaseapp.com",
  projectId: "production-trvl",
  storageBucket: "production-trvl.appspot.com",
  messagingSenderId: "1008917014155",
  appId: "1:1008917014155:web:04e69e5a279c48e0c5568e"
};


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };