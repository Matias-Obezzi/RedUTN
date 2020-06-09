import firebase from 'firebase'
require('firebase/firestore')

var firebaseConfig = {
    //YOUR-CREDENTIALS
};
firebase.initializeApp(firebaseConfig)

// firebase utils
const db = firebase.firestore()
const auth = firebase.auth()
const currentUser = auth.currentUser

// firebase collections
const usersCollection = db.collection('users-data')
const publishCollection = db.collection('publish')
const fieldValue = firebase.firestore.FieldValue

export {
    db,
    auth,
    currentUser,
    usersCollection,
    publishCollection,
    fieldValue
}