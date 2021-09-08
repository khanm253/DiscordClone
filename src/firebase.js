import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyD50AA_m4qfech0h2iYGZphZorn7g0JjZQ",
    authDomain: "discord-clone-yt-a7984.firebaseapp.com",
    projectId: "discord-clone-yt-a7984",
    storageBucket: "discord-clone-yt-a7984.appspot.com",
    messagingSenderId: "1059571113939",
    appId: "1:1059571113939:web:6d46f47994fc7de6f15926",
    measurementId: "G-V1BS8KJVSX"
  };


const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider};
export default db;