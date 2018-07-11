import React, { Component } from 'react'
import Header from './components/Header/Header'
import { BrowserRouter as Router } from 'react-router-dom'
import Main from './Main'
import styled from 'styled-components'
import { Switch, Route, withRouter } from 'react-router-dom'
import Login from './pages/Login/Login';
import ResetPassword from './pages/ResetPassword/ResetPassword'

const Container = styled.div`
	width: 100%;
	height: 100%;
`
class App extends Component {
	constructor() {
		super();
		this.state = {update: Date.now()}
	}
	updateHeader() {
		this.setState({update: Date.now()})
	}
	render() {
		return (
			<Router basename={'/traffic-app/build'}>
			
				<Switch>
				{/* <div> */}
					<Route exact path="/login" component={withRouter(Login)} />
					<Route exact path="/resetpassword" component={withRouter(ResetPassword)} />
					<Main updateHeader={() => this.updateHeader()}/>
					{/* </div> */}
				</Switch>
			</Router>
		)
	}
}

export default App
