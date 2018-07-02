import React, { Component } from 'react'
import styled from 'styled-components'
import Sidebar from '../../components/Views/Sidebar'
import axios from 'axios'
import '../ViewByProject/ProjectSidebar.css'
import { Progress, Button } from 'reactstrap'
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
class EachProjectSidebar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timeline: [],
      project: {},
      dropdownOpen: false,
      search: false,
      allmember: [],
      selectedmember: '',
      projectmember: [],
      errorselectmember: 'Please select member before save :)',
      isSaved: false
    }
    this.toggle = this.toggle.bind(this)
  }
  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    })
  }
  handleChange = selectedOption => {
    this.setState({ selectedmember: selectedOption })
    // selectedOption can be null when the `x` (close) button is clicked
  }
  addMember = () => {
    this.setState({
      search: true
    })
  }
  sendMember = () => {
    this.setState({ isSaved: true })
    if (this.state.selectedmember) {
      const data = {
        projectId: this.props.id,
        useresId: this.state.selectedmember.value
      }
      axios
        .put('http://dev.pirsquare.net:3013/traffic-api/timeline', data)
        .then(function(response) {
          console.log(response)
        })
        .catch(function(error) {
          console.log(error)
        })
      console.log('send!')
      this.setState({ search: false, selectedmember: '' })
    }
  }
  async componentDidMount() {
    // console.log('id', this.props.id)
    await axios
      .get(`http://dev.pirsquare.net:3013/traffic-api/project/${this.props.id}`)
      .then(res => {
        const { data } = res
        // console.log('Data Project', data)
        let projectmember = []
        data.timeline.map(timeline => {
          projectmember.push(timeline.users.id)
        })
        console.log(projectmember)
        this.setState({
          timeline: data.timeline || [],
          project: data.project || {},
          projectmember: projectmember
        })
      }, console.log('get project member fail'))
    await axios
      .get(`http://dev.pirsquare.net:3013/traffic-api/users/pd`)
      .then(res => {
        const { data } = res
        // console.log('Data Project', data)
        let allmember = []
        console.log(this.state.projectmember)
        data.map(user => {
          let { projectmember } = this.state
          console.log('projectmember', projectmember)
          if (projectmember.indexOf(user.id) === -1) {
            allmember.push({ value: user.id, label: user.name })
          }
        })
        console.log('allmember -> ', allmember)
        this.setState({ allmember })
      }, console.log('get allmember fail'))
  }
  render() {
    console.log('render1')
    const { project, timeline } = this.state
    return (
      <Sidebar>
        <HeadContainer>
          <Head>&emsp;Name</Head>
        </HeadContainer>
        <div className="eachprojecthead">
          {' '}
          <div className="eachprojectname">
            {project.name}
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
                  <div>Edit Project</div>
                </DropdownItem>
                <DropdownItem
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
          <ProgressContainer>
            <Progress
              color={String(project.color).substring(1)}
              value="10"
              style={{ borderRadius: '8px' }}
            />
          </ProgressContainer>
        </div>
        {timeline.map(timeline => {
          return (
            <div className="eachprojectitem">
              <div className="membername">{timeline.users.name}</div>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div className="membertag">{timeline.users.roles.name}</div>
                <div className="membertag">{timeline.users.tags}</div>
              </div>
            </div>
          )
        })}
        {this.state.search && (
          <div>
            <Select
              // name="form-field-name"
              value={this.state.selectedmember}
              onChange={this.handleChange}
              options={this.state.allmember}
            />
            <Button color="5bc2e1" size="sm" block onClick={this.sendMember}>
              Save
            </Button>
          </div>
        )}
        <div className="buttoncontainer">
          <Button outline color="secondary" block onClick={this.addMember}>
            + Add member
          </Button>
          <div className="error">
            {(!this.state.isSaved && !this.state.selectedmember) ||
              this.state.errorselectmember}
          </div>
        </div>
        <Link to="/project">back</Link>
      </Sidebar>
    )
  }
}

export default EachProjectSidebar
