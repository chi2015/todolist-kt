import firebase from 'firebase/app'
import 'firebase/firestore'

const db = firebase.initializeApp({ projectId: "todolist-kt" }).firestore()

export default db