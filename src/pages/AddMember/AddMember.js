import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Input,
  FormFeedback
} from 'reactstrap'
import SelectPm from '../../components/AddProject/SelectPm'
import 'react-select/dist/react-select.css'
import axios from 'axios'
import 'rc-slider/assets/index.css'
import './AddMember.css'
import { Link, withRouter } from 'react-router-dom'

export default class AddMember extends Component {
	render() {
		const { onClose } = this.props
		return (
			<Container>
				{/* {console.log('invalid',this.state.invalid)} */}
				<Modal style={{ fontSize: '1rem' }} size="5" isOpen={this.state.open} toggle={onClose} onExit={() => this.clear()}>
					<ModalHeader toggle={onClose}>New Member</ModalHeader>
					<ModalBody>
						<Container>
							<Row>
								<Col>
									Name
									<Input
										style={{ fontSize: '8px !important' }}
										name="Project manager name"
										style={{ backgroundColor: '#f1f1f1' }}
										invalid={this.state.invalid}
										placeholder="Type your name"
										onChange={this.handleInputChange}
									/>
									<FormFeedback tooltip>Can't send empty name!</FormFeedback>
								</Col>
							</Row>

							<Row>
								<Col xs="4" md="4">
									Roles
								</Col>
							</Row>
							{this.state.pm.map((pm, index) => (
								<SelectPm
									id={index} //start at 0
									listpm={this.state.listpm}
									setPm={this.setPm}
									delete={this.deletePm}
								/>
							))}
							<Row>
								<Col
									style={{
										color: '#da3849',
										fontSize: '80%',
										marginBottom: '10px'
									}}
								>
									{this.state.invalidpm}
								</Col>
							</Row>
							<Col>
								Tags
								<Input
									style={{ fontSize: '8px !important' }}
									name="Tags"
									style={{ backgroundColor: '#f1f1f1' }}
									invalid={this.state.invalid}
									placeholder="Type your name"
									onChange={this.handleInputChange}
								/>
								<FormFeedback tooltip>Can't send empty name!</FormFeedback>
							</Col>
							<Row />
							<Row>
								<Col>
									<Link className="savelink" to={this.state.projectname && this.state.filteredPM && `/project/${this.state.size}`}>
										<Button
											color="5bc2e1"
											size="lg"
											block
											onClick={() => {
												this.sendData(), this.toggleSave()
												// ,this.props.isSaved(true)
											}}
										>
											Save
										</Button>
									</Link>
								</Col>
							</Row>
						</Container>
					</ModalBody>
				</Modal>
			</Container>
		)
	}
}
