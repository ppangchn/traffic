import React, { Component } from 'react'

import { Container, TabContent, TabPane, Nav, NavItem, NavLink, Card, CardBody, Button, CardTitle, CardText, Row, Col } from 'reactstrap'
import classnames from 'classnames'
import './Setting.css'
import axios from 'axios'
import { PersonAdd } from 'styled-icons/material/PersonAdd'

// const PersonAdd = PersonAdd.extend`
// 	width: 1.5rem;
// 	height: 1.5rem;
// 	color: white;
// 	display: inline-block;
// 	border-radius: 25%;
// `

class Setting extends Component {
	constructor(props) {
		super(props)
		this.state = {
			activeTab: '0',
			users: []
		}
	}

	toggle = tab => {
		if (this.state.activeTab !== tab) {
			this.setState({
				activeTab: tab
			})
			switch (tab) {
				case '1':
					return this.fetchData('http://dev.pirsquare.net:3013/traffic-api/users')
				case '2':
					return this.fetchData('http://dev.pirsquare.net:3013/traffic-api/users/pm')
				case '3':
					return this.fetchData('http://dev.pirsquare.net:3013/traffic-api/users/pd')
				default:
					return this.fetchData('http://dev.pirsquare.net:3013/traffic-api/users')
			}
		}
	}

	fetchData = url => {
		axios.get(url).then(res => {
			const { data } = res
			console.log('Data Users', data)
			this.setState({ users: data })
		})
	}

	componentDidMount() {
		console.log('toggle 1')
		this.toggle('1')
	}

	render() {
		return (
			<Container className="mt-4">
				<Row>
					<Col md={12}>
						<Nav tabs>
							<NavItem>
								<NavLink
									className={classnames({ active: this.state.activeTab === '1' })}
									onClick={() => {
										this.toggle('1')
									}}
								>
									All
								</NavLink>
							</NavItem>

							<NavItem>
								<NavLink
									className={classnames({ active: this.state.activeTab === '2' })}
									onClick={() => {
										this.toggle('2')
									}}
								>
									Management
								</NavLink>
							</NavItem>

							<NavItem>
								<NavLink
									className={classnames({ active: this.state.activeTab === '3' })}
									onClick={() => {
										this.toggle('3')
									}}
								>
									Production
								</NavLink>
							</NavItem>
						</Nav>

						<TabContent activeTab={this.state.activeTab}>
							<TabPane tabId="1">
								<Row>
									{/* <Col sm={4} className="mb-2">
								<Card body>
									<CardTitle>Add</CardTitle>
									<CardText>All</CardText>
								</Card>
							</Col> */}
									<Col sm={4} className="h-150">
										{/* mb-2 */}
										<Card body>
											<CardText>
												<center>
													<PersonAdd height="110px" />
												</center>
											</CardText>
										</Card>
									</Col>

									{this.state.users.map(users => {
										return (
											<Col sm={4} className="mb-4" key={users.id}>
												<Card body className="h-150">
													<CardTitle>
														<div>{users.name}</div>
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
									})}
								</Row>
							</TabPane>

							<TabPane tabId="2">
								<Row>
									<Col sm={4} className="h-150">
										{/* mb-2 */}
										<Card body>
											<CardText>
												<center>
													<PersonAdd height="110px" />
												</center>
											</CardText>
										</Card>
									</Col>
									{this.state.users.map(usersPM => {
										return (
											<Col sm={4} className="mb-4" key={usersPM.id}>
												<Card body className="h-150">
													<CardTitle>
														<div>{usersPM.name}</div>
													</CardTitle>
													<CardText>
														<div style={{ display: 'flex', flexDirection: 'row' }}>
															<div className="persontag">{usersPM.roles.name} </div>
															<div className="persontag">{usersPM.tags}</div>
														</div>
													</CardText>
												</Card>
											</Col>
										)
									})}
								</Row>
							</TabPane>

							<TabPane tabId="3">
								<Row>
									<Col sm={4} className="h-150">
										{/* mb-2 */}
										<Card body>
											<CardText>
												<center>
													<PersonAdd height="110px" />
												</center>
											</CardText>
										</Card>
									</Col>
									{this.state.users.map(usersPD => {
										return (
											<Col sm={4} className="mb-4" key={usersPD.id}>
												<Card body className="h-150">
													<CardTitle>
														<div>{usersPD.name}</div>
													</CardTitle>
													<CardText>
														<div style={{ display: 'flex', flexDirection: 'row' }}>
															<div className="persontag">{usersPD.roles.name} </div>
															<div className="persontag">{usersPD.tags}</div>
														</div>
													</CardText>
												</Card>
											</Col>
										)
									})}
								</Row>
							</TabPane>
						</TabContent>
					</Col>
				</Row>
			</Container>
		)
	}
}

export default Setting
