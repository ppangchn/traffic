import React, { Component } from 'react'
import { Button, Form, Modal, ModalHeader, ModalBody, Input, FormFeedback, ModalFooter } from 'reactstrap'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import '../Login/Login'
import url from '../../url'
import axios from 'axios'
import { Lock } from 'styled-icons/material/Lock'

const KeyReset = Lock.extend`
	width: 100px;
	height: 100px;
	color: #5bc2e1;
`

const Container = styled.div`
	width: 100vw;
	height: 100vh;
	background-color: white;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: white;
`
export default class ForgotPass extends Component {
	constructor(props) {
		super(props)
		this.state = {
			email: '',
			invalidemail: false,
			message: ''
		}

		// this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleInputChange = e => {
		const { name, value } = e.target
		this.setState({ [name]: value })
		this.setState({ message: '' })
	}

	handleSubmit = e => {
		try {
			const data = {
				email: this.state.email
			}

			if (this.state.email) {
				try {
					axios.post(`${url}/users/forgotpass`, data).then($res => {
						const { data } = $res
						this.setState({ message: data.message })
						if (data.message!="Email not found!") {
							this.props.history.push(`/`)
						}
					})
				} catch (error) {
					console.log('cant send email', error)
				}
			} else {
				console.log('cant sned mail!')
			}

			e.preventDefault()
		} catch (error) {
			console.error('on error ->', error)
		}
	}

	render() {
		return (
			<Container>
				<div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
					<center>
						{' '}
						<KeyReset />
					</center>
					<br />
					Forgot Password?<br />
					<div class="des">
						We just need your registered email address
						<br />to send you password reset
					</div>
					<Form onSubmit={this.handleSubmit}>
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
						<Button color="submit" size="lg" block>
							Reset password
						</Button>
					</Form>
					<div className="err">{this.state.message}</div>
				</div>
			</Container>
		)
	}
}
