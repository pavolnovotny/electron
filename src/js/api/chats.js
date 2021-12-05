import db from '../db/firestrore'

export const fetchChats = () => {
  return db
    .collection('chats')
    .get()
    .then((snapshot) => {
      const data = snapshot.docs.map(doc => {
        return doc.data()
      })

      return data
    })
}
