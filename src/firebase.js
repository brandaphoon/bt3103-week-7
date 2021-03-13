import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyBToDfyG7L6BiImSgjfmcn3NyRKurvgrf8",
    authDomain: "bt3103-week-6-d0541.firebaseapp.com",
    projectId: "bt3103-week-6-d0541",
    storageBucket: "bt3103-week-6-d0541.appspot.com",
    messagingSenderId: "886172718718",
    appId: "1:886172718718:web:8b25fc7fa47c71055d6a2f",
    measurementId: "G-TJWPSNPVN4"
  };

firebase.initializeApp(firebaseConfig);
var database = firebase.firestore();
export default database;