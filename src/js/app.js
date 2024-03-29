import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";

import Home from "./components/views/Home";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import Settings from "./components/views/Settings";
import Welcome from "./components/views/Welcome";
import ChatView from "./components/views/Chat"
import ChatCreate from "./components/views/ChatCreate";
import {listenToAuthChanges} from './actions/auth'
import StoreProvider from "./store/StoreProvider";
import LoadingView from "./components/shared/LoadingView";
import {listenToConnectionChanges} from "./actions/app";
import {checkUserConnection} from "./actions/connection";
import {loadInitialSettings} from "./actions/settings";

function AuthRoute ({children, ...rest}) {
  const user = useSelector(({auth}) => auth.user)
  const onlyChild = React.Children.only(children)
  return (
    <Route
      {...rest}
      render={(props) =>
        user ?
          React.cloneElement(onlyChild, {...rest, ...props}) :
          <Redirect to="/"/>
      }/>
  )
}

const ContentWrapper = ({children}) => {
  const isDarkTheme = useSelector(({settings}) => settings.isDarkTheme)
  return (
    <div className={`content-wrapper ${isDarkTheme ? 'dark' : 'light'}`}>{children}</div>
  )
} 

const ChatApp = () => {
  const dispatch = useDispatch()
  const isChecking = useSelector(({auth}) => auth.isChecking)
  const isOnline = useSelector(({app}) => app.isOnline)
  const user = useSelector(({auth}) => auth.user)

  useEffect(() => {
    dispatch(loadInitialSettings())
    const unsubFromAuth = dispatch(listenToAuthChanges())
    const unsubFromConnection = dispatch(listenToConnectionChanges())


    return () => {
      unsubFromAuth()
      unsubFromConnection()
      unsubFromUserConnection()
    }
  },[dispatch])

  useEffect(() => {
    let unsubFromUserConnection
    if (user?.uid) {
      unsubFromUserConnection = dispatch(checkUserConnection(user.uid))
    }

    return () => {
      unsubFromUserConnection && unsubFromUserConnection()
    }

  }, [dispatch, user])

  if (isChecking) {
    return <LoadingView/>
  }

  if (!isOnline) {
    return <LoadingView message="Application has been disconnected. Please reconnect."/>
  }

 return (
   <Router>
     <ContentWrapper>
       <Switch>
         <Route path="/" exact>
           <Welcome />
         </Route>
         <AuthRoute path="/home">
           <Home />
         </AuthRoute>
         <AuthRoute path="/chatCreate">
           <ChatCreate />
         </AuthRoute>
         <AuthRoute path="/chat/:id">
           <ChatView />
         </AuthRoute>
         <AuthRoute path="/settings">
           <Settings />
         </AuthRoute>
       </Switch>
     </ContentWrapper>
   </Router>
 )
}

export default function App () {
  return (
    <StoreProvider>
      <ChatApp/>
    </StoreProvider>
  )
}
