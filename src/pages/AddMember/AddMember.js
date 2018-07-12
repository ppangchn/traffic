import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { Button, Modal, ModalHeader, ModalBody, Input, FormFeedback, ModalFooter } from 'reactstrap'
import Select from 'react-select'
import 'react-select/dist/react-select.css'
import axios from 'axios'
import 'rc-slider/assets/index.css'
import './AddMember.css'
import './tag.css'
import { Link, withRouter } from 'react-router-dom'
import SelectRoles from './SelectRoles'
import url from '../../url'
import { WithContext as ReactTags } from 'react-tag-input'
import './AddMember.css'

const KeyCodes = {
	comma: 188,
	enter: 13
}

const delimiters = [KeyCodes.comma, KeyCodes.enter]

class AddMember extends Component {
	constructor(props) {
		super(props)
		this.state = {
			open: true,
			listroles: [],
			dropdownOpen: false,

			// tags: '',
			filteredROLES: [],
			id: null,
			roles: '',
			name: '',
			email: '',
			tags: [{ id: '1', name: 'pm' }, { id: '2', name: 'dev' }],
			suggestions: [
				{ id: '1', name: 'pm' },
				{ id: '2', name: 'dev' },
				{ id: '3', name: 'designer' },
				{ id: '4', name: 'ux' },
				{ id: '5', name: 'ui' },
				{ id: '6', name: 'pc' },
				{ id: '7', name: 'bd' },
				{ id: '8', name: 'node' },
				{ id: '9', name: 'react' },
				{ id: '10', name: 'angular' },
				{ id: '11', name: 'sa' },
				{ id: '12', name: 'php' },
				{ id: '13', name: 'android' },
				{ id: '14', name: 'ios' }
			],
			header: 'New Member',
			invalidname: false,
			invalidroles: false,
			invalidemail: false,
			invalidrolesmessage: 'Please select one role for this member.',
			sendResetPass: false
		}

		this.toggle = this.toggle.bind(this)
		this.toggledrop = this.toggledrop.bind(this)
		this.handleInputChange = this.handleInputChange.bind(this)
		this.handleInputChangeEmail = this.handleInputChangeEmail.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.handleInputChangeTags = this.handleInputChangeTags.bind(this)

		// lib tag
		this.handleDelete = this.handleDelete.bind(this)
		this.handleAddition = this.handleAddition.bind(this)
	}

	toggle() {
		this.setState({ open: !this.state.open })
		this.props.onClose()
	}
	toggleSave() {
		if (this.state.name && this.state.roles && this.state.tags !== 0) this.setState({ open: !this.state.open })
		this.props.onClose()
	}
	toggledrop() {
		this.setState({
			dropdownOpen: !this.state.dropdownOpen
		})
	}
	handleInputChange(e) {
		if (e) this.setState({ invalidname: false })
		let { name } = this.state
		console.log(e.target.value)
		this.setState({ name: e.target.value })
	}

	handleCheckboxChange = e => {
		this.setState({
			[e.target.name]: e.target.checked
			// checked : !this.statesendResetPass
		})
		console.log([e.target.name], e.target.checked)
		console.log('wow', this.state.sendResetPass)
	}

	handleInputChangeEmail(e) {
		if (e) this.setState({ invalidemail: false })
		let { email } = this.state
		console.log(e.target.value)
		this.setState({ email: e.target.value })
	}

	handleInputChangeTags(e) {
		let { tags } = this.state
		this.setState({ tags: e.target.value })
		if (tags.length > 0) this.setState({ invalid: false })
		console.log('tags', this.state, e.target.value)
	}

	handleChange = selectedOption => {
		this.setState({ roles: selectedOption })

		if (selectedOption) {
			this.setState({ invalidroles: false })
		}
	}
	setRoles = (index, data) => {
		this.setState({ invalidpm: false })
		let roles = this.state.roles.map(i => i)
		roles[index] = data
		this.setState(
			{
				roles
			},
			() => {
				this.filterROLES()
			}
		)
	}
	deleteRoles = index => {
		let roles = this.state.roles.filter((pm, i) => {
			return i !== index
		})
		this.setState({
			roles
		})
	}
	filterROLES = () => {
		let roles = this.state.roles.map(i => i)
		let filteredROLES = []
		roles.forEach(pm => {
			if (roles.value) {
				let isDuplicate = false
				filteredROLES.forEach(pm2 => {
					if (pm.value === pm2.value) isDuplicate = true
				})
				if (!isDuplicate) filteredROLES.push(pm)
			}
		})
		this.setState(
			{
				filteredROLES
			},
			() => {}
		)
	}
	clear() {
		this.setState({ listroles: [], usersname: '', tags: '' })
	}

