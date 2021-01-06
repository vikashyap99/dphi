import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyAv0SHVVBdjpplfHRyH3id1muMGImpkfV8",
    authDomain: "noteapp-75aed.firebaseapp.com",
    projectId: "noteapp-75aed",
    storageBucket: "noteapp-75aed.appspot.com",
    messagingSenderId: "699587681201",
    appId: "1:699587681201:web:0a1b79199fbd76244afb90",
    measurementId: "G-1F97Y4TNCT"
  };

  firebase.initializeApp(firebaseConfig)

  export default firebase;
