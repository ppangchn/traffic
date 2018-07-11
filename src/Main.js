import React, { Component } from 'react'
import styled from 'styled-components'
import MainRoute from './routes/MainRoute'
import Header from './components/Header/Header'
// import { Container } from 'reactstrap'
class Main extends Component {
	constructor(props) {
		super(props)
	}
	render() {
		return (
			<div>
				<Header updateHeader={this.props.updateHeader} />
				<MainRoute updateHeader={this.props.updateHeader} />
			</div>
		)
	}
}
export default Main
