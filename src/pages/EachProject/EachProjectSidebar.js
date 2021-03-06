import React, { Component } from 'react'
import styled from 'styled-components'
import Sidebar from '../../components/Views/Sidebar'
import axios from 'axios'
import EachProjectItem from '../../components/Views/EachProject/EachProjectItem'
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
import AddProject from '../AddProject/AddProject'
import url from '../../url'

const Head = styled.div`
    padding-top : 10px
    font-size : 20px
`
const HeadContainer = styled.div`
  background-color: #ffffff;
  border-bottom: 0.5px solid #e4eaed;
  border-right: 0.5px solid #e4eaed;
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
      // this.props.loader.hidden = false;
      // this.props.eachproject.hidden = true;
      const data = {
        project: parseInt(this.props.id),
        users: member.value
      }
      await axios.put(`${url}/timeline`, data)
      this.getData()
      this.props.updateData()
    } catch (error) {
      console.log('fail to send member at EachProjectSidebar')
    }
    // this.props.triggerLoading();
  }

  async getData() {
    await axios.get(`${url}/project/${this.props.id}`).then(res => {
      const { data } = res
      let projectmember = []
      data.timeline.map(timeline => {
        projectmember.push(timeline.users.id)
      })
      this.props.updateData()
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
    this.props.triggerLoading()
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
        <HeadContainer className="eachprojectheadcontainer">
          <Head>&emsp;Name</Head>
        </HeadContainer>
        <div className="eachprojecthead">
          <div className="eachprojectname">
            <div
              style={{
                whiteSpace: 'nowrap',
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
              <ButtonDropdown
                className="btn-secondary"
                isOpen={this.state.btnDropright}
                toggle={() => {
                  this.setState({ btnDropright: !this.state.btnDropright })
                }}
              >
                <DropdownToggle style={{ paddingBottom: '0' }}>
                  <Edit className="eachprojectediticon" />
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu">
                  <DropdownItem
                    className="dropdownitem"
                    style={{
                      borderBottom: '1px solid #5bc2e1',
                      borderRadius: '0.2rem 0.2rem 0 0',
                      padding: '0'
                    }}
                    onClick={() => this.toggleModal(true)}
                  >
                    Edit Project
                  </DropdownItem>
                  <DropdownItem
                    onClick={this.toggleModalDelete}
                    className="dropdowndeleteitem"
                    style={{
                      color: '#f67879',
                      borderRadius: '0 0 0.2rem 0.2rem',
                      padding: '0'
                    }}
                  >
                    Delete Project
                  </DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
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
              <EachProjectItem
                key={'eachprojectSidebar' + timeline.id}
                timeline={timeline}
                getData={() => this.getData()}
                updateData={this.props.updateData}
              />
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
            getData={() => this.getData()}
          />
        )}
        {this.state.modalDeleteOpen && (
          <Modal
            isOpen={this.state.modalDeleteOpen}
            toggle={this.toggleModalDelete}
            centered={true}
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
                &nbsp;"{project.name}"
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
