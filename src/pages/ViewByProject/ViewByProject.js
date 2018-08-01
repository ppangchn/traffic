import React, { Component } from 'react'
import ProjectSideBar from './ProjectSidebar'
import ProjectTimeline from './ProjectTimeline'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: row;
`
class ViewByProject extends Component {
  constructor(props) {
    super(props)
    this.state = {canTrigger: false}
  }
  triggerLoading() {
    if (this.state.canTrigger) {
      const loader = document.getElementById("loader")
      loader.hidden = true;
    }
    this.setState({canTrigger:true})
  }
  render() {
    return (
      <Container>
        <div id="loader" className="loader"></div>
        <ProjectSideBar updateHeader={this.props.updateHeader} triggerLoading={() => this.triggerLoading()}/>
        <ProjectTimeline triggerLoading={() => this.triggerLoading()}/>
      </Container>
    )
  }
}
export default ViewByProject
