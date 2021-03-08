import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDxk9Rgo8lrCXvLGZU_DArf9JqhElmzdNA",
  authDomain: "snapchat-fee87.firebaseapp.com",
  projectId: "snapchat-fee87",
  storageBucket: "snapchat-fee87.appspot.com",
  messagingSenderId: "465987296378",
  appId: "1:465987296378:web:124fd3579c696828812fc3"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, storage, provider };
