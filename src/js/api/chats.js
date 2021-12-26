import db from '../db/firestrore';
import firebase from 'firebase/app'

export const fetchChats = () =>
  db
    .collection('chats')
    .get()
    .then(snapshot =>
      snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
    )

export const createChat = chat =>
  db
    .collection('chats')
    .add(chat)
    .then(docRef => docRef.id)

export const joinChat = async (userId, chatId) => {
    const userRef = db.doc(`profiles/${userId}`)
    const chatRef = db.doc(`chats/${chatId}`)

    await userRef.update({joinedChats: firebase.firestore.FieldValue.arrayUnion(chatRef)})
    await chatRef.update({joinedUsers: firebase.firestore.FieldValue.arrayUnion(userRef)})
}

export const subscribeToChat = (chatId, onSubscribe) => {
    return db
      .collection('chats')
      .doc(chatId)
      .onSnapshot(snapshot => {
          const chat = {id: snapshot.id, ...snapshot.data()}
          onSubscribe(chat)
      })
}
