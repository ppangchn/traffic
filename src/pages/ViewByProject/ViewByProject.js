import React, { Component } from 'react'
import ProjectSideBar from './ProjectSidebar'
import ProjectTimeline from './ProjectTimeline'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: row;
`
class ViewByProject extends Component {
<<<<<<< HEAD

=======
  constructor(props) {
    super(props)
    this.state = { canTrigger: false }
  }
  triggerLoading() {
    if (this.state.canTrigger) {
      const loader = document.getElementById('loader')
      const viewbyproject = document.getElementById('viewbyproject')
      if (loader) loader.hidden = true
      if (viewbyproject) viewbyproject.hidden = false
    }
    this.setState({ canTrigger: true })
  }
  componentDidMount() {
    const viewbyproject = document.getElementById('viewbyproject')
    if (viewbyproject) viewbyproject.hidden = true
  }
>>>>>>> 464c1cf18db1b10d14c52bf1eeda1c11bb57940d
  render() {
    return (
      <div>
        <div id="loader" className="loader" />
        <Container id="viewbyproject">
          <ProjectSideBar
            updateHeader={this.props.updateHeader}
            triggerLoading={() => this.triggerLoading()}
          />
          <ProjectTimeline triggerLoading={() => this.triggerLoading()} />
        </Container>
      </div>
    )
  }
}
export default ViewByProject
