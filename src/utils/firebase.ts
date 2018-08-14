import * as firebase from "firebase";

const config = {
  apiKey: "AIzaSyBoEXbtYPrlD5nQ_kmgw53yZ_l5XGugAR8",
  authDomain: "geo-chat-room.firebaseapp.com",
  databaseURL: "https://geo-chat-room.firebaseio.com",
  messagingSenderId: "49412870174",
  projectId: "geo-chat-room",
  storageBucket: "geo-chat-room.appspot.com"
};
firebase.initializeApp(config);

export default firebase;

export const db = firebase.database();
