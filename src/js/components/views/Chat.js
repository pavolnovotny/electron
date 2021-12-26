import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom'
import {useSelector, useDispatch} from "react-redux";

import ChatUserList from '../ChatUsersList';
import ChatMessagesList from '../ChatMessagesList';
import ViewTitle from '../shared/ViewTitle';
import {withBaseLayout} from "../../layouts/Base";
import {subscribeToChat} from "../../actions/chats";

function Chat() {
  const dispatch = useDispatch()
  const {id} = useParams()
  const activeChat = useSelector(({chats}) => {
    return  chats.activeChats[id]
  })

  useEffect(()=> {
    const unsubFromChat = dispatch(subscribeToChat(id))
    return () => {
      unsubFromChat()
    }
  },[])
  return (
    <div className="row no-gutters fh">
      <div className="col-3 fh">
        <ChatUserList users={activeChat?.joinedUsers}/>
      </div>
      <div className="col-9 fh">
        { activeChat?.name && <ViewTitle text={`Joined channel: ${activeChat?.name}`} />}
        <ChatMessagesList />
      </div>
    </div>
  )
}

export default withBaseLayout(Chat, {canGoBack: true})
