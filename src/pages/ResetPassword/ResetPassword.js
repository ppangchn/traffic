import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, Input, FormFeedback, ModalFooter } from 'reactstrap'
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
			token: []
		}
	}

	componentDidMount = () => {
		// try {
		//   axios.get(`${url}/auth`).then(res => {
		//     const { data } = res
		//     console.log('Date Token', data)
		//     this.setState({ token: data })
		//   })
		// } catch (error) {
		//   console.log('fail ', error)
		// }
		if (this.props.match.params.token) {
			this.setState({ token: this.props.match.params.token })
		}
		console.log(this.props)
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
					<input
						style={{ fontSize: '8px !important' }}
						name="name"
						type="password"
						className="inputform"
						placeholder="New Password"
						// onChange={this.handleInputChangeEmail}
						// value={this.state.email}
						// invalid={this.state.invalidemail}
					/>
					{/* <Input placeholder="example@pirsquare.net"/> */}
					<input
						style={{ fontSize: '8px !important' }}
						name="password"
						type="password"
						className="inputform"
						placeholder="Confirm Password"
						// onChange={this.handleInputChangeEmail}
						// value={this.state.email}
						// invalid={this.state.invalidemail}
					/>
					<Button color="submit" size="lg" block>
						Submit
					</Button>
				</div>
			</Container>
		)
	}
}
