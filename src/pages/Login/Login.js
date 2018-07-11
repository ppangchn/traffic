import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, Input, FormFeedback, ModalFooter } from 'reactstrap'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import './Login.css'

const Container = styled.div`
	width: 100vw;
	height: 100vh;
	background-color: white;
`
export default class Login extends Component {
	render() {
		return (
			<Container>
				<div class="loginblock">
					traffic.
					{/* <Input placeholder="example@pirsquare.net"/> */}
					<Input
						style={{ fontSize: '8px !important' }}
            name="name"
            className="btsave"
						type="email"
						style={{ backgroundColor: '#f1f1f1' }}
						placeholder="example@pirsquare.net"
						// onChange={this.handleInputChangeEmail}
						// value={this.state.email}
						// invalid={this.state.invalidemail}
					/>
					{/* <Input placeholder="example@pirsquare.net"/> */}
					<Input
            style={{ fontSize: '8px !important' }}
						name="password"
						type="password"
						style={{ backgroundColor: '#f1f1f1' }}
						placeholder="Password"
						// onChange={this.handleInputChangeEmail}
						// value={this.state.email}
						// invalid={this.state.invalidemail}
					/>
					<Button color="5bc2e1" size="lg" block>
						Sign In
					</Button>
					<div>
						<Link to="/about" className="a">
							Forgot password?
						</Link>
					</div>
				</div>
			</Container>
		)
	}
}
