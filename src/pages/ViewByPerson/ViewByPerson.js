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
      loader.hidden = true
    }
    this.setState({ canTrigger: true })
  }
  render() {
    return (
      <Container>
        <div id="loader" className="loader" />
        <PersonSidebar
          updateRoles={roles => this.updateRoles(roles)}
          triggerLoading={() => this.triggerLoading()}
        />
        <PersonTimeline
          roles={this.state.roles}
          triggerLoading={() => this.triggerLoading()}
        />
      </Container>
    )
  }
}

export default ViewByPerson
