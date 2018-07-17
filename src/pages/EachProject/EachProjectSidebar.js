import React, { Component } from 'react'
import styled from 'styled-components'
import Sidebar from '../../components/Views/Sidebar'
import axios from 'axios'
import '../ViewByProject/ProjectSidebar.css'
import {
  Progress,
  Button,
  Popover,
  PopoverBody,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter
} from 'reactstrap'
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
import EditTimeline from '../../components/Views/EachProject/EditTimeline'
import DeleteUser from '../../components/Views/EachProject/DeleteUser'
import url from '../../url'

const Head = styled.div`
    padding-top : 10px
    font-size : 20px
`
const HeadContainer = styled.div`
  background-color: #ffffff;
  border-bottom: 0.5px solid #dfdfdf;
  border-right: 0.5px solid #dfdfdf;
  padding-top: 5px;
  padding-bottom: 14px;
`
const ProgressContainer = styled.div`
  margin-left: 15px;
  margin-right: 10px;
  display: flex;
`
const Edit = MoreHoriz.extend`
  color: #5bc2e1;
`
const WhiteTriangle = TriangleUp.extend`
  color: white;
  width: 1.5625rem;
  height: 1.5625rem;
  stroke: #5bc2e1;
  stroke-width: 0.04rem;
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
      modalOpen: false,
      modalDeleteOpen: false,
      updateTimeline: false,
      tags: []
    }
    this.toggle = this.toggle.bind(this)
    this.togglePopOver = this.togglePopOver.bind(this)
    this.deleteProject = this.deleteProject.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
    this.toggleModalDelete = this.toggleModalDelete.bind(this)
    this.getData = this.getData.bind(this)
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
  toggleModalDelete() {
    this.setState({ modalDeleteOpen: !this.state.modalDeleteOpen })
  }
  handleChange = selectedOption => {
    this.sendMember(selectedOption)
  }
  deleteProject() {
    try {
      axios.delete(`${url}/project/${this.props.id}`).then(res => {
        window.history.back()
      })
    } catch (error) {
      console.log('fail to delete project at EachProjectSidebar', error)
    }
  }
  async sendMember(member) {
    try {
      const data = {
        project: parseInt(this.props.id),
        users: member.value
      }
      await axios.put(`${url}/timeline`, data)
      await this.getData()
      await this.props.updateData()

      console.log('send member!')
    } catch (error) {
      console.log('fail to send member at EachProjectSidebar')
    }
  }

  async getData() {
    await this.props.updateData()
    await axios.get(`${url}/project/${this.props.id}`).then(res => {
      const { data } = res
      let projectmember = []
      data.timeline.map(timeline => {
        projectmember.push(timeline.users.id)
      })

      this.setState({
        timeline: data.timeline,
        project: data.project,
        projectmember: projectmember
      })
    })
    await axios.get(`${url}/users/pd`).then(res => {
      const { data } = res
      let allmember = []
      data.map(user => {
        let { projectmember } = this.state
        if (projectmember.indexOf(user.id) === -1) {
          allmember.push({ value: user.id, label: user.name })
        }
      })
      this.setState({ allmember })
    })
  }
  componentDidMount() {
    try {
      this.getData()
    } catch (error) {
      console.log('fail to get data at EachProjectSidebar')
    }
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
                  onClick={this.toggleModalDelete}
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
            <div
              style={{
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                width: '100%',
                float: 'left'
              }}
            >
              {project.name}
            </div>
            <div className="eachprojectprocess">{project.process}%</div>
            <div className="eachprojectedit">
              <Edit className="eachprojectediticon"/>
            </div>
          </div>
          <ProgressContainer>
            <Progress
              color={String(project.color).substring(1)}
              value={project.process}
            />
          </ProgressContainer>
        </div>
        {timeline.map(timeline => {
          if (timeline) {
            return (
              <div
                key={timeline.id}
                id={timeline.id}
                className="eachprojectitem"
              >
                <div
                  className="membername"
                  style={{ display: 'flex', justifyContent: 'flex-end' }}
                >
                  <div style={{ width: '100%', float: 'left' }}>
                    {timeline.users.name}
                  </div>
                  <EditTimeline
                    id={timeline.id}
                    start={timeline.start}
                    end={timeline.end}
                    updateData={() => this.props.updateData()}
                    getData={() => this.getData()}
                  />
                  <DeleteUser
                    id={timeline.id}
                    name={timeline.users.name}
                    roles={timeline.users.roles.name}
                    getData={() => this.getData()}
                  />
                </div>
                <div
                  className="persontagcontainer"
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    overflowX: 'hidden'
                  }}
                >
                  <div className="membertag">{timeline.users.roles.name}</div>
                  {timeline.users.tags.map(tag => {
                    return (
                      <div key={timeline.id} className="membertag">
                        {tag.name}
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          }
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
          <div className="cancelbutton">
            <Link to="/project" style={{ textDecoration: 'none' }}>
              <Button color="danger" block>
                back
              </Button>
            </Link>
          </div>
        </div>
        {this.state.modalOpen && (
          <AddProject
            onClose={() => this.toggleModal(false)}
            id={this.props.id}
          />
        )}
        {this.state.modalDeleteOpen && (
          <Modal
            isOpen={this.state.modalDeleteOpen}
            toggle={this.toggleModalDelete}
            centered={true}
            // className={this.props.className}
          >
            <ModalHeader
              toggle={this.toggleModalDelete}
              style={{ color: '#da3849' }}
            >
              Confirm Delete
            </ModalHeader>
            <ModalBody style={{ display: 'flex' }}>
              Are you sure you want to delete project
              <div
                style={{
                  color: '#da3849',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden'
                }}
              >
                &ensp;"{project.name}"
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="grey" onClick={this.toggleModalDelete}>
                Cancel
              </Button>
              <Button
                color="danger"
                onClick={(this.toggleModalDelete, this.deleteProject)}
              >
                Confirm
              </Button>
            </ModalFooter>
          </Modal>
        )}
      </Sidebar>
    )
  }
}

export default EachProjectSidebar
