import React, { Component } from 'react'
import styled from 'styled-components'
import MainRoute from './routes/MainRoute'
// import { Container } from 'reactstrap'
class Main extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
				<MainRoute updateHeader={this.props.updateHeader}/>
		)
	}
}
export default Main
