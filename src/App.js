import React, { Component } from 'react'
import Header from './components/Header/Header'
import { BrowserRouter as Router } from 'react-router-dom'
import Main from './Main'
import styled from 'styled-components'

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
				<div>
					<Header update={this.state.update}/>
					<Main updateHeader={() => this.updateHeader()}/>
				</div>
			</Router>
		)
	}
}

export default App
