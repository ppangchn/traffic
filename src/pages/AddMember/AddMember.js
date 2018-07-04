import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { Button, Modal, ModalHeader, ModalBody, Input, FormFeedback } from 'reactstrap'
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
			tags:[],
			filteredROLES: [],
			roles:[],
		}

		this.toggle = this.toggle.bind(this)
		this.toggledrop = this.toggledrop.bind(this)
		this.handleInputChange = this.handleInputChange.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}

	toggle() {
		this.setState({ open: !this.state.open })
	}
	toggleSave() {
    if (this.state.projectname && this.state.filteredPM.length !== 0)
      this.setState({ open: !this.state.open })
	}
	toggledrop() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    })
	}
	handleInputChange(e) {
    const target = e.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    this.setState({
      [name]: value //เอาค่าในตัวแปร name
    })
    if (name.length > 0) this.setState({ invalid: false })
	}
	
  handleChange = selectedOption => {
    this.setState({ choseweight: selectedOption })
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
    this.setState({ listroles: [], usersname: '',tags:'' })
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
							<Row>
								<Col>
									Name
									<Input
										style={{ fontSize: '8px !important' }}
										name="name"
										style={{ backgroundColor: '#f1f1f1' }}
										invalid={this.state.invalid}
										placeholder="Type your name"
										onChange={this.handleInputChange}
									/>
									<FormFeedback tooltip>Can't send empty name!</FormFeedback>
								</Col>
							</Row>

							<Row>
								<Col>
									Roles
								</Col>
							</Row>
							{/* {this.state.roles.map((roles, index) => ( */}
								<SelectRoles
									// id={index} //start at 0
									// roles={roles}
									listroles={this.state.listroles}
									setRoles={this.setRoles}
									delete={this.deleteRoles}
								/>
							{/* ))} */}
							<Row>
							<Col>
								Tags
								<Input
									style={{ fontSize: '8px !important' }}
									name="tags"
									style={{ backgroundColor: '#f1f1f1' }}
									invalid={this.state.invalid}
									placeholder="Type your name"
									onChange={this.handleInputChange}
								/>
								<FormFeedback tooltip>Can't send empty name!</FormFeedback>
							</Col>
							</Row>
							<Row>
								<Col>
									{/* <Link className="savelink" to={this.state.projectname  && this.state.filteredPM && `/project/${this.state.size}`}> */}
									
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