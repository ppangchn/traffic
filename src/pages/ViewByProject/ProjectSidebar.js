import React, { Component } from 'react'
import styled from 'styled-components'
import Sidebar from '../../components/Views/Sidebar'
import { FolderOpen } from 'styled-icons/fa-regular/FolderOpen'
import ProjectItem from '../../components/Views/ViewByProject/ProjectItem'
import axios from 'axios'
import './ProjectSidebar.css'
import url from '../../url'

const FolderIcon = FolderOpen.extend`
  color: #5bc2e1;
`
const HeadContainer = styled.div`
  background-color: #ffffff;
  border-bottom: 0.5px solid #e4eaed;
  border-right: 0.5px solid #e4eaed;
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
          return <ProjectItem project={project} />
        })}
      </Sidebar>
    )
  }
}

export default ProjectSidebar
