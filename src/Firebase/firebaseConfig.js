import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyAdZI75B_rncoLg59qBDjpDlkJR2Wdmx-I",
    authDomain: "the-dojo-9329b.firebaseapp.com",
    projectId: "the-dojo-9329b",
    storageBucket: "the-dojo-9329b.appspot.com",
    messagingSenderId: "403370800981",
    appId: "1:403370800981:web:024744b2bbce712ee8e1dc"
  };

//   init firebase 
firebase.initializeApp(firebaseConfig)

const ProjectFirestore = firebase.firestore()
const ProjectAuth = firebase.auth()
const ProjectStorage = firebase.storage()

// TimeStamp
const timestamp = firebase.firestore.Timestamp

export { ProjectAuth, ProjectFirestore, ProjectStorage, timestamp }