import React, { Component } from 'react'
import styled from 'styled-components'
import Sidebar from '../../components/Views/Sidebar'
import axios from 'axios'
import '../ViewByProject/ProjectSidebar.css'
import { Progress, Button, Popover, PopoverBody } from 'reactstrap'
import {
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  ButtonDropdown
} from 'reactstrap'
import { TriangleUp } from 'styled-icons/octicons/TriangleUp'
import { MoreHoriz } from 'styled-icons/material/MoreHoriz'
import './EachProjectSidebar.css'
import { Link } from 'react-router-dom'
import Select from 'react-select'
import { Search as SearchIcon } from 'styled-icons/fa-solid/Search'
import AddProject from '../AddProject/AddProject'

import DeleteUser from '../../components/Views/EachProject/DeleteUser'
const Head = styled.div`
    padding-top : 10px
    font-size : 20px
`
const HeadContainer = styled.div`
  background-color: #ffffff;
  border-bottom: 0.5px solid #dfdfdf;
  padding-top: 5px;
  padding-bottom: 14px;
`
const ProgressContainer = styled.div`
  margin-left: 15px;
  margin-right: 10px;
  display: flex;
`
const Weight = styled.div`
    font-size: 10px
    color: #5bc2e1
    display: flex;
`
const Edit = MoreHoriz.extend`
  color: #5bc2e1;
  width: 1.5625rem;
  height: 1.5625rem;
`
const WhiteTriangle = TriangleUp.extend`
  color: white;
  width: 1.5625rem;
  height: 1.5625rem;
  stroke: #5bc2e1;
  stroke-width: 0.04rem;
`
const Search = SearchIcon.extend`
  background-color: #888888;
`

