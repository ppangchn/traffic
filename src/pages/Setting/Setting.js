import React, { Component } from 'react'

import {
  Container,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Row,
  Col
} from 'reactstrap'
import classnames from 'classnames'
import './Setting.css'
import { PersonAdd } from 'styled-icons/material/PersonAdd'
import UserSettings from '../../components/UserSettings/UserSettings'
import AddMember from '../AddMember/AddMember'
import url from '../../url'
import axios from 'axios'

const IconAdd = PersonAdd.extend`
  width: 100px;
  height: 100px;
  color: gray;
  display: inline-block;
  border-radius: 10px;
  cursor: pointer !important;
`

class Setting extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTab: '0',
      users: [],
      roles: [],
      tags: [],
      toggleAddModal: false,
      add: <IconAdd className="iconadd" />
    }
    this.toggle = this.toggle.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  toggle = tab => {
    console.log('Toggle', tab)
    this.setState({
      activeTab: tab
    })
    this.selectURL(tab)
  }
  selectURL(tab) {
    switch (tab) {
      case '1':
        return this.fetchData(`${url}/users`)
      case '2':
        return this.fetchData(`${url}/users/findPM`)
      case '3':
        return this.fetchData(`${url}/users/findPD`)
      default:
        return this.fetchData(`${url}/users`)
    }
  }

  toggleSave() {
    if (this.state.projectname && this.state.filteredPM.length !== 0)
      this.setState({ open: !this.state.open })
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
    if (selectedOption) {
      console.log(`Selected: ${selectedOption.label}`)
    }
  }

  fetchData = url => {
    axios.get(url).then(res => {
      const { data } = res

      let users = []
      let roles = []
      let tags = []
      data.map(e => {
        users.push({ id: e.id, name: e.name })
        roles.push(e.roles)
        tags.push(e.tags)
      })

      this.setState({ users, roles, tags })
    })
  }

  componentDidMount() {
    this.toggle('1')
  }

  toggleAddModal = state => {
    this.setState({
      toggleAddModal: state
    })
  }

  clear() {
    let def = this.state.icondefault
    this.setState({
      folder: def.folder,
      person: def.person,
      setting: def.setting,
      list: def.list,
      add: def.add
    })
  }

  render() {
    const { toggleAddModal } = this.state
    return (
      <Container className="mt-5">
        <Row>
          <Col md={12}>
            <Nav tabs className="mx-1">
              <NavItem>
                <NavLink
                  className="tap"
                  className={classnames({
                    active: this.state.activeTab === '1'
                  })}
                  onClick={() => {
                    this.toggle('1')
                  }}
                >
                  All
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === '2'
                  })}
                  onClick={() => {
                    this.toggle('2')
                  }}
                >
                  Management
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === '3'
                  })}
                  onClick={() => {
                    this.toggle('3')
                  }}
                >
                  Production
                </NavLink>
              </NavItem>
            </Nav>

            <TabContent activeTab={this.state.activeTab} className="mx-1">
              <TabPane tabId="1">
                <Row>
                  <Col md={4} sm={4} className="mb-4">
                    <Card body className="h-150 iconcontainer">
                      <div>
                        <NavLink  className="nav-link-addicon" onClick={e => this.toggleAddModal(true)}>
                          <div className="addmembericon">{this.state.add}</div>
                        </NavLink>
                      </div>
                    </Card>
                  </Col>

                  {this.state.users.map((users, index) => {
                    return (
                      <UserSettings
                        key={users.id}
                        id={users.id}
                        getData={() => this.selectURL(this.state.activeTab)}
                        users={users}
                        roles={this.state.roles[index]}
                        tags={this.state.tags[index]}
                      />
                    )
                  })}
                </Row>
              </TabPane>

              <TabPane tabId="2">
                <Row>
                  <Col md={4} sm={4} className="mb-4">
                    <Card body className="h-150 iconcontainer">
                      <div>
                        <NavLink onClick={e => this.toggleAddModal(true)}>
                          <div className="addmembericon">{this.state.add}</div>
                        </NavLink>
                      </div>
                    </Card>
                  </Col>
                  {this.state.users.map((users, index) => {
                    return (
                      <UserSettings
                        key={users.id}
                        id={users.id}
                        getData={() => this.selectURL(this.state.activeTab)}
                        users={users}
                        roles={this.state.roles[index]}
                        tags={this.state.tags[index]}
                      />
                    )
                  })}
                </Row>
              </TabPane>

              <TabPane tabId="3">
                <Row>
                  <Col md={4} sm={4} className="mb-4">
                    <Card body className="h-150 iconcontainer">
                      <div>
                        <NavLink onClick={e => this.toggleAddModal(true)}>
                          <div className="addmembericon">{this.state.add}</div>
                        </NavLink>
                      </div>
                    </Card>
                  </Col>
                  {this.state.users.map((users, index) => {
                    return (
                      <UserSettings
                        key={users.id}
                        id={users.id}
                        getData={() => this.selectURL(this.state.activeTab)}
                        users={users}
                        roles={this.state.roles[index]}
                        tags={this.state.tags[index]}
                      />
                    )
                  })}
                </Row>
              </TabPane>
            </TabContent>
          </Col>
        </Row>

        {toggleAddModal && (
          <AddMember
            getData={() => this.selectURL(this.state.activeTab)}
            onClose={() => this.toggleAddModal(false)}
          />
        )}
      </Container>
    )
  }
}

export default Setting
