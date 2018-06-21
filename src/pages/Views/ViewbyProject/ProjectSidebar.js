import React, { Component } from 'react'
import styled from 'styled-components'
import { Container, Row, Col } from 'reactstrap'
import Sidebar from '../components/Sidebar'
import { FolderOpen } from 'styled-icons/fa-regular/FolderOpen'
import { Progress } from 'reactstrap'
import axios from 'axios'
import './ProjectSidebar.css'
const Item = styled.div`
    width : 300px
    height : 80px
    background-color : #ffffff;
    font-family : Verdana
    border-bottom : 0.5px solid #dfdfdf;
`
const FolderIcon = FolderOpen.extend`
    width : 25px;
    height : 25px;
    color : #5bc2e1;
    margin-bottom : 5px
    margin-left : 20px
`

const Head = styled.div`
    padding-top : 10px
    font-size : 20px
`
const HeadContainer = styled.div`
    width : 300px
    height : 60px
    background-color : #ffffff;
    font-family : Verdana
    border-bottom : 0.5px solid #dfdfdf;
    padding-top: 5px;
    padding-bottom: 14px;
`
const Projectname = styled.div`
  margin-left: 20px;
  padding-top: 15px;
  padding-right: 25px;
  padding-bottom: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const Pm = styled.div`
  border: 2px solid #5bc2e1;
  border-radius: 10px;
  font-size: 10px;
  display: inline-block;
  text-align: center;
  float: right;
  padding-left: 5px;
  padding-right: 5px;
  margin-right: 2px;
`
const ProgressContainer = styled.div`
  width: 250px;
  margin-left: 22px;
`
const Weight = styled.div`
    font-size: 10px
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
        <HeadContainer>
          <Head>
            <FolderIcon />&emsp;Project
          </Head>
        </HeadContainer>
        {this.state.projects.map(project => {
          return (
            <div>
              <Item>
                <Projectname>
                  {project.name}&ensp;
                  <div style={{}}>
                    {project.projectManagement.map(pm => {
                      return <Pm>{pm.users.name}</Pm>
                    })}
                  </div>
                </Projectname>
                <ProgressContainer>
                  <Progress
                    animated
                    color={project.color.substring(1)}
                    value="10"
                  />
                </ProgressContainer>
              </Item>
            </div>
          )
        })}
      </Sidebar>
    )
  }
}

export default ProjectSidebar
