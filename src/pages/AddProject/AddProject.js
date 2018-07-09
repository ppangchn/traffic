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
import { withRouter } from 'react-router-dom'
import url from '../../url'

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
      pm: [],
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
      invalidpm: 'Please select at least one pm.',
      invalidcolor: 'Please select one color for this project.',
      isinvalidcolor: false,
      isinvalidpm: false,
      header: 'New Project'
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
    if (
      this.state.projectname &&
      this.state.filteredPM.length !== 0 &&
      this.state.checkedcolor
    )
      this.setState({ open: !this.state.open })
  }
  toggledrop() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    })
  }
  setCheckColor = c => {
    console.log(c)
    if (c) this.setState({ isinvalidcolor: false })
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
    this.setState({ isinvalidpm: false })
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
    this.setState(
      {
        pm
      },
      () => this.filterPM()
    )
    console.log('pm', pm)
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
  sendData = async () => {
    try {
      if (
        this.state.projectname &&
        (this.state.filteredPM.length !== 0 &&
          this.state.filteredPM[0].value) &&
        this.state.checkedcolor
      ) {
        let listTimeline = await []
        let listPM = []
        if (this.props.id) {
          if (!!this.state.timeline) {
            listTimeline = await this.state.timeline.map($objTimeline => {
              if ($objTimeline.users.roles.id >=2 && $objTimeline.users.roles.id <= 8) {
                $objTimeline.isDisable = true
              }

              return $objTimeline
            })
          }

          await this.state.filteredPM.map($objPM => {
            let findTimeline = listTimeline.find($fndTimeline => {
              return $fndTimeline.users.id == $objPM.value
            })

            if (!!findTimeline) {
              findTimeline.isDisable = false
            } else {
              listTimeline.push({
                users: {
                  id: $objPM.value
                }
              })
            }
          })

          if (!!this.state.project.projectManagement) {
            listPM = await this.state.project.projectManagement.map($objPM => {
              let pm = {
                users: {
                  id: $objPM.users.id
                },
                weight: $objPM.weight,
                isDisable: false
              }

              let findPM = this.state.filteredPM.find($fndPM => {
                return $fndPM.value == $objPM.users.id
              })

              if (!!!findPM) {
                pm.isDisable = true
              }

              if (!!$objPM.id) {
                pm.id = $objPM.id
              }

              return pm
            })
          }

          await this.state.filteredPM.map($objPM => {
            let findPM = listPM.find($fndPM => {
              return $fndPM.users.id == $objPM.value
            })

            if (!!!findPM) {
              listPM.push({
                users: {
                  id: $objPM.value
                },
                weight: $objPM.weight,
                isDisable: false
              })
            }
          })
        } else {
          listPM = this.state.filteredPM.map(pm => {
            return {
              users: {
                id: pm.value
              },
              weight: pm.weight
            }
          })
          listTimeline = this.state.filteredPM.map($objPM => {
            return {
              users: {
                id: $objPM.value
              }
            }
          })
        }

        let data = {
          name: this.state.projectname,
          color: this.state.checkedcolor,
          projectManagement: listPM,
          projectTimeline: listTimeline,
          weight: this.state.choseweight
        }

        if (!!this.props.id) {
          data.id = this.props.id
        }

        axios.put(`${url}/project`, data).then(response => {
          const newUser = response.data
          this.props.onClose()
          console.log('send!')
          this.props.history.push(`/project/${newUser.id}`)
        })
      } else {
        if (this.state.projectname.length === 0)
          this.setState({ invalid: true })
        if (
          this.state.filteredPM.length === 0 ||
          !this.state.filteredPM[0].value
        ) {
          this.setState({ isinvalidpm: true })
        }
        if (!this.state.checkedcolor) {
          this.setState({ isinvalidcolor: true })
        }
      }
    } catch (error) {
      console.log('error addproject', error)
    }
  }
  componentDidMount() {
    try {
      if (this.props.id) {
        axios.get(`${url}/project/${this.props.id}`).then(res => {
          console.log('add project -> ', res)
          const { data } = res
          const pm = data.project.projectManagement.map(pm => ({
            value: pm.users.id,
            label: pm.users.name,
            weight: pm.weight,
            id: pm.id
          }))
          this.setState({
            projectname: data.project.name,
            choseweight: data.project.weight,
            pm,
            filteredPM: pm,
            header: 'Edit Project',
            timeline: data.timeline,
            project: data.project
          })
          this.setCheckColor(data.project.color)
        })
      } else {
        this.setState({
          pm: [
            {
              value: null,
              label: '',
              weight: 0
            }
          ]
        })
      }
      axios.get(`${url}/users/pm`).then(res => {
        const { data } = res
        console.log('Data', data)
        let listpm = []
        data.map(data => {
          // if (this.props.pm.indexOf(data.name)===-1)
          listpm.push({ value: data.id, label: data.name })
        })
        this.setState({
          listpm
        })
      })
    } catch (error) {
      console.log('fail to get data at AddProject', error)
    }
  }
  render() {
    const { onClose } = this.props

    return (
      <Container>
        {/* {console.log('invalid',this.state.invalid)} */}
        <Modal
          size="5"
          isOpen={this.state.open}
          toggle={onClose}
          onExit={() => this.clear()}
        >
          <ModalHeader toggle={onClose}>{this.state.header}</ModalHeader>
          <ModalBody>
            <Container className="addprojectbox">
              <Row>
                <Col className="projectnamebox">
                  Project name
                  <Input
                    className="fontinput"
                    name="projectname"
                    invalid={this.state.invalid}
                    placeholder="Type your project name"
                    onChange={this.handleInputChange}
                    value={this.state.projectname}
                  />
                  <FormFeedback tooltip>Can't send empty name!</FormFeedback>
                </Col>
                <Col xs="4">
                  <div className="projectweighttext">Project Weight</div>
                  <div className="sliderbox">
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
                <Col xs="2" className="weightbox">
                  <div className="weightproject">
                    {this.state.choseweight} %
                  </div>
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
              <Row
                className="pd10"
                style={{
                  color: '#da3849',
                  fontSize: '80%',
                  marginBottom: '10px'
                }}
              >
                {this.state.isinvalidcolor && this.state.invalidcolor}
              </Row>
              <Row>
                <Col xs="4" md="4">
                  Project PM
                </Col>
                <Col className="pmweighttext" xs="5" md="5">
                  Manager weight
                </Col>
              </Row>
              {this.state.pm.map((pm, index) => (
                <SelectPm
                  id={index} //start at 0
                  pm={pm}
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
                  {this.state.isinvalidpm && this.state.invalidpm}
                </Col>
              </Row>
              <Row>
                <Col className="addpmbox">
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
                  <Button
                    color="5bc2e1"
                    size="lg"
                    block
                    onClick={() => {
                      this.sendData(), this.toggleSave()
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

export default withRouter(AddProject)
