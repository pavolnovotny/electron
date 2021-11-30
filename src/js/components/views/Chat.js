import React from 'react';

import ChatUserList from '../ChatMessagesList';
import ChatMessagesList from '../ChatMessagesList';
import ViewTitle from '../shared/ViewTitle';

export default function Chat() {


  return (
    <div className="row no-gutters fh">
      <div className="col-3 fh">
        <ChatUserList />
      </div>
      <div className="col-9 fh">
        <ViewTitle />
        <ChatMessagesList />
      </div>
    </div>
  )
}
