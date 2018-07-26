import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Main from './Main'
import { Switch, Route, withRouter } from 'react-router-dom'
import Login from './pages/Login/Login'
import ResetPassword from './pages/ResetPassword/ResetPassword'
import ForgotPass from './pages/ForgotPass/ForgotPass'
import styled from 'styled-components'

class App extends Component {
  constructor() {
    super()
    this.state = {
      update: Date.now()
    }
  }
  updateHeader() {
    this.setState({ update: Date.now() })
  }
  render() {
    return (
        <Router basename={'/traffic-app/build'}>
          <Switch>
            <Route exact path="/" component={withRouter(Login)} />
            <Route
              exact
              path="/resetpassword/:token"
              component={withRouter(ResetPassword)}
            />
            <Route
              exact
              path="/forgotpass"
              component={withRouter(ForgotPass)}
            />
            <Main updateHeader={() => this.updateHeader()} />
          </Switch>
        </Router>
    )
  }
}

export default App
