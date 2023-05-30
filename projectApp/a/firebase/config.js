import firebase from "firebase";
import "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAS__W0XkRP8iihBas_D25zxzFhJ9HZRsQ",
  authDomain: "stepcounter-3b7fc.firebaseapp.com",
  databaseURL: "https://stepcounter-3b7fc.firebaseio.com",
  projectId: "stepcounter-3b7fc",
  storageBucket: "stepcounter-3b7fc.appspot.com",
  messagingSenderId: "637352248062",
  appId: "1:637352248062:web:dcc15efa7a7426ae89dbaf",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
