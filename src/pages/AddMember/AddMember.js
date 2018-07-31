import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import {
  Button,
  Form,
  Modal,
  ModalHeader,
  ModalBody,
  Input,
  FormFeedback,
  ModalFooter
} from 'reactstrap'
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
import Slider from 'rc-slider'

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
      tags: [],
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
      invalidcapacity: false,
      invalidrolesmessage: 'Please select one role for this member.',
      invalidcapacitymessage: 'Please choose capacity',
      sendResetPass: false,
      capacity: 100
    }

    this.toggle = this.toggle.bind(this)
    this.toggledrop = this.toggledrop.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleInputChangeEmail = this.handleInputChangeEmail.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.sendDataMember = this.sendDataMember.bind(this)

    // lib tag
    this.handleDelete = this.handleDelete.bind(this)
    this.handleAddition = this.handleAddition.bind(this)
  }

  toggle() {
    this.setState({ open: !this.state.open })
    this.props.onClose()
  }
  toggleSave() {
    if (this.state.name && this.state.roles && this.state.tags !== 0)
      this.setState({ open: !this.state.open })
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

    this.setState({ name: e.target.value })
  }

  handleCheckboxChange = e => {
    this.setState({
      [e.target.name]: e.target.checked
    })
  }

  handleInputChangeEmail(e) {
    if (e) this.setState({ invalidemail: false })
    let { email } = this.state

    this.setState({ email: e.target.value })
  }

  handleChange = selectedOption => {
    this.setState({ roles: selectedOption })

    if (selectedOption) {
      this.setState({ invalidroles: false })
    }
  }
  slideChange(value) {
    this.setState({ capacity: value, invalidcapacity: false })
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

  async sendDataMember(e) {
    e.preventDefault()
    try {
      if (
        this.state.name &&
        this.state.roles &&
        this.state.email &&
        this.state.capacity
      ) {
        const data = {
          id: this.state.id,
          name: this.state.name,
          roles: this.state.roles.value,
          tags: this.state.tags.map($objTag => {
            return { name: $objTag.name }
          }),
          email: this.state.email,
          capacity: this.state.capacity
        }
        await axios.put(`${url}/users`, data)
        if (this.state.sendResetPass) {
          try {
            axios.post(`${url}/users/forgotpass`, data)
            // .then(console.log('send resetpassword!'))
          } catch (error) {
            console.log('cant send member', error)
          }
        }
        this.toggleSave()
        this.props.getData()
        this.props.onClose()
      } else {
        if (!this.state.capacity) this.setState({ invalidcapacity: true })
        if (!this.state.name) this.setState({ invalidname: true })
        if (!this.state.roles) this.setState({ invalidroles: true })
        if (!this.state.email) this.setState({ invalidemail: true })
      }
    } catch (error) {}
  }

  componentDidMount() {
    try {
      if (this.props.id) {
        axios.get(`${url}/users`).then(res => {
          const { data } = res
          data.map(user => {
            if (user.id === this.props.id) {
              let tags = user.tags.map(tag => {
                return {
                  id: String(tag.id),
                  name: tag.name,
                  created: tag.created,
                  update: tag.update,
                  isDisable: tag.isDisable
                }
              })
              this.setState(
                {
                  id: user.id,
                  name: user.name,
                  roles: {
                    value: user.roles.id,
                    label: user.roles.name
                  },
                  tags,
                  email: user.email,
                  header: 'Edit Member',
                  capacity: user.capacity
                },
                () => console.log('tags->', this.state.tags, user.tags)
              )
            }
          })
        })
      }

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
      console.log('cant get member at addmember', error)
    }
  }

  handleDelete(i) {
    const { tags } = this.state
    this.setState({
      tags: tags.filter((tag, index) => index !== i)
    })
  }

  handleAddition(tag) {
    // if (this.state.tags.indexOf(tag) !== -1) {
      this.setState(state => ({
        tags: [...state.tags, { id: String(tag.id), name: tag.text }]
      }))
    // }
  }

  handleDrag(tag, currPos, newPos) {
    const tags = [...this.state.tags]
    const newTags = tags.slice()

    newTags.splice(currPos, 1)
    newTags.splice(newPos, 0, tag)

    // re-render
    this.setState({ tags: newTags })
  }
  componentWillReceiveProps(props) {
    console.log(props)
  }
  render() {
    const { onClose } = this.props
    const { tags, suggestions } = this.state

    return (
      <Container>
        <Modal
          style={{ fontSize: '1rem' }}
          size="5"
          isOpen={this.state.open}
          toggle={onClose}
        >
          <ModalHeader toggle={onClose}>
            <div className="title">{this.state.header}</div>
          </ModalHeader>
          <ModalBody>
            <Container>
              <Form onSubmit={this.sendDataMember}>
                <Row className="title">
                  <Col className="mb-3">
                    Name
                    <input
                      style={{ fontSize: '8px !important' }}
                      name="name"
                      className="inputform2"
                      placeholder="Type your name"
                      onChange={this.handleInputChange}
                      value={this.state.name}
                      invalid={this.state.invalidname}
                      required
                    />
                  </Col>
                </Row>
                <Row>
                  <Col className="mb-3">
                    <div className="title">Roles</div>
                    <div className="select-pm">
                      <Select
                        placeholder="Select role"
                        value={this.state.roles}
                        onChange={this.handleChange}
                        options={this.state.listroles}
                        trimFilter
                        required
                        clearable={false}
                      />
                    </div>
                  </Col>
                </Row>
                {!this.state.roles.label ||
                  (['DEV', 'DSN', 'QA', 'TS'].indexOf(
                    this.state.roles.label
                  ) === -1 && (
                    <Row className="title">
                      <Col className="mb-3">
                        Max Capacity : {this.state.capacity}
                        <Slider
                          trackStyle={{
                            backgroundColor: '#5ac2e2'
                          }}
                          min={0}
                          max={200}
                          step={10}
                          defaultValue={100}
                          onChange={e => this.slideChange(e)}
                          value={this.state.capacity}
                        />
                      </Col>
                    </Row>
                  ))}
                <div
                  className="invalid"
                  style={{
                    lineHeight: '0',
                    position: 'relative',
                    bottom: '8px'
                  }}
                >
                  {this.state.invalidcapacity &&
                    this.state.invalidcapacitymessage}
                </div>

                <Row className="title">
                  <Col className="mb-3">
                    Tags
                    <div className="tag-full-w">
                      <ReactTags
                        className="taginput"
                        tags={tags}
                        labelField={'name'}
                        handleDelete={this.handleDelete}
                        handleAddition={this.handleAddition}
                        delimiters={delimiters}
                      />
                    </div>
                  </Col>
                </Row>

                <Row className="title">
                  <Col className="mb-3">
                    Email
                    <input
                      style={{ fontSize: '20px !important' }}
                      name="name"
                      className="inputform2"
                      type="email"
                      placeholder="example@pirsquare.net"
                      onChange={this.handleInputChangeEmail}
                      value={this.state.email}
                      invalid={this.state.invalidemail}
                      required
                    />
                  </Col>
                </Row>

                {!this.state.roles.label ||
                  (['DEV', 'DSN', 'QA', 'TS'].indexOf(
                    this.state.roles.label
                  ) === -1 && (
                    <div className="checkbox" style={{ display: 'flex' }}>
                      <input
                        name="sendResetPass"
                        type="checkbox"
                        className="mr-3"
                        onChange={this.handleCheckboxChange}
                        id="resetpassword"
                      />
                      <label htmlFor="resetpassword" />
                      <div className="sendresetpasswordtext">
                        Send Reset Password
                      </div>
                    </div>
                  ))}
                <Row className="title">
                  <Col className="mb-3">
                    <Button color="5bc2e1" size="lg" block>
                      Save
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Container>
          </ModalBody>
        </Modal>
      </Container>
    )
  }
}
export default withRouter(AddMember)
