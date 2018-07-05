import React, { Component } from 'react'
import { MoreHoriz } from 'styled-icons/material/MoreHoriz'
import {
	DropdownToggle,
	Edit,
	DropdownMenu,
	DropdownItem,
	ButtonDropdown,
	Container,
	TabContent,
	TabPane,
	Nav,
	NavItem,
	NavLink,
	Card,
	CardBody,
	Button,
	CardTitle,
	CardText,
	Row,
	Col,
	Modal,
	ModalBody,
	ModalHeader,
	ModalFooter
} from 'reactstrap'
import axios from 'axios'

import { Link } from 'react-router-dom'
import '../../pages/Setting/Setting.css'
import DeleteMember from './DeleteMember'

const Editt = MoreHoriz.extend`
	color: #5bc2e1;
	width: 1.5625rem;
	height: 1.5625rem;
`

export default class UserSettings extends Component {
	constructor(props) {
		super(props)
		this.state = {
			dropdownOpen: false,
			btnDropright: false,
			modalDeleteOpen: false,
			users: []
		}
		this.deleteMember = this.deleteMember.bind(this)
		// this.toggleModal = this.toggleModal.bind(this)
		this.toggleModalDelete = this.toggleModalDelete.bind(this)
	}

	toggle() {
		this.setState({
			dropdownOpen: !this.state.dropdownOpen
		})
	}

	toggleModalDelete() {
		this.setState({ modalDeleteOpen: !this.state.modalDeleteOpen})
	}

	deleteMember() {
		try {
			axios.delete(`http://dev.pirsquare.net:3013/traffic-api/users/${this.props.id}`).then(res => {
				// window.history.back()
			})
		} catch (error) {
			console.log('fail to delete project at EachProjectSidebar', error)
		}
	}

	render() {
		const { users } = this.props
		return (
			<Col sm={4} className="mb-4" key={users.id}>
				<Card body className="h-150">
					<CardTitle>
						<div className="font">
							{users.name}

							<ButtonDropdown
								className="btn-secondary"
								isOpen={this.state.btnDropright}
								toggle={() => {
									this.setState({ btnDropright: !this.state.btnDropright })
								}}
							>
								

								<DropdownToggle>
									<Editt />
								</DropdownToggle>
								<DropdownMenu className="dropdown-menu">
									<DropdownItem
										className="dropdownitem"
										style={{
											borderBottom: '1px solid #5bc2e1',
											borderRadius: '0.2rem 0.2rem 0 0'
										}}
									>
										<div>Edit Member</div>
									</DropdownItem>

									{/* <Link to="/project" style={{ textDecoration: 'none' }}> */}
									<DropdownItem
										className="dropdowndeleteitem"
										style={{
											color: '#f67879',
											borderRadius: '0 0 0.2rem 0.2rem'
										}}
										onClick={this.toggleModalDelete}
									>
										<div>Delete</div>
										{/* <DeleteMember id={users.id} name={users.name} /> */}
									</DropdownItem>
									{/* </Link> */}
								</DropdownMenu>
							</ButtonDropdown>
						</div>
					</CardTitle>
					<CardText>
						<div style={{ display: 'flex', flexDirection: 'row' }}>
							<div className="persontag">{users.roles.name} </div>
							<div className="persontag">{users.tags}</div>
						</div>
					</CardText>
				</Card>

				{this.state.modalDeleteOpen && <DeleteMember id={users.id} name={users.name} />
					// <Modal
					// 	isOpen={this.state.modalDeleteOpen}
					// 	toggle={this.toggleModalDelete}
					// 	centered={true}
					// 	// className={this.props.className}
					// >
					// 	<ModalHeader toggle={this.toggleModalDelete} style={{ color: '#da3849' }}>
					// 		Confirm Delete
					// 	</ModalHeader>
					// 	<ModalBody style={{ display: 'flex' }}>
					// 		Are you sure you want to delete member
					// 		<div
					// 			style={{
					// 				color: '#da3849',
					// 				textOverflow: 'ellipsis',
					// 				overflow: 'hidden'
					// 			}}
					// 		>
					// 			&ensp;"{users.name}"
					// 		</div>
					// 	</ModalBody>
					// 	<ModalFooter>
					// 		<Button color="grey" onClick={this.toggleModalDelete}>
					// 			Cancel
					// 		</Button>
					// 		<Button color="danger" onClick={(this.toggleModalDelete, this.deleteMember)}>
					// 			Confirm
					// 		</Button>
					// 	</ModalFooter>
					// </Modal>
				}
				{/* {} */}
			</Col>
		)
	}
}
