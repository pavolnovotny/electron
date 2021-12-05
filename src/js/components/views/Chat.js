import React from 'react';
import {useParams} from 'react-router-dom'

import ChatUserList from '../ChatMessagesList';
import ChatMessagesList from '../ChatMessagesList';
import ViewTitle from '../shared/ViewTitle';

export default function Chat() {
  const {id} = useParams()

  return (
    <div className="row no-gutters fh">
      <div className="col-3 fh">
        <ChatUserList />
      </div>
      <div className="col-9 fh">
        <ViewTitle text={`Joined channel: ${id}`} />
        <ChatMessagesList />
      </div>
    </div>
  )
}
