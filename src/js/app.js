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
import {listenToAuthChanges} from './actions/auth'
import StoreProvider from "./store/StoreProvider";
import LoadingView from "./components/shared/LoadingView";

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

const ContentWrapper = ({children}) => <div className='content-wrapper'>{children}</div>

const ChatApp = () => {
  const dispatch = useDispatch()
  const isChecking = useSelector(({auth}) => auth.isChecking)
  useEffect(() => {
    dispatch(listenToAuthChanges())
  },[dispatch])

  if (isChecking) {
    return <LoadingView/>
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