class EachProjectSidebar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timeline: [],
      project: {},
      dropdownOpen: false,
      search: false,
      allmember: [],
      projectmember: [],
      projectpm: [],
      popoverOpen: false,
      modalOpen: false
    }
    this.toggle = this.toggle.bind(this)
    this.togglePopOver = this.togglePopOver.bind(this)
    this.deleteProject = this.deleteProject.bind(this)
    this.deleteUser = this.deleteUser.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
  }
  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    })
  }
  togglePopOver() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    })
  }
  toggleModal(state) {
    this.setState({
      modalOpen: state
    })
  }
  handleChange = selectedOption => {
    // this.setState({ selectedmember: selectedOption })
    // if (selectedOption) {
    this.sendMember(selectedOption)
    // }
    // selectedOption can be null when the `x` (close) button is clicked
  }
  async sendMember(member) {
    const data = {
      project: parseInt(this.props.id),
      users: member.value
    }
    await axios
      .put('http://dev.pirsquare.net:3013/traffic-api/timeline', data)
      .then(function(response) {
        console.log(response)
      })
      .catch(function(error) {
        console.log(error)
      })
    console.log('send!')
    await this.getData()
  }
  deleteProject() {
    console.log(this.props)
    axios
      .delete(
        `http://dev.pirsquare.net:3013/traffic-api/project/${this.props.id}`
      )
      .then(res => {
        window.history.back()
      })
  }
  deleteUser() {
    // axios
    //   .delete(
    //     `http://dev.pirsquare.net:3013/traffic-api/project/${this.props.id}`
    //   )
  }
  async getPm() {
    await axios
      .get(`http://dev.pirsquare.net:3013/traffic-api/Management`)
      .then(res => {
        const { data } = res
        // console.log('Data Project', data)
        let projectpm = []
        data.map(user => {
          projectpm.push({
            name: user.users.name,
            roles: user.users.roles.name,
            tags: user.users.tags
          })
        })
        this.setState({
          projectpm
        })
      })
  }

  async getData() {
    await this.getPm()
    await axios
      .get(`http://dev.pirsquare.net:3013/traffic-api/project/${this.props.id}`)
      .then(res => {
        const { data } = res
        // console.log('Data Project', data)
        let projectmember = []
        data.timeline.map(timeline => {
          projectmember.push(timeline.users.id)
        })
        // console.log(projectmember)
        this.setState({
          timeline: data.timeline,
          project: data.project,
          projectmember: projectmember
        })
      })
    await axios
      .get(`http://dev.pirsquare.net:3013/traffic-api/users/pd`)
      .then(res => {
        const { data } = res
        // console.log('Data allmember', data)
        let allmember = []
        // console.log(this.state.projectmember)
        data.map(user => {
          let { projectmember } = this.state
          // console.log('projectmember', projectmember)
          if (projectmember.indexOf(user.id) === -1) {
            allmember.push({ value: user.id, label: user.name })
          }
        })
        // console.log('allmember -> ', allmember)
        this.setState({ allmember })
      })
  }
  async componentDidMount() {
    // console.log('id', this.props.id)
    await this.getPm()
    await this.getData()
  }
  render() {
    const { project, timeline } = this.state
    return (
      <Sidebar>
        <HeadContainer>
          <Head>&emsp;Name</Head>
        </HeadContainer>
        <div className="eachprojecthead">
          <div>
            <ButtonDropdown
              className="btn-secondary"
              isOpen={this.state.btnDropright}
              toggle={() => {
                this.setState({ btnDropright: !this.state.btnDropright })
              }}
            >
              <DropdownToggle>
                <Edit />
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu">
                <DropdownItem
                  className="dropdownitem"
                  style={{
                    borderBottom: '1px solid #5bc2e1',
                    borderRadius: '0.2rem 0.2rem 0 0'
                  }}
                >
                  {/* <div
                    style={{
                      position: 'absolute',
                      zIndex: '1',
                      left: '4.27rem',
                      bottom: '72px'
                    }}
                  >
                    <WhiteTriangle />
                  </div>
                  <div className="bottomtriangle">_</div> */}
                  <div onClick={() => this.toggleModal(true)}>Edit Project</div>
                </DropdownItem>
                <DropdownItem
                  onClick={this.deleteProject}
                  className="dropdowndeleteitem"
                  style={{
                    color: '#f67879',
                    borderRadius: '0 0 0.2rem 0.2rem'
                  }}
                >
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>
          </div>

          <div className="eachprojectname">
            {project.name}
            <div className="eachprojectweight">{project.weight}%</div>
          </div>
          <ProgressContainer>
            <Progress color={String(project.color).substring(1)} value="10" />
          </ProgressContainer>
        </div>
        {this.state.projectpm.map(user => {
          return (
            <div className="eachprojectitem">
              <div className="membername">
                {user.name}
                <DeleteUser id={user.id} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div className="membertag">{user.roles}</div>
                <div className="membertag">{user.tags}</div>
              </div>
            </div>
          )
        })}
        {timeline.map(timeline => {
          return (
            <div className="eachprojectitem">
              <div className="membername">
                {timeline.users.name}
                <DeleteUser id={timeline.users.id} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div className="membertag">{timeline.users.roles.name}</div>
                <div className="membertag">{timeline.users.tags}</div>
              </div>
            </div>
          )
        })}
        <Popover
          placement="bottom !important"
          isOpen={this.state.popoverOpen}
          target="Popover"
          toggle={this.togglePopOver}
          className="addmemberpopover"
          hideArrow={true}
        >
          <PopoverBody>
            <Select
              // style={{borderColor:''}}
              // name="form-field-name"
              closeOnSelect={false}
              value={this.state.selectedmember}
              onChange={this.handleChange}
              options={this.state.allmember}
              autoFocus={true}
              open={true}
              openOnFocus={true}
            />
          </PopoverBody>
        </Popover>
        <div className="buttoncontainer">
          <Button
            outline
            color="secondary"
            block
            onClick={this.togglePopOver}
            id="Popover"
          >
            + Add member
          </Button>
          <Link to="/project" style={{ textDecoration: 'none' }}>
            <Button color="danger" block>
              back
            </Button>
          </Link>
        </div>
        {this.state.modalOpen && (
          <AddProject
            onClose={() => this.toggleModal(false)}
            id={this.props.id}
          />
        )}
      </Sidebar>
    )
  }
}

export default EachProjectSidebar
