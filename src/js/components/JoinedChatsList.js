import React from "react";
import {useHistory} from "react-router-dom"

import ChatSearch from './ChatSearch'

const JoinedChatsList = ({chats}) => {
  const history = useHistory()
  return (
    <div className="list-container">
      <ChatSearch/>
      <ul className="items">
        {
          chats.map(chat => {
            return (<li
              key={chat.id}
              onClick={() => history.push(`/chat/${chat.id}`)}
              className="item">
              <div className="item-status">
                <img src={chat.image} alt="Retail Admin" />
                <span className="status online"></span>
              </div>
              <p className="name-time">
                <span className="name mr-2">{chat.name}</span>
              </p>
            </li>)
          })
        }
      </ul>
    </div>
  )
}
export default JoinedChatsList
