import React from "react";

import JoinedChatsList from "../JoinedChatsList";
import AvailableChatsList from "../AvailableChatsList";
import ViewTitle from "../shared/ViewTitle";

const Home = () => {
  return (
    <div className="row no-gutters fh">
      <div className="col-3 fh">
        <JoinedChatsList/>
      </div>
      <div className="col-9 fh">
          <ViewTitle/>
        <div className="container-fluid">
            <AvailableChatsList/>
        </div>
      </div>
    </div>
  )
}

export default Home
