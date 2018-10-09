import firebase from 'firebase'
import firestore from 'firebase/firestore'

export const initDB = () => {
  firebase.initializeApp({
    apiKey: 'AIzaSyDKF4H_YkaiVY8MO8PZ7lCQe2BVmKgxyVg',
    authDomain: 'doofchat-cd12f.firebaseapp.com',
    databaseURL: 'https://doofchat-cd12f.firebaseio.com',
    projectId: 'doofchat-cd12f',
    storageBucket: 'doofchat-cd12f.appspot.com',
    messagingSenderId: '343565348850',
  })
  const db = firebase.firestore()
  const settings = { timestampsInSnapshots: true }
  db.settings(settings)
  return db
}

export const syncMessages = (db, store) =>
  db
    .collection('messages')
    .orderBy('timestamp')
    .onSnapshot(snapshot => {
      let messages = {}
      snapshot.forEach(doc => {
        messages[doc.id] = doc.data()
      })
      store.setState({ messages: { ...store.getState().message, ...messages } })
    })

export const syncMembers = (db, store) =>
  db.collection('users').onSnapshot(snapshot => {
    let members = {}
    snapshot.forEach(doc => {
      members[doc.id] = doc.data()
    })
    store.setState({ members: { ...store.getState().members, ...members } })
  })

export const syncAuth = (db, store) =>
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      db.collection('users')
        .doc(user.uid)
        .get()
        .then(doc => {
          store.setState({
            user: {
              email: user.email,
              isAnonymous: user.isAnonymous,
              uid: user.uid,
              ...doc.data(),
            },
          })
        })
    } else {
      store.setState({ user: null })
    }
  })
