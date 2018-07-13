import React, { Component } from 'react'
import { MoreHoriz } from 'styled-icons/material/MoreHoriz'
import {
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	ButtonDropdown,
	Card,
	CardTitle,
	Col
} from 'reactstrap'
import axios from 'axios'
import '../../pages/Setting/Setting.css'
import './UserSetting.css'
import DeleteMember from './DeleteMember'
import AddMember from '../../pages/AddMember/AddMember'

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
			users: [],
			editmember: false
		}
		this.toggleModalDelete = this.toggleModalDelete.bind(this)
	}

	toggle() {
		this.setState({
			dropdownOpen: !this.state.dropdownOpen
		})
	}

	toggleModalDelete() {
		this.setState({ modalDeleteOpen: !this.state.modalDeleteOpen })
	}
	toggleEditMember(state) {
		console.log('toggle!')
		this.setState({ editmember: state })
	}
	async deleteUser() {
		try {
			await axios
				.delete(`http://dev.pirsquare.net:3013/traffic-api/users/${this.props.users.id}`)
				.then(console.log('delete success!'), this.toggleModalDelete())
			this.props.getData()
		} catch (error) {
			console.log('cant delete user at DeleteUser', error)
		}
	}

	render() {
		const { users, roles, tags } = this.props
		return (
			<Col md={4} sm={4}  className="mb-4" key={users.id}>
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
									<div className="editmembercontainer"><Editt /></div>
								</DropdownToggle>
								<DropdownMenu className="dropdown-menu">
									<DropdownItem
										className="dropdownitem"
										style={{
											borderBottom: '1px solid #5bc2e1',
											borderRadius: '0.2rem 0.2rem 0 0'
										}}
									>
										<div onClick={() => this.toggleEditMember(true)}>Edit Member</div>
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
						<div style={{ display: 'flex', flexDirection: 'row' ,flexWrap: 'wrap' }}>
							<div className="persontag">{roles.name} </div>
							{tags.map(tag => {
								return <div key={tag.id} className="persontag">{tag.name}</div>
							})}
						</div>
				</Card>

				{this.state.modalDeleteOpen && (
					<DeleteMember toggle={this.toggleModalDelete} deleteUser={() => this.deleteUser()} name={users.name} />
				)}
				{this.state.editmember && (
					<AddMember
						getData={this.props.getData}
						id={this.props.id}
						onClose={() => {
							this.toggleEditMember(false)
						}}
					/>
				)}
			</Col>
		)
	}
}
