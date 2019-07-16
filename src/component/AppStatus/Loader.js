import React from "react"

import "../../assets/styles/component/app-status/loader.css"

class Loader extends React.Component {
  render() {
    return (
      <div className="loader">
        <div></div>
        <div></div>
        <div></div>
      </div>
    )
  }
}

export default Loader