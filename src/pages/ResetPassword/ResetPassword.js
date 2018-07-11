import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { Button, Modal, ModalHeader, ModalBody, Input, FormFeedback, ModalFooter } from 'reactstrap'
import { Link } from 'react-router-dom'
import './ResetPassword.css'
import { Key } from 'styled-icons/fa-solid/Key'

const KeyReset = Key.extend`
	width: 100px;
	height: 100px;
	color: #5bc2e1;
`

export default class ResetPassword extends Component {
	constructor(props) {
		super(props)
	}
	render() {
		return (
			<Container>
				<KeyReset />
				<br />
				ResetPassword <br />
				Please enter your new Password
				<Row className="btsave">
					<Col>
						{/* <Input placeholder="example@pirsquare.net"/> */}
						<Input
							style={{ fontSize: '8px !important' }}
							name="name"
							type="password"
							style={{ backgroundColor: '#f1f1f1' }}
							placeholder="New Password"
							// onChange={this.handleInputChangeEmail}
							// value={this.state.email}
							// invalid={this.state.invalidemail}
						/>
					</Col>
				</Row>
				<Row className="btsave">
					<Col>
						{/* <Input placeholder="example@pirsquare.net"/> */}
						<Input
							style={{ fontSize: '8px !important' }}
							name="password"
							type="password"
							style={{ backgroundColor: '#f1f1f1' }}
							placeholder="Confirm Password"
							// onChange={this.handleInputChangeEmail}
							// value={this.state.email}
							// invalid={this.state.invalidemail}
						/>
					</Col>
				</Row>
				<Row className="btsave">
					<Col>
						<Button color="5bc2e1" size="lg" block>
							Submit
						</Button>
					</Col>
				</Row>
			</Container>
		)
	}
}
