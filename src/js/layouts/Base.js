import React, {Fragment} from "react";
import Navbar from "../components/Navbar";

export default function BaseLayout({children, ...props}) {
  return (
    <Fragment>
      <Navbar {...props} />
      {children}
    </Fragment>
  )
}

function getDisplayName(Component) {
  return Component.name || Component.displayName || 'Component'
}

export const withBaseLayout = (Component, config) => {
  return (props) => {
    return (
      <Fragment>
        <Navbar {...config} view={getDisplayName(Component)}/>
        <Component {...props}/>
      </Fragment>
    )
  }
}
