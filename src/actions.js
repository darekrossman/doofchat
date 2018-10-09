import firebase from 'firebase'

const db = firebase.firestore()

export default store => {
  const actions = {
    createMessage(state, { message }) {
      const messageRef = db.collection('messages').doc()
      const userRef = db.collection('users').doc(state.user.uid)

      const messagePayload = {
        message,
        user: state.user.uid,
        timestamp: Date.now(),
      }

      messageRef.set(messagePayload)
      userRef.update({
        messages: firebase.firestore.FieldValue.arrayUnion(messageRef.id),
      })

      return {
        messages: { ...state.messages, [messageRef.id]: messagePayload },
      }
    },

    authenticate: async (state, { email, password }) => {
      return firebase.auth().signInWithEmailAndPassword(email, password)
    },

    createUser: async (state, { email, password, displayName }) => {
      const { user } = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)

      db.collection('users')
        .doc(user.uid)
        .set({ email, displayName })
    },

    updateUserProfile: async (state, { uid, ...data }) => {
      db.collection('users')
        .doc(uid)
        .update(data)
    },

    updateProfileImage: async (state, { dataURL, file }) => {
      const { uid } = state.user

      const snapshot = await firebase
        .storage()
        .ref()
        .child(`images/${uid}/avatar.${file.type.replace('image/', '')}`)
        .putString(dataURL, 'data_url')

      const photoURL = await snapshot.ref.getDownloadURL()

      return actions.updateUserProfile(state, { uid, photoURL })
    },
  }

  return actions
}
