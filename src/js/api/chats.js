import db from '../db/firestrore';

export const fetchChats = () =>
  db
    .collection('chats')
    .get()
    .then(snapshot =>
      snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
    )
