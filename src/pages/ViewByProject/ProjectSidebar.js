import React, { Component } from 'react'
import styled from 'styled-components'
import Sidebar from '../../components/Views/Sidebar'
import { FolderOpen } from 'styled-icons/fa-regular/FolderOpen'

import axios from 'axios'
import './ProjectSidebar.css'
import { Link } from 'react-router-dom'
import url from '../../url'
import Percent from '../../components/Views/ViewByProject/Percent'

const Item = styled.div`
  background-color: #ffffff;
  border-bottom: 0.5px solid #e4eaed;
  border-right: 0.5px solid #e4eaed;
`
const FolderIcon = FolderOpen.extend`
  color: #5bc2e1;
`
const HeadContainer = styled.div`
  background-color: #ffffff;
  border-bottom: 0.5px solid #e4eaed;
  border-right: 0.5px solid #e4eaed;
`
const Pm = styled.div`
  display: inline-block;
  text-align: center;
`

class ProjectSidebar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      projects: [],
      weight: 0,
      message: 'ReactInline demo'
    }
    this.update = this.update.bind(this)
  }
  update() {
    this.props.updateHeader()
  }
  componentDidMount() {
    try {
      axios.get(`${url}/project`).then(res => {
        const { data } = res
        this.setState({ projects: data })
      })
    } catch (error) {
      console.log('fail to get data at ProjectSidebar', error)
    }
  }

  render() {
    return (
      <Sidebar>
        <HeadContainer className="headcontainer">
          <div className="head">
            <FolderIcon className="foldericon" />&emsp;Project
          </div>
        </HeadContainer>
        {this.state.projects.map(project => {
          return (
            <Item className="projectitem" key={project.id}>
            <div className="projectnamecontainer" style={{display:'flex'}}>
            <div
                className="projectname"
                style={{
                  width: '85%',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden'
                }}
              >
                <Link
                  className="linkprojectname"
                  to={`/project/${project.id}`}
                  style={{
                    textDecoration: 'none'
                  }}
                  onClick={this.update}
                >
                  {project.name}
                </Link>
              </div>
            </div>
              
              <Percent project={project} />
              <div className="pmcontainer">
                {project.projectManagement.map(pm => {
                  if (!pm.isDisable) {
                    return (
                      <Pm key={pm.id} className="pmname">
                        <Link
                          to={`/person/${pm.users.id}`}
                          style={{ color: 'black', textDecoration: 'none' }}
                          onClick={this.update}
                        >
                          {pm.users.name}
                        </Link>
                      </Pm>
                    )
                  }
                })}
              </div>
            </Item>
          )
        })}
      </Sidebar>
    )
  }
}

export default ProjectSidebar
