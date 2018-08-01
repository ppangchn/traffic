import React, { Component } from 'react'
import PersonSidebar from './PersonSidebar'
import PersonTimeline from './PersonTimeline'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: row;
`
class ViewByPerson extends Component {
  constructor() {
    super()
    this.state = { roles: ['all'], canTrigger: false }
  }
  updateRoles(roles) {
    this.setState({ roles })
  }
  triggerLoading() {
    if (this.state.canTrigger) {
      const loader = document.getElementById('loader')
      const viewbyperson = document.getElementById('viewbyperson')
      if (loader) loader.hidden = true
      if (viewbyperson) viewbyperson.hidden = false;
    }
    this.setState({ canTrigger: true })
  }
  componentDidMount() {
    const viewbyperson = document.getElementById('viewbyperson')
    if (viewbyperson) viewbyperson.hidden = true
  }
  render() {
    return (
      <div>
        <div id="loader" className="loader" />
        <Container id="viewbyperson">
          <PersonSidebar
            updateRoles={roles => this.updateRoles(roles)}
            triggerLoading={() => this.triggerLoading()}
          />
          <PersonTimeline
            roles={this.state.roles}
            triggerLoading={() => this.triggerLoading()}
          />
        </Container>
      </div>
    )
  }
}

export default ViewByPerson
