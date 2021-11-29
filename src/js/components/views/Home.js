import React from "react";
import Navbar from "../Navbar";
import JoinedChats from "../JoinedChats";
import AvailableChats from "../AvailableChats";
import ViewTitle from "../shared/ViewTitle";

const Home = () => {
  return (
    <div className='content-wrapper'>
      <Navbar/>
      <div className="row no-gutters fh">
        <div className="col-3 fh">
          <JoinedChats/>
        </div>
        <div className="col-9 fh">
            <ViewTitle/>
          <div className="container-fluid">
              <AvailableChats/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
