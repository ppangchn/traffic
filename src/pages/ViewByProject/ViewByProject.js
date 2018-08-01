import React, { Component } from 'react'
import ProjectSideBar from './ProjectSidebar'
import ProjectTimeline from './ProjectTimeline'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: row;
`
class ViewByProject extends Component {

  render() {
    return (
      <Container>
        <ProjectSideBar updateHeader={this.props.updateHeader}/>
        <ProjectTimeline />
      </Container>
    )
  }
}
export default ViewByProject
