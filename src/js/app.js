import React, {useEffect} from 'react'
import {Provider} from "react-redux";

import Home from "./components/views/Home";
import {
 HashRouter as Router,
 Switch,
 Route
} from 'react-router-dom'
import Navbar from "./components/Navbar";
import Settings from "./components/views/Register";
import Welcome from "./components/views/Welcome";
import ChatView from "./components/views/Chat"
import {listenToAuthChanges} from './actions/auth'

import configureStore from "./store";

const store = configureStore()

const App = () => {
  useEffect(() => {
    store.dispatch(listenToAuthChanges())
  },[])

 return (
   <Provider store={store}>
     <Router>
       <Navbar />
       <div className='content-wrapper'>
         <Switch>
           <Route path="/" exact>
             <Welcome />
           </Route>
           <Route path="/home">
             <Home />
           </Route>
           <Route path="/chat/:id">
             <ChatView />
           </Route>
           <Route path="/settings">
             <Settings />
           </Route>
         </Switch>
       </div>
     </Router>
   </Provider>
 )
}

export default App
