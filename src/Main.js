import React, { Component } from 'react'
import styled from 'styled-components'
import MainRoute from './routes/MainRoute'
// import { Container } from 'reactstrap'
const Container = styled.div`
    overflow: hidden;
    display: flex;
    flex-direction: row;
`
class Main extends Component {
	render() {
		return (
				<MainRoute />
		)
	}
}
export default Main
