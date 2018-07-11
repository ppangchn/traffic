import React, { Component } from 'react'
import styled from 'styled-components'
import Sidebar from '../../components/Views/Sidebar'
import { FolderOpen } from 'styled-icons/fa-regular/FolderOpen'
import axios from 'axios'
import { Link } from 'react-router-dom'
import url from '../../url'
import Percent from '../../components/Views/ViewByProject/Percent'
import '../ViewByProject/ProjectSidebar.css'
import './PersonalProjectSidebar.css'

const UserName = styled.div`
  border-right: 0.5px solid #dfdfdf;
  border-bottom: 0.5px solid #dfdfdf;
`
const FolderIcon = FolderOpen.extend`
  color: #5bc2e1;
`
const HeadContainer = styled.div`
  background-color: #ffffff;
  border-bottom: 0.5px solid #dfdfdf;
  border-right: 0.5px solid #dfdfdf;
  background-color: #ececec;
`
const Item = styled.div`
  background-color: #ffffff;
  border-bottom: 0.5px solid #dfdfdf;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
`
const Pm = styled.div`
  display: inline-block;
  text-align: center;
`

class ProjectSidebar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {}
    }
  }

  componentDidMount() {
    try {
      axios.get(`${url}/users/${this.props.id}`).then(res => {
        const { data } = res
        this.setState({ data })
        console.log('timeline --->', data.projectTimeline)
      })
    } catch (error) {
      console.log('fail to get data at PersonalProjectSidebar', error)
    }
  }

  render() {
    const { data } = this.state
    return (
      <Sidebar>
        <UserName className="username">{data.name}</UserName>
        <HeadContainer className="personalheadcontainer">
          <div className="head">
            <FolderIcon className="foldericon" />&emsp;Project
          </div>
        </HeadContainer>
        {data.projectTimeline &&
          data.projectTimeline.map(project => {
            if (!project.project.isDisable) {
              return (
                <div key={project.project.name}>
                  <Item className="personalprojectitem">
                    <div className="personalprojectname">
                      <Link
                        className={
                          'linkprojectname-' +
                          String(project.project.color).substring(1)
                        }
                        to={`/project/${project.project.id}`}
                        style={{
                          textOverflow: 'ellipsis',
                          overflow: 'hidden',
                          textDecoration: 'none'
                        }}
                        onClick={this.props.updateHeader}
                      >
                        {project.project.name}
                      </Link>
                    </div>
                    <Percent project={project.project} />
                    <div className="pmcontainer">
                      {project.project.projectManagement.map(pm => {
                        if (!pm.isDisable && pm.users.id != this.props.id) {
                          return (
                            <Pm key={pm.id} className="pmname">
                              <Link
                                to={`/person/${pm.users.id}`}
                                style={{
                                  color: 'black',
                                  textDecoration: 'none'
                                }}
                              >
                                {pm.users.name}
                              </Link>
                            </Pm>
                          )
                        }
                      })}
                    </div>
                  </Item>
                </div>
              )
            }
          })}
      </Sidebar>
    )
  }
}

export default ProjectSidebar
