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
import ColorButton from './ColorButton'
import './AddProject.css'
import Select from 'react-select'
import 'react-select/dist/react-select.css'
import axios from 'axios'

// var abcElements = document.querySelectorAll('.abc');

// // Set their ids
// for (var i = 0; i < abcElements.length; i++)
//     abcElements[i].id = 'abc-' + i;

class AddProject extends Component {
	constructor(props) {
		super(props)
		this.state = {
			open: true,
			dropdownOpen: false,
			listpm: [
				{ value: 'ant', label: 'ant' },
				{ value: 'aume', label: 'aume' },
				{ value: 'pang', label: 'pang' },
				{ value: 'ping', label: 'ping' },
				{ value: 'pop', label: 'pop' }
			],
			color: [
				'#D50000',
				'#F44336',
				'#FF5252',
				'#E65100',
				'#FF6D00',
				'#F57F17',
				'#F9A825',
				'#FFCC80',
				'#FFC400',
				'#FDD835',
				'#FFF176',
				'#CCFF90',
				'#B2FF59',
				'#76FF03',
				'#00E676',
				'#00C853',
				'#1DE9B6',
				'#69F0AE',
				'#4DB6AC',
				'#81D4FA',
				'#29B6F6',
				'#2196F3',
				'#2979FF',
				'#00E5FF',
				'#18FFFF',
				'#82B1FF',
				'#7B1FA2',
				'#D500F9',
				'#EC407A',
				'#F48FB1'
			],
			projectname: '',
			checkedcolor: '',
			pm: [],
			unchecked: [
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false
			],
			search: '',
			weights: [
				{ value: 0, label: 0 },
				{ value: 25, label: 25 },
				{ value: 50, label: 50 },
				{ value: 75, label: 75 },
				{ value: 100, label: 100 }
			],
			choseweight: '',
			rtl: false,
			stayOpen: false,
			disabled: false,
			removeSelected: true,
			invalid: false
		}
		this.toggle = this.toggle.bind(this)
		this.toggledrop = this.toggledrop.bind(this)
		this.handleInputChange = this.handleInputChange.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.handleSelectChange = this.handleSelectChange.bind(this)
	}
	toggle() {
		if (this.state.projectname) {
			this.setState({ open: !this.state.open, invalid: false })
			console.log(this.state.open)
		} else {
			this.setState({ invalid: true })
		}
	}
	toggledrop() {
		this.setState({
			dropdownOpen: !this.state.dropdownOpen
		})
	}
	setCheckColor(c) {
		this.setUnchecked()
		this.setState({ checkedcolor: c })
		console.log(this.state.checkedcolor)
	}
	setUnchecked() {
		this.state.color.map(c => {
			let tmp = this.state.unchecked[this.state.color.indexOf(c)]
			if (this.state.checkedcolor === c) {
				this.setState({ tmp: true })
			} else this.setState({ tmp: false })
		})
	}
	handleInputChange(e) {
		const target = e.target
		const value = target.type === 'checkbox' ? target.checked : target.value
		const name = target.name
		this.setState({
			[name]: value //เอาค่าในตัวแปร name
		})
		console.log(this.state.projectname)
		if (this.state.projectname) this.setState({ invalid: false })
	}
	handleChange = selectedOption => {
		this.setState({ choseweight: selectedOption })
		// selectedOption can be null when the `x` (close) button is clicked
		if (selectedOption) {
			console.log(`Selected: ${selectedOption.label}`)
		}
	}
	handleSelectChange(value) {
		console.log("You've selected:", value)
		this.setState({ pm: value })
	}
	clear() {
		this.setState({ listpm: [], projectname: '', color: '' })
	}
	setWeight(w) {
		this.setState({ choseweight: w })
	}
	sendData() {
		if (this.state.projectname) {
			let data = {
				name: this.state.projectname,
				color: this.state.checkedcolor,
				pm: this.state.pm,
				weight: this.state.choseweight
			}
			axios
				.post('http://dev.pirsquare.net:3013/traffic-api/project', data)
				.then(function(response) {
					console.log(response)
				})
				.catch(function(error) {
					console.log(error)
				})
			console.log('send!')
		} else console.log('cant send')
	}
	render() {
		return (
			<div style={{ position: 'absolute' }}>
				<Modal
					isOpen={this.state.open}
					toggle={this.toggle}
					onExit={() => this.clear()}
				>
					<ModalHeader toggle={this.toggle}>New Project</ModalHeader>
					<ModalBody>
						<Container>
							<Row>
								<Col>
									Project name
									{console.log(this.state.projectname)}
									<Input
										name="projectname"
										invalid={this.state.invalid}
										placeholder="Type your project name"
										onChange={this.handleInputChange}
									/>
									<FormFeedback tooltip>Can't send empty name!</FormFeedback>
								</Col>
								<Col>
									Project Manager<br />
									<Select
										closeOnSelect={!this.state.stayOpen}
										multi={true}
										joinValues={true}
										disabled={this.state.disabled}
										onChange={this.handleSelectChange}
										options={this.state.listpm}
										placeholder="Select PM(s)"
										simpleValue
										value={this.state.pm}
									/>
								</Col>
							</Row>
							<Row>
								<Col>Project color</Col>
							</Row>
							{() => this.setUnchecked()}
							<Row className="pd10">
								{this.state.color.map(c => {
									return (
										<Col className="pd5" md={1} sm={1} xs={2}>
											<ColorButton
												color={c}
												setCheckedColor={e => this.setCheckColor(e)}
												// unchecked={() => this.state.unchecked[this.state.color.indexOf(c)]}
											/>
										</Col>
									)
								})}
							</Row>
							<Row>
								<Col>Project Weight</Col>
								<Col>
									<Select
										// name="choseweight"
										placeholder="Select Weight..."
										value={this.state.choseweight}
										onChange={this.handleChange}
										options={this.state.weights}
									/>
								</Col>
							</Row>
							<Row>
								<Col>Member</Col>
							</Row>
							<Row>
								<Col>
									<Button
										color="primary"
										size="lg"
										block
										onClick={() => {
											this.toggle(), this.sendData()
										}}
									>
										Save
									</Button>
								</Col>
							</Row>
						</Container>
					</ModalBody>
				</Modal>
			</div>
		)
	}
}

export default AddProject
