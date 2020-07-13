import firebase from 'firebase'
require('firebase/firestore')

var firebaseConfig = {
    apiKey: "AIzaSyAFK9b7AuMkVPHIElYlQgxanFY0oFIRhg0",
    authDomain: "redutn-mo.firebaseapp.com",
    databaseURL: "https://redutn-mo.firebaseio.com",
    projectId: "redutn-mo",
    storageBucket: "redutn-mo.appspot.com",
    messagingSenderId: "364399515965",
    appId: "1:364399515965:web:6b8e3d353d5195c4ac8d54",
    measurementId: "G-NW25LWTLD6"
};
firebase.initializeApp(firebaseConfig)

// firebase utils
const db = firebase.firestore()
const auth = firebase.auth()
const currentUser = auth.currentUser

// firebase collections
const usersCollection = db.collection('users-data')
const publishCollection = db.collection('publish')
const chatsCollection = db.collection('chats')
const fieldValue = firebase.firestore.FieldValue

export {
    db,
    auth,
    currentUser,
    usersCollection,
    publishCollection,
    chatsCollection,
    fieldValue
}