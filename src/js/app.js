import React from 'react'

import Home from "./components/views/Home";
import {
 HashRouter as Router,
 Switch,
 Route
} from 'react-router-dom'
import Navbar from "./components/Navbar";
import Settings from "./components/views/Register";
import Login from "./components/views/Login";
import Register from "./components/views/Settings";
import ChatView from "./components/views/Chat"

const App = () => {
 return (
  <Router>
     <Navbar/>
     <div className='content-wrapper'>
      <Switch>
        <Route path="/chat">
          <ChatView/>
        </Route>
        <Route path="/settings">
          <Settings/>
        </Route>
        <Route path="/login">
          <Login/>
        </Route>
        <Route path="/register">
          <Register/>
        </Route>
        <Route path="/">
          <Home/>
        </Route>
      </Switch>
    </div>
  </Router>
 )
}

export default App
