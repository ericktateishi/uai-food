import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { connect } from 'react-redux'

import Search from './routes/Search'
import Catalog from './routes/Catalog'
import Loader from './component/app-status/Loader'
import Error from './component/app-status/Error'

class App extends React.Component {

  render() {
    return (
      <Router>
        <div className="app">
          <Switch>
            <Route exact path="/" component={Search}/>
            <Route path="/catalog" component={Catalog}/>
          </Switch>
        </div>
        {
          this.props.app.loading
          && <Loader/>
        }
        {
          this.props.app.error && this.props.app.error.hasError
          && <Error error={this.props.app.error}/>
        }
      </Router>
      
    )
  }
}

const Connected = connect(store => ({ app: store.app }))(App)
export default Connected
