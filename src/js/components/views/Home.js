import React, {useEffect} from "react";
import { Link } from "react-router-dom";

import JoinedChatsList from "../JoinedChatsList";
import AvailableChatsList from "../AvailableChatsList";
import ViewTitle from "../shared/ViewTitle";

import {useDispatch, useSelector} from 'react-redux'

import { fetchChats } from "../../actions/chats";
import {withBaseLayout} from "../../layouts/Base";
import Notification from '../../utils/notifications'


const Home = () => {
  const dispatch = useDispatch()
  const chats = useSelector(({chats}) => chats.items)

  useEffect(() => {
    Notification.setup()
    dispatch(fetchChats())
  }, [dispatch])

  return (
    <div className="row no-gutters fh">
      <div className="col-3 fh">
        <JoinedChatsList chats={chats}/>
      </div>
      <div className="col-9 fh">
        <ViewTitle text="Choose your channel">
         <Link
           className="btn btn-outline-primary"
           to="/chatCreate">
           New
         </Link>
        </ViewTitle>
        <div className="container-fluid">
          <AvailableChatsList chats={chats}/>
        </div>
      </div>
    </div>
  )
}

export default withBaseLayout(Home)
