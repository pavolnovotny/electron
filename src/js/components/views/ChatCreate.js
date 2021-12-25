import React from "react";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from 'react-router-dom'

import {withBaseLayout} from "../../layouts/Base";
import {createChat} from "../../actions/chats";

function ChatCreate() {
  const history = useHistory()
  const {register, handleSubmit} = useForm()
  const dispatch = useDispatch()
  const user = useSelector(({auth}) => auth.user)

  const onSubmit = data => {
    dispatch(createChat(data, user.uid))
      .then(_ => history.push('/'))
  }

  return (
    <div className="centered-view">
      <div className="centered-container">
        <form onSubmit={handleSubmit(onSubmit)} className="centered-container-form">
          <div className="header">Create chat now!</div>
          <div className="subheader">Chat with people you know!</div>
          <div className="form-container">
            <div className="form-group">
              <label htmlFor="email">Name</label>
              <input
                ref={register}
                type="text"
                className="form-control"
                id="name"
                name="name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Description</label>
              <textarea
                ref={register}
                name="description"
                className="form-control"
                id="description" >
              </textarea>
            </div>
            <div className="form-group">
              <label htmlFor="email">Image</label>
              <input
                ref={register}
                type="text"
                className="form-control"
                id="image"
                name="image"
              />
            </div>
            <button type="submit" className="btn btn-outline-primary">Create</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default withBaseLayout(ChatCreate,{canGoBack: true})
