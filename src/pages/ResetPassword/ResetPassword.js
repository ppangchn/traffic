import React, { Component } from 'react'
import { Form, Button, Modal, ModalHeader, ModalBody, Input, FormFeedback, ModalFooter } from 'reactstrap'
import { Link } from 'react-router-dom'
import './ResetPassword.css'
import { Key } from 'styled-icons/fa-solid/Key'
import styled from 'styled-components'
import url from '../../url'
import axios from 'axios'

const KeyReset = Key.extend`
	width: 50px;
	height: 50px;
	color: #5bc2e1;
`
const Container = styled.div`
width: 100vw
height: 100vh
display: flex;
    align-items: center;
    justify-content: center;
	background-color: white;
`
export default class ResetPassword extends Component {
	constructor(props) {
		super(props)
		this.state = {
			token: '',
			fpass: '',
			spass: '',
			massage: ''
		}
	}

	submit = e => {
		e.preventDefault()
		try {
			const data = {
				resetToken: this.state.token,
				password: this.state.spass
			}
			if (this.state.fpass.length > 5 && this.state.spass.length > 5) {
				if (this.state.fpass == this.state.spass) {
					// axios.post(`${url}/users/resetpass`, data)
					this.props.history.push(`/`)
				} else {
					this.setState({ massage: 'Please fill in the same password' })
				}
			} else {
				this.setState({ massage: 'Password should contain at least 6 characters' })
			}
		} catch (error) {}
	}

	handleInputChange = e => {
		const { name, value } = e.target
		this.setState({ [name]: value })
		this.setState({ massage: '' })
		console.log({ [name]: value })
	}

	componentDidMount = () => {
		if (this.props.match.params.token) {
			this.setState({ token: this.props.match.params.token })
		}
	}
	render() {
		return (
			<Container>
				<div class="resetblock">
					<KeyReset />
					<br />
					ResetPassword <br />
					<div class="please">Please enter your new password</div>
					{/* <Input placeholder="example@pirsquare.net"/> */}
					<Form onSubmit={this.submit}>
						<input
							style={{ fontSize: '8px !important' }}
							name="fpass"
							type="password"
							className="inputform"
							placeholder="New Password"
							onChange={this.handleInputChange}
							value={this.state.fpass}
						/>
						<input
							style={{ fontSize: '8px !important' }}
							name="spass"
							type="password"
							className="inputform"
							placeholder="Confirm Password"
							onChange={this.handleInputChange}
							value={this.state.spass}
						/>
						<Button color="submit" size="lg" block>
							Submit
						</Button>
					</Form>
					<div className="err">{this.state.massage}</div>
				</div>
			</Container>
		)
	}
}