	async sendDataMember() {
		try {
			if (this.state.name && this.state.roles && this.state.email) {
				const data = {
					id: this.state.id,
					name: this.state.name,
					roles: this.state.roles.value,
					tags: this.state.tags.map($objTag => {
						return { name: $objTag.name }
					}),
					email: this.state.email
				}
				await axios.put(`${url}/users`, data).then($res => {
					console.log('send member', $res)
					this.toggleSave()
					this.props.getData()
					this.props.onClose()
				})
				if (this.state.sendResetPass) {
					try {
						axios.post(`${url}/users/forgotpass`, data)
					} catch (error) {
						console.log('cant send email',error)
					}
				}
			} else {
				if (!this.state.name) this.setState({ invalidname: true })
				if (!this.state.roles) this.setState({ invalidroles: true })
				if (!this.state.email) this.setState({ invalidemail: true })
			}
		} catch (error) {
			console.log('fail to send data add member', error)
		}
	}

	componentDidMount() {
		try {
			if (this.props.id) {
				axios.get(`${url}/users`).then(res => {
					const { data } = res
					data.map(user => {
						if (user.id === this.props.id) {
							console.log('roles -> ', user.roles.name.toString())
							this.setState({
								id: user.id,
								name: user.name,
								roles: {
									value: user.roles.id,
									label: user.roles.name
								},
								tags: user.tags,
								email: user.email,
								header: 'Edit Member'
							})
						}
					})
				})
			}
			console.log('Set default roles' + this.state.roles)
			axios.get(`${url}/roles`).then(res => {
				const { data } = res
				let listroles = []
				data.map(data => {
					listroles.push({ value: data.id, label: data.name })
				})
				this.setState({
					listroles
				})
			})
		} catch (error) {
			console.log('fail to get data at AddMember', error)
		}
	}

	handleDelete(i) {
		const { tags } = this.state
		this.setState({
			tags: tags.filter((tag, index) => index !== i)
		})
	}

	handleAddition(tag) {
		this.setState(state => ({
			tags: [...state.tags, { id: tag.id, name: tag.text }]
		}))
	}

	handleDrag(tag, currPos, newPos) {
		const tags = [...this.state.tags]
		const newTags = tags.slice()

		newTags.splice(currPos, 1)
		newTags.splice(newPos, 0, tag)

		// re-render
		this.setState({ tags: newTags })
	}

	render() {
		console.log('Current roles', this.state.roles)
		const { onClose } = this.props
		const { tags, suggestions } = this.state

		return (
			<Container>
				<Modal style={{ fontSize: '1rem' }} size="5" isOpen={this.state.open} toggle={onClose}>
					<ModalHeader toggle={onClose}>{this.state.header}</ModalHeader>
					<ModalBody>
						<Container>
							<Row className="btsave">
								<Col>
									Name
									<Input
										style={{ fontSize: '8px !important' }}
										name="name"
										style={{ backgroundColor: '#f1f1f1' }}
										placeholder="Type your name"
										onChange={this.handleInputChange}
										value={this.state.name}
										invalid={this.state.invalidname}
										trimFilter
									/>
									<FormFeedback tooltip>Can't send empty name!</FormFeedback>
								</Col>
							</Row>

							<Row className="btsave">
								<Col>Roles</Col>
							</Row>
							<Select
								placeholder="Select role"
								value={this.state.roles}
								onChange={this.handleChange}
								options={this.state.listroles}
								trimFilter
							/>
							<div className="invalid">{this.state.invalidroles && this.state.invalidrolesmessage}</div>

							<Row className="btsave">
								<Col>
									Tags
									<div>
										<ReactTags
											tags={tags}
											labelField={'name'}
											// suggestions={suggestions}
											handleDelete={this.handleDelete}
											handleAddition={this.handleAddition}
											delimiters={delimiters}
										/>
									</div>
								</Col>
							</Row>

							<Row className="btsave">
								<Col>
									Email
									<Input
										style={{ fontSize: '8px !important' }}
										name="name"
										style={{ backgroundColor: '#f1f1f1' }}
										placeholder="example@pirsquare.net"
										onChange={this.handleInputChangeEmail}
										value={this.state.email}
										invalid={this.state.invalidemail}
									/>
									<FormFeedback tooltip>Can't send empty e-mail!</FormFeedback>
								</Col>
							</Row>

							{['DEV', 'DSN'].indexOf(this.state.roles.label) === -1 && (
								<div className="checkbox">
									<label>
										<input
											type="checkbox"
											class="input"
											checked={this.state.sendResetPass}
											name="sendResetPass"
											onChange={this.handleCheckboxChange}
										/>
										Send Reset Password
									</label>
								</div>
							)}
							<Row className="btsave">
								<Col>
									<Button
										color="5bc2e1"
										size="lg"
										block
										onClick={() => {
											this.sendDataMember()
										}}
									>
										Save
									</Button>
								</Col>
							</Row>
						</Container>
					</ModalBody>
				</Modal>
			</Container>
		)
	}
}
export default withRouter(AddMember)
