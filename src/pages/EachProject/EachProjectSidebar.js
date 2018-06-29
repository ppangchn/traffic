import React, { Component } from 'react'
import styled from 'styled-components'
import Sidebar from '../../components/Views/Sidebar'
import axios from 'axios'
import '../ViewByProject/ProjectSidebar.css'
import { Progress,Button } from 'reactstrap'
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
    this.state = { timeline: [], project: {}, dropdownOpen: false }
    this.toggle = this.toggle.bind(this)
  }
  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    })
  }
  componentDidMount() {
    // console.log('id', this.props.id)
    axios
      .get(`http://dev.pirsquare.net:3013/traffic-api/project/${this.props.id}`)
      .then(res => {
        const { data } = res
        console.log('Data Project', data)
        this.setState({
          timeline: data.timeline || [],
          project: data.project || {}
        })
      })
  }
  render() {
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
        <div className="buttoncontainer"><Button outline color="secondary" block>+ Add member</Button></div>
        <Link to="/project">back</Link>
      </Sidebar>
    )
  }
}

export default EachProjectSidebar
