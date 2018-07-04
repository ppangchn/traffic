import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { Button, Modal, ModalHeader, ModalBody, Input, FormFeedback, ModalFooter } from 'reactstrap'
import Select from 'react-select'
import 'react-select/dist/react-select.css'
import axios from 'axios'
import 'rc-slider/assets/index.css'
import './AddMember.css'
import { Link, withRouter } from 'react-router-dom'
import SelectRoles from './SelectRoles'

class AddMember extends Component {
	constructor(props) {
		super(props)
		this.state = {
			open: true,
			listroles: [],
			dropdownOpen: false,
			tags: '',
			filteredROLES: [],
			roles: '',
			name: ''
		}

		this.toggle = this.toggle.bind(this)
		this.toggledrop = this.toggledrop.bind(this)
		this.handleInputChange = this.handleInputChange.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.handleInputChangeTags = this.handleInputChangeTags.bind(this)
	}

	toggle() {
		this.setState({ open: !this.state.open })
	}
	toggleSave() {
		if (this.state.name && this.state.roles && this.state.tags !== 0) this.setState({ open: !this.state.open })
	}
	toggledrop() {
		this.setState({
			dropdownOpen: !this.state.dropdownOpen
		})
	}
	handleInputChange(e) {
		let { name } = this.state
		console.log(e.target.value)
		this.setState({ name: e.target.value })
	
		if (name.length > 0) this.setState({ invalid: false })
	}
	handleInputChangeTags(e) {
		let { tags } = this.state
		this.setState({ tags: e.target.value })
		if (tags.length > 0) this.setState({ invalid: false })
		console.log('tags', this.state, e.target.value)
	}

	handleChange = selectedOption => {
		this.setState({ roles: selectedOption })
		// selectedOption can be null when the `x` (close) button is clicked
		if (selectedOption) {
			console.log(`Selected: ${selectedOption.label}`)
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
			() => {
				// console.log('SELECTED PM FINAL', this.state.filteredPM)
			}
		)
	}
	clear() {
		this.setState({ listroles: [], usersname: '', tags: '' })
	}

	async sendDataMember() {
		try {
			const data = {
				name: this.state.name,
				roles: this.state.roles.value,
				tags: this.state.tags
			}
			await axios.put('http://dev.pirsquare.net:3013/traffic-api/users', data).then($res => {
				console.log('send member', $res)
			})
		} catch (error) {
			console.log('fail to send data add member')
		}
	}

	componentDidMount() {
		try {
			axios.get(`http://dev.pirsquare.net:3013/traffic-api/roles`).then(res => {
				const { data } = res
				console.log('Data', data)
				let listroles = []
				data.map(data => {
					// if (this.props.pm.indexOf(data.name)===-1)
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
	render() {
		const { onClose } = this.props
		return (
			<Container>
				{/* {console.log('invalid',this.state.invalid)} */}
				<Modal style={{ fontSize: '1rem' }} size="5" isOpen={this.state.open} toggle={onClose}>
					<ModalHeader toggle={onClose}>New Member</ModalHeader>
					<ModalBody>
						<Container>
							<Row className="btsave">
								<Col>
									Name
									<Input
										style={{ fontSize: '8px !important' }}
										name="name"
										style={{ backgroundColor: '#f1f1f1' }}
										// invalid={this.state.invalid}
										placeholder="Type your name"
										onChange={this.handleInputChange}
										value={this.state.name}
									/>
									<FormFeedback tooltip>Can't send empty name!</FormFeedback>
								</Col>
							</Row>

							<Row className="btsave">
								<Col>Roles</Col>
							</Row>
							{/* {this.state.roles.map((roles, index) => ( */}
							<Select
								// ClassName="selectbox"
								placeholder="Select role"
								value={this.state.roles}
								onChange={this.handleChange}
								options={this.state.listroles}
								// trimFilter
							/>
							{/* ))} */}
							<Row className="btsave">
								<Col>
									Tags
									<Input
										style={{ fontSize: '8px !important' }}
										name="tags"
										style={{ backgroundColor: '#f1f1f1' }}
										// invalid={this.state.invalid}
										placeholder="Type your name"
										onChange={this.handleInputChangeTags}
										value={this.state.tags}
									/>
									<FormFeedback tooltip>Can't send empty name!</FormFeedback>
								</Col>
							</Row>

							<Row className="btsave">
								<Col>
									{/* <Link className="savelink" to={this.state.projectname  && this.state.filteredPM && `/project/${this.state.size}`}> */}
									<Button
										color="5bc2e1"
										size="lg"
										block
										onClick={() => {
											this.sendDataMember(), this.toggleSave()
											// ,this.props.isSaved(true)
										}}
									>
										Save
									</Button>
									{/* </Link> */}
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
