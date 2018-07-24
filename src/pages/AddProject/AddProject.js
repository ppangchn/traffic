import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { Button, Modal, ModalHeader, ModalBody, Input } from 'reactstrap'
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
      namelistpm: [],
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
      usedcolor: [],
      projectname: '',
      checkedcolor: '',
      pm: [],
      weights: [
        { value: 0, label: '0 point' },
        { value: 25, label: '25 point' },
        { value: 50, label: '50 point' },
        { value: 75, label: '75 point' },
        { value: 100, label: '100 point' }
      ],
      choseweight: 0,
      invalid: false,
      invalidprojectname: "Can't send empty name!",
      invalidpm: 'Please select pm.',
      invalidcolor: 'Please select one color for this project.',
      invalidweight: 'Please choose weight for this project',
      invalidweightpm: 'Please choose weight for pm',
      isinvalidcolor: false,
      isinvalidpm: false,
      isinvalidweight: false,
      isinvalidweightpm: false,
      isinvalidaddpm: true,
      header: 'New Project'
    }
    this.toggle = this.toggle.bind(this)
    this.toggledrop = this.toggledrop.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.slideChange = this.slideChange.bind(this)
  }
  toggle() {
    this.setState({ open: !this.state.open })
  }
  toggleSave() {
    if (
      this.state.projectname &&
      this.state.pm.length !== 0 &&
      this.state.checkedcolor
    ) {
      this.setState({ open: !this.state.open })
    }
  }
  toggledrop() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    })
  }
  setCheckColor = (c, used) => {
    if (c) this.setState({ isinvalidcolor: false })
    if (!used) this.setState({ checkedcolor: c })
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
  slideChange(value) {
    this.setState({
      choseweight: value,
      isinvalidweight: false
    })
  }
  setPm = (index, data) => {
    let pm = this.state.pm
    let timeline = this.state.timeline

    if (!!this.state.pm[index].value) {
      data.id = this.state.pm[index].id

      let findCurrentPM = pm.find($fndPm => {
        return $fndPm.value == data.value
      })

      if (!!findCurrentPM) {
        let findIndexPM = pm.findIndex($fndPm => {
          return $fndPm.value == data.value
        })
        let tempData = this.state.pm[index]

        tempData.id = findCurrentPM.id
        findCurrentPM = tempData

        pm[findIndexPM] = findCurrentPM
      }

      let currentPM = this.state.pm[index]
      if (timeline) {
        let findOldTimeline = timeline.find($fndTimeline => {
          return $fndTimeline.users.id == currentPM.value
        })

        let findCurrentTimelime = timeline.find($fndTimeline => {
          return $fndTimeline.users.id == data.value
        })

        if (!!findCurrentTimelime) {
          findCurrentTimelime.users = {
            id: findOldTimeline.users.id,
            roles: findOldTimeline.users.roles
          }
        }

        if (!!findOldTimeline) {
          findOldTimeline.users = {
            id: data.value,
            roles: data.roles
          }
        }
      }

      pm[index] = data
    } else {
      pm[index] = data
    }
    this.updateListPm(pm)
    this.setState({
      pm,
      isinvalidpm: false,
      timeline
    })
    if (pm[index].weight) this.setState({ isinvalidweightpm: false })
    if (pm[index].value && pm[index].weight)
      this.setState({ isinvalidaddpm: false })
    else this.setState({ isinvalidaddpm: true })

    return pm
  }
  deletePm = index => {
    let pm = this.state.pm.filter((pm, i) => {
      return i !== index
    })
    this.setState({
      pm,
      isinvalidweightpm: false,
      isinvalidpm: false,
      isinvalidaddpm: false
    })
    this.updateListPm(pm)
  }
  addPM() {
    let currentpm = this.state.pm
    let pm = this.state.pm.map(i => i)
    if (
      !(
        currentpm[currentpm.length - 1].value ||
        currentpm[currentpm.length - 1].weight
      )
    ) {
      this.setState({ isinvalidaddpm: true })
    } else {
      pm.push({
        value: null,
        label: '',
        weight: 0,
        disabled: false
      })

      this.setState({ pm, isinvalidaddpm: true })
    }
  }
  updateListPm(pm) {
    let { listpm } = this.state
    let namelistpm = this.state.namelistpm
    listpm.forEach(e => {
      e.disabled = false
    })
    pm.forEach(e => {
      if (e.label) {
        let index = namelistpm.indexOf(e.label)
        if (index !== -1) {
          listpm[index].disabled = true
        }
      }
    })
    this.setState({ listpm })
  }
  setInvalidAddPm(state) {
    this.setState({ isinvalidaddpm: state })
  }
  sendData = async () => {
    let invalidforallweightpm = false
    this.state.pm.forEach(e => {
      if (e.weight == 0) invalidforallweightpm = true
    })
    if (
      this.state.projectname &&
      (this.state.pm.length !== 0 && this.state.pm[0].value) &&
      this.state.checkedcolor &&
      this.state.choseweight > 0 &&
      !invalidforallweightpm
    ) {
      let listTimeline = await []
      let listPM = []
      if (this.props.id) {
        if (!!this.state.timeline) {
          listTimeline = await this.state.timeline.map($objTimeline => {
            if (
              $objTimeline.users.roles &&
              $objTimeline.users.roles.id >= 1 &&
              $objTimeline.users.roles.id <= 6
            ) {
              $objTimeline.isDisable = true
            }

            return $objTimeline
          })
        }

        await this.state.pm.map($objPM => {
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
        listPM = await this.state.project.projectManagement.map($objPM => {
          if (
            $objPM.users.roles &&
            $objPM.users.roles.id >= 1 &&
            $objPM.users.roles.id <= 6
          ) {
            $objPM.isDisable = true
          }

          return {
            id: $objPM.id,
            users: {
              id: $objPM.value
            },
            weight: $objPM.weight,
            isDisable: $objPM.isDisable
          }
        })
        this.state.pm.map($objPM => {
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
          } else {
            findPM.isDisable = false
          }
        })
      } else {
        listPM = this.state.pm.map(pm => {
          return {
            users: {
              id: pm.value
            },
            weight: pm.weight
          }
        })
        listTimeline = this.state.pm.map($objPM => {
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
      try {
        axios.put(`${url}/project`, data).then(response => {
          const newUser = response.data
          this.props.onClose()
          this.toggleSave()
          if (this.props.id) this.props.getData()
          console.log('send!')
          this.props.history.push(`/project/${newUser.id}`)
        })
      } catch (error) {
        console.log('cant add project', error)
      }
    } else {
      if (this.state.projectname.length === 0) this.setState({ invalid: true })
      if (
        this.state.pm.length === 0 ||
        !this.state.pm[this.state.pm.length - 1].value
      ) {
        this.setState({ isinvalidpm: true })
      }
      if (!this.state.checkedcolor) {
        this.setState({ isinvalidcolor: true })
      }
      if (this.state.choseweight === 0) {
        this.setState({ isinvalidweight: true })
      }
      let { isinvalidweightpm } = this.state
      this.state.pm.forEach(e => {
        if (e.weight == 0 && e.value) isinvalidweightpm = true
      })
      this.setState({ isinvalidweightpm })
    }
  }
  componentDidMount() {
    try {
      let pm = []
      if (this.props.id) {
        axios.get(`${url}/project/${this.props.id}`).then(res => {
          const { data } = res
          pm = data.project.projectManagement.map(pm => {
            if (!pm.isDisable) {
              return {
                value: pm.users.id,
                label: pm.users.name,
                weight: pm.weight,
                id: pm.id,
                roles: pm.users.roles
              }
            }
          })
          this.setState({
            projectname: data.project.name,
            choseweight: data.project.weight,
            pm,
            pm: pm,
            header: 'Edit Project',
            timeline: data.timeline,
            project: data.project,
            isinvalidaddpm: false
          })
          this.setCheckColor(data.project.color)
        })
      } else if (this.props.userid && this.props.username) {
        pm = [
          {
            value: this.props.userid,
            label: this.props.username,
            weight: 0,
            id: 1,
            roles: this.props.roles
          }
        ]
        this.setState({ pm, isinvalidaddpm: false })
      } else {
        pm = [
          {
            value: null,
            label: '',
            weight: 0,
            id: null,
            roles: {}
          }
        ]
        this.setState({
          pm
        })
      }
      let usedcolor = []
      axios.get(`${url}/project`).then(res => {
        const project = res.data
        project.map(e => {
          usedcolor.push(e.color)
        })
        this.setState({ usedcolor })
      })
      axios.get(`${url}/users/pm`).then(res => {
        const { data } = res
        let listpm = []
        let namelistpm = []
        data.map(user => {
          listpm.push({
            value: user.id,
            label: user.name,
            roles: user.roles,
            disabled: false
          })
          namelistpm.push(user.name)
        })
        this.setState(
          {
            listpm,
            namelistpm
          },
          () => this.updateListPm(pm)
        )
      })
    } catch (error) {
      console.log('fail to get data at AddProject', error)
    }
  }
  render() {
    const { onClose } = this.props

    return (
      <Container>
        <Modal
          size="5"
          isOpen={this.state.open}
          toggle={onClose}
          autoFocus={true}
        >
          <ModalHeader toggle={onClose}>{this.state.header}</ModalHeader>
          <ModalBody>
            <Container className="addprojectbox">
              <Row className="rowcontainer">
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
                  {/* <FormFeedback tooltip="true">
                    Can't send empty name!
                  </FormFeedback> */}
                  <Col />
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
              <Row
                className="pd10"
                style={{
                  color: '#da3849',
                  fontSize: '80%',
                  position: 'relative',
                  bottom: '6px',
                  lineHeight: '10px'
                }}
              >
                <Col
                  style={{
                    paddingLeft: '5px',
                    paddingRight: '0'
                  }}
                >
                  {this.state.invalid && this.state.invalidprojectname}
                </Col>
                <Col style={{ paddingLeft: '10px' }}>
                  {this.state.isinvalidweight && this.state.invalidweight}
                </Col>
              </Row>
              <Row>
                <Col>Project color</Col>
              </Row>
              <Row className="pd10">
                {this.state.color.map(c => {
                  let used = false
                  if (this.state.usedcolor.includes(c)) used = true
                  return (
                    <Col key={c} className="pd5" md={1} sm={1} xs={2}>
                      <ColorButton
                        color={c}
                        used={used}
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
                  lineHeight: '13px',
                  position: 'relative',
                  bottom: '7px'
                }}
              >
                <Col style={{ paddingLeft: '5px' }}>
                  {this.state.isinvalidcolor && this.state.invalidcolor}
                </Col>
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
                  key={pm.value}
                  id={index} //start at 0
                  pm={pm}
                  roles={pm.roles}
                  listpm={this.state.listpm}
                  setPm={this.setPm}
                  delete={this.deletePm}
                  setInvalidAddPm={() => this.setInvalidAddPm(false)}
                />
              ))}
              <Row>
                <Col
                  style={{
                    color: '#da3849',
                    fontSize: '80%',
                    marginBottom: '10px',
                    lineHeight: '13px',
                    position: 'relative',
                    bottom: '1px'
                  }}
                >
                  {this.state.isinvalidpm && this.state.invalidpm}
                </Col>
                <Col
                  style={{
                    color: '#da3849',
                    fontSize: '80%',
                    marginBottom: '10px',
                    lineHeight: '13px',
                    position: 'relative',
                    bottom: '1px',
                    right: '70px'
                  }}
                >
                  {this.state.isinvalidweightpm && this.state.invalidweightpm}
                </Col>
              </Row>
              <Row>
                <Col className="addpmbox">
                  <Button
                    outline
                    size="sm"
                    color="secondary"
                    disabled={this.state.isinvalidaddpm}
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
                      this.sendData()
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
