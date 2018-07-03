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
	Col
} from 'reactstrap'
import { Link } from 'react-router-dom'
import '../../pages/Setting/Setting.css'

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
			btnDropright: false
		}
	}

	toggle() {
		this.setState({
			dropdownOpen: !this.state.dropdownOpen
		})
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
									<Link to="/project" style={{ textDecoration: 'none' }}>
										<DropdownItem
											className="dropdowndeleteitem"
											style={{
												color: '#f67879',
												borderRadius: '0 0 0.2rem 0.2rem'
											}}
										>
											Delete
										</DropdownItem>
									</Link>
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
			</Col>
		)
	}
}
