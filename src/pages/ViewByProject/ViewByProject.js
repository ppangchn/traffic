import React, { Component } from 'react'
import ProjectSideBar from './ProjectSidebar'
import ProjectTimeline from './ProjectTimeline'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  overflow: hidden;
`
class ViewByProject extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Container>
        <ProjectSideBar updateHeader={this.props.updateHeader}/>
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
