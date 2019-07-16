import React from "react"
import { connect } from 'react-redux'

import appActions from "../../config/stored/reducer/app/appActions"
import "../../assets/styles/component/app-status/error.css"

class Error extends React.Component {
  componentDidUpdate() {
    //Remove error goes here
    if (this.props.error.hasError)
      setTimeout(() => {
        this.props.dispatch(appActions.setError({hasError: false, message: ""}))
      }, 3000)
  }

  render() {
    return (
      <div className="error">
        <p>{this.props.error.message}</p>
      </div>
    )
  }
}

export default connect(store => ({ app: store.app }))(Error)