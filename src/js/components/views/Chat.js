import React, {useEffect, useRef, useCallback} from 'react';
import {useParams} from 'react-router-dom'
import {useSelector, useDispatch} from "react-redux";

import ChatUserList from '../ChatUsersList';
import ChatMessagesList from '../ChatMessagesList';
import ViewTitle from '../shared/ViewTitle';
import {withBaseLayout} from "../../layouts/Base";
import {subscribeToChat, subscribeToProfile} from "../../actions/chats";
import LoadingView from "../shared/LoadingView";

function Chat() {
  const dispatch = useDispatch()
  const {id} = useParams()
  const peopleWatchers = useRef({})
  const activeChat = useSelector(({chats}) => chats.activeChats[id])
  const joinedUser = activeChat?.joinedUsers

  useEffect(()=> {
    const unsubFromChat = dispatch(subscribeToChat(id))
    return () => {
      unsubFromChat()
      unsubFromJoinedUsers()
    }
  },[])

  useEffect(() => {
    joinedUser && subscribeToJoinedUsers(joinedUser)
  },[joinedUser])

  const subscribeToJoinedUsers = useCallback(jUsers => {
    jUsers.forEach(user => {
      if (!peopleWatchers.current[user.uid]) {
        peopleWatchers.current[user.uid] = dispatch(subscribeToProfile(user.uid, id))
      }
    })
  },[])

  const unsubFromJoinedUsers = useCallback(() => {
    Object.keys(peopleWatchers.current)
      .forEach(id => peopleWatchers.current[id]())
  },[])

  if (!activeChat?.id) {
    return <LoadingView message="Loading ..." />
  }

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
