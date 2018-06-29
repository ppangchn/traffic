import React, { Component } from 'react'
import ProjectSideBar from './ProjectSidebar'
import ProjectTimeline from './ProjectTimeline'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100vw;
`
class ViewByProject extends Component {
  render() {
    return (
      <Container>
          <ProjectSideBar />
          <ProjectTimeline />
      </Container>
    )
  }
}
// const Folder = ({ setLink}) => {
//     console.log(this.props)
//     setLink();
//     return (
//         <div></div>
//     )
// }
export default ViewByProject
