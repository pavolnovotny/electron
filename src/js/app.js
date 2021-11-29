import React, {Fragment} from 'react'

const App = () => {
  const sendNotification = () => {
    e_notification.sendNotification('My custom message')
  }

  return (
    <Fragment>
      <h1>Hello World</h1>
      <button onClick={sendNotification}>Send Notification</button>
    </Fragment>

  )
}

export default App
