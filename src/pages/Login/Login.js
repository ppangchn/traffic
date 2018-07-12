import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, Input, FormFeedback, ModalFooter } from 'reactstrap'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import './Login.css'

const Container = styled.div`
	width: 100vw;
	height: 100vh;
	background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
background-color: white;
`
export default class Login extends Component {
	constructor(props) {
		super(props)
		this.state = {
			email: '',
			password: '',
			// invalidpassword: false,
			invalidemail: false
		}
	}

	handleInputChange = e => {
		const { name, value } = e.target
		this.setState({ [name]: value })
	}

	render() {
		return (
			<Container>
				<div style={{display: 'flex', flexDirection: 'column' ,textAlign: 'center'}}>
				traffic.
					<div className="ipp">
						<input
							style={{ fontSize: '8px !important' }}
							name="email"
							className="inputform"
							type="email"
							placeholder="example@pirsquare.net"
							onChange={this.handleInputChange}
							value={this.state.email}
							invalid={this.state.invalidemail}
							required
						/>
					</div>
					<div className="ipp">
						<input
							className="inputform"
							style={{ fontSize: '8px !important' }}
							name="password"
							type="password"
							placeholder="Password"
							onChange={this.handleInputChange}
							value={this.state.password}
							invalid={this.state.invalidpassword}
						/>
					</div>
					<Button color="submit" size="lg" block>
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
