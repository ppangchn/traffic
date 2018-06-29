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
import ColorButton from '../../components/AddProject/ColorButton'
import './AddProject.css'
import SelectPm from '../../components/AddProject/SelectPm'
import 'react-select/dist/react-select.css'
import axios from 'axios'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import './AddProject.css'
import { Link, withRouter } from 'react-router-dom'

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
      member: [],
      size: 1
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
    if (name.length > 0) this.setState({ invalid: false })
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
    this.setState({ listpm: [], projectname: '', color: '', invalidpm: '' })
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
    if (this.state.projectname && this.state.filteredPM.length !== 0) {
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
          const newUser = response.data
          this.props.history.push(`/project/${newUser.id}`)
          console.log(response)
        })
        .catch(function(error) {
          console.log(error)
        })
      console.log('send!')
    } else {
      if (this.state.projectname.length === 0) this.setState({ invalid: true })
      if (this.state.filteredPM.length === 0) {
        this.setState({ invalidpm: 'Please select at least one pm.' })
      }
    }
  }
  componentDidMount() {
    const listmember = this.state.listmember.map(i => i)
    axios
      .get(`http://dev.pirsquare.net:3013/traffic-api/users/pd`)
      .then(res => {
        const { data } = res
        console.log('Data', data)
        data.map(data => listmember.push({ value: data.id, label: data.name }))
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
    axios.get(`http://dev.pirsquare.net:3013/traffic-api/project`).then(res => {
      const { data } = res
      console.log('Data', data)
      this.setState({ size: data[data.length - 1].id + 1 })
    })
  }
  render() {
    const { onClose } = this.props

    return (
      <Container>
        {/* {console.log('invalid',this.state.invalid)} */}
        <Modal
          style={{ fontSize: '1rem' }}
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
                    style={{ fontSize: '8px !important' }}
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
                  <div style={{ marginTop: '10px' }}>
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
                <Col xs="2" style={{ marginRight: '10px' }}>
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
              <Row>
                <Col xs="4" md="4">
                  Project PM
                </Col>
                <Col xs="5" md="5">
                  Manager weight
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
              <Row>
                <Col style={{ marginBottom: '0.625rem' }}>
                  <Button
                    outline
                    size="sm"
                    color="secondary"
                    onClick={() => this.addPM()}
                  >
                    +Add manager
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Link
                    className="savelink"
                    to={
                      this.state.projectname &&
                      this.state.filteredPM &&
                      `/project/${this.state.size}`
                    }
                  >
                      <Button
                      color='5bc2e1'
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

export default withRouter(AddProject)
