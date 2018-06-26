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
import ColorButton from './components/ColorButton'
import './AddProject.css'
import SelectPm from './components/SelectPm'
import Select from 'react-select'
import 'react-select/dist/react-select.css'
import axios from 'axios'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import './AddProject.css'
import { Link } from 'react-router-dom'
import ViewbyPerson from '../Views/ViewbyPerson/ViewbyPerson'

class AddProject extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: true,
      dropdownOpen: false,
      listpm: [],
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
        '#EA80FC',
        '#D500F9',
        '#EC407A',
        '#F48FB1'
      ],
      projectname: '',
      checkedcolor: '',
      pm: [
        {
          value: null,
          label: '',
          weight: 0
        }
      ],
      filteredPM: [],
      weights: [
        { value: 0, label: '0 point' },
        { value: 25, label: '25 point' },
        { value: 50, label: '50 point' },
        { value: 75, label: '75 point' },
        { value: 100, label: '100 point' }
      ],
      choseweight: 0,
      invalid: false,
      listmember: [],
      member: []
    }
    this.toggle = this.toggle.bind(this)
    this.toggledrop = this.toggledrop.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSelectChangeMember = this.handleSelectChangeMember.bind(this)
  }
  toggle() {
    this.setState({ open: !this.state.open })
  }
  toggleSave() {
    if (this.state.projectname) this.setState({ open: !this.state.open })
  }
  toggledrop() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    })
  }
  setCheckColor = c => {
    console.log(c)
    this.setState({ checkedcolor: c })
  }

  handleInputChange(e) {
    const target = e.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    this.setState({
      [name]: value //เอาค่าในตัวแปร name
    })
  }
  handleChange = selectedOption => {
    this.setState({ choseweight: selectedOption })
    // selectedOption can be null when the `x` (close) button is clicked
    if (selectedOption) {
      console.log(`Selected: ${selectedOption.label}`)
    }
  }
  setPm = (index, data) => {
    let pm = this.state.pm.map(i => i)
    pm[index] = data
    this.setState(
      {
        pm
      },
      () => {
        this.filterPM()
      }
    )
  }
  deletePm = index => {
    let pm = this.state.pm.filter((pm, i) => {
      return i !== index
    })
    this.setState({
      pm
    })
  }
  filterPM = () => {
    let pm = this.state.pm.map(i => i)
    let filteredPM = []
    pm.forEach(pm => {
      if (pm.value) {
        let isDuplicate = false
        filteredPM.forEach(pm2 => {
          if (pm.value === pm2.value) isDuplicate = true
        })
        if (!isDuplicate) filteredPM.push(pm)
      }
    })
    this.setState(
      {
        filteredPM
      },
      () => {
        console.log('SELECTED PM FINAL', this.state.filteredPM)
      }
    )
  }
  handleSelectChangeMember(value) {
    const member = value.split(',').map(e => {
      return parseInt(e)
    })
    console.log("You've selected:", member)
    this.setState({ member })
    // console.log(this.state.pm);
  }
  clear() {
    this.setState({ listpm: [], projectname: '', color: '' })
  }
  addPM() {
    let pm = this.state.pm.map(i => i)
    pm.push({
      value: null,
      label: '',
      weight: 0
    })
    this.setState({ pm })
  }
  slideChange = value => {
    this.setState({
      choseweight: value
    })
  }
  sendData() {
    if (this.state.projectname) {
      let data = {
        name: this.state.projectname,
        color: this.state.checkedcolor,
        projectManagement: this.state.filteredPM.map(data => {
          return {
            users: {
              id: data.value
            },
            weight: data.weight
          }
        }),
        weight: this.state.choseweight,
        member: this.state.memeber
      }
      axios
        .put('http://dev.pirsquare.net:3013/traffic-api/project', data)
        .then(function(response) {
          console.log(response)
        })
        .catch(function(error) {
          console.log(error)
        })
      console.log('send!')
    } else this.setState({ invalid: true })
  }
  componentDidMount() {
    const listmember = this.state.listmember.map(i => i)
    axios
      .get(`http://dev.pirsquare.net:3013/traffic-api/users/pd`)
      .then(res => {
        const { data } = res
        console.log('Data', data)
        data.map(data => {
          listmember.push({ value: data.id, label: data.name })
        })
        this.setState({ listmember })
      })

    axios
      .get(`http://dev.pirsquare.net:3013/traffic-api/users/pm`)
      .then(res => {
        const { data } = res
        console.log('Data', data)
        let listpm = []
        data.map(data => {
          // if (this.props.pm.indexOf(data.name)===-1)
          listpm.push({ value: data.id, label: data.name })
        })
        this.setState({ listpm })
      })
  }
  render() {
    const { onClose } = this.props

    return (
      <Container style={{minWidth: '414px', minHeight: '736px'}}>
        {/* {console.log('invalid',this.state.invalid)} */}
        <Modal
          size="5"
          isOpen={this.state.open}
          toggle={onClose}
          onExit={() => this.clear()}
        >
          <ModalHeader toggle={onClose}>New Project</ModalHeader>
          <ModalBody>
            <Container>
              <Row>
                <Col>
                  Project name
                  <Input
                    name="projectname"
                    style={{ backgroundColor: '#f1f1f1' }}
                    invalid={this.state.invalid}
                    placeholder="Type your project name"
                    onChange={this.handleInputChange}
                  />
                  <FormFeedback tooltip>Can't send empty name!</FormFeedback>
                </Col>
                <Col xs="4">
                  Project Weight
                  <div style={{ marginTop: '20px' }}>
                    <Slider
                      className="slider"
                      min={0}
                      max={100}
                      step={25}
                      onChange={this.slideChange}
                      value={this.state.choseweight}
                    />
                  </div>
                </Col>
                <Col xs="2">
                  <div className="weight">{this.state.choseweight} %</div>
                </Col>
              </Row>
              <Row>
                <Col>Project color</Col>
              </Row>
              {/* {() => this.setChecked()} */}
              <Row className="pd10">
                {this.state.color.map(c => {
                  return (
                    <Col className="pd5" md={1} sm={1} xs={2}>
                      <ColorButton
                        color={c}
                        setCheckedColor={this.setCheckColor}
                        checkedColor={this.state.checkedcolor}
                      />
                    </Col>
                  )
                })}
              </Row>
              Project PM&emsp;&emsp;&emsp;&emsp;&emsp;Manager weight<br />
              {this.state.pm.map((pm, index) => (
                <SelectPm
                  id={index} //start at 0
                  listpm={this.state.listpm}
                  setPm={this.setPm}
                  delete={this.deletePm}
                />
              ))}
              <Button
                outline
                size="sm"
                color="secondary"
                onClick={() => this.addPM()}
              >
                +Add manager
              </Button>
              {/* <Select
                    style={{backgroundColor: '#f1f1f1'}}
                    closeOnSelect={!this.state.stayOpen}
                    multi={true}
                    joinValues={true}
                    disabled={this.state.disabled}
                    onChange={this.handleSelectChangePm}
                    options={this.state.listpm}
                    placeholder="Select PM(s)"
                    simpleValue
                    value={this.state.pm}
                  /> */}
              <Row>
                <Col>
                  Member
                  <Select
                    style={{ backgroundColor: '#f1f1f1' }}
                    closeOnSelect={!this.state.stayOpen}
                    multi={true}
                    joinValues={true}
                    disabled={this.state.disabled}
                    onChange={this.handleSelectChangeMember}
                    options={this.state.listmember}
                    placeholder="Select Member(s)"
                    simpleValue
                    value={this.state.member}
                    pageSize="1"
                  />
                  <br />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Link to="/person">
                    <Button
                      color="primary"
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

export default AddProject
