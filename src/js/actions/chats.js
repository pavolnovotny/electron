import * as api from '../api/chats';
import db from '../db/firestrore'

export const fetchChats = () => async (dispatch, getState) => {
  const {user} = getState().auth
  dispatch({type: 'CHATS_FETCH_INIT'})
  const chats = await api.fetchChats()

  chats.forEach(chat => {
    chat.joinedUsers = chat.joinedUsers.map(user => user.id)
  })

  const sortedChats = chats.reduce((accuChats, chat) => {
    const chatToJoin = chat.joinedUsers.includes(user.uid) ?
      'joined' : 'available'
    accuChats[chatToJoin].push(chat)

    return accuChats
  }, {joined: [], available: []})

  dispatch({
    type: 'CHATS_FETCH_SUCCESS',
    ...sortedChats
  })
  return sortedChats
}


export const createChat = (formData, userId) => async dispatch => {
  const newChat = {...formData}
  newChat.admin = db.doc(`profiles/${userId}`)

  const chatId = await api.createChat(newChat)
  dispatch({type: 'CHATS_CREATE_SUCCESS'})
  await api.joinChat(userId, chatId)
  dispatch({type: 'CHATS_JOIN_SUCCESS'})

  return chatId
}

//https://banner2.cleanpng.com/20180627/qvc/kisspng-the-legend-of-zelda-majora-s-mask-discord-compute-discord-icon-5b3371b7b55eb4.6840271215300981037429.jpg
