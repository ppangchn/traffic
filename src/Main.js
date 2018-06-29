import React, { Component } from 'react'
import styled from 'styled-components'
import MainRoute from './routes/MainRoute'
import { Container } from 'reactstrap'

class Main extends Component {
	render() {
		return (
			<Container>
				<MainRoute />
			</Container>
		)
	}
}
export default Main
