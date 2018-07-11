import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { Button, Modal, ModalHeader, ModalBody, Input, FormFeedback, ModalFooter } from 'reactstrap'
import { Link } from 'react-router-dom'
import './Login.css'

export default class Login extends Component {
	render() {
		return (
			<Container>
        	traffic.
				<Row className="btsave">
				
					<Col>
						{/* <Input placeholder="example@pirsquare.net"/> */}
						<Input
							style={{ fontSize: '8px !important' }}
							name="name"
							type="email"
							style={{ backgroundColor: '#f1f1f1' }}
							placeholder="example@pirsquare.net"
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
							placeholder="Password"
							// onChange={this.handleInputChangeEmail}
							// value={this.state.email}
							// invalid={this.state.invalidemail}
						/>
					</Col>
				</Row>

				<Row className="btsave">
					<Col>
						<Button color="5bc2e1" size="lg" block>
							Sign In
						</Button>
					</Col>
				</Row>
				<Row className="btsave">
					<Link to="/about">Forgot password?</Link>
				</Row>
			</Container>
		)
	}
}
