import React, { Component } from 'react'
import styled from 'styled-components'
import { Container, Row, Col } from 'reactstrap'
import Sidebar from '../../components/Views/Sidebar'
import { FolderOpen } from 'styled-icons/fa-regular/FolderOpen'
import { Progress } from 'reactstrap'
import axios from 'axios'
import './ProjectSidebar.css'
import { Link } from 'react-router-dom'
import EachProject from '../EachProject/EachProject'
const Item = styled.div`
    background-color : #ffffff;
    border-bottom : 0.5px solid #dfdfdf;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
`
const FolderIcon = FolderOpen.extend`
  width: 10%;
  height: 10%;
  color: #5bc2e1;
  margin-bottom: 0.1875rem;
  margin-left: 20px;
`

const Head = styled.div`
    padding-top : 0.625rem
`
const HeadContainer = styled.div`
    background-color : #ffffff;
    border-bottom : 0.5px solid #dfdfdf;
    padding-top: 5px;
    padding-bottom: 11px;
`
const Pm = styled.div`
  display: inline-block;
  text-align: center;
`
const Weight = styled.div`
    font-size: 0.625rem
    color: #5bc2e1
    display: flex;
`
class ProjectSidebar extends Component {
  constructor() {
    super()
    this.state = { projects: [] }
  }
  componentDidMount() {
    axios.get(`http://dev.pirsquare.net:3013/traffic-api/project`).then(res => {
      const { data } = res
      console.log('Data Project', data)
      this.setState({ projects: data })
    })
  }
  render() {
    return (
      <Sidebar>
        <HeadContainer className="projecthead">
          <Head>
            <FolderIcon />&emsp;Project
          </Head>
        </HeadContainer>
        {this.state.projects.map(project => {
          // console.log(project.color.substring(1))
          // console.log("IDDDDD",project.id)
          return (
            <div>
              <Item className="projectitem">
                <div className="projectname">
                  <Link
                    className={"linkprojectname-"+project.color.substring(1)}
                    // style={{color: 'black'}}
                    to={`/project/${project.id}`}
                  >
                    {project.name}
                  </Link>{' '}
                  {project.weight}&ensp;
                </div>
                <div className="progresscontainer">
                  <Progress
                    color={project.color.substring(1)}
                    value="10"
                    style={{ borderRadius: '8px' }}
                  />
                </div>
                <div className="pmcontainer">
                  {project.projectManagement.map(pm => {
                    return <Pm className="pmname">{pm.user.name}</Pm>
                  })}
                </div>
              </Item>
            </div>
          )
        })}
      </Sidebar>
    )
  }
}

export default ProjectSidebar
