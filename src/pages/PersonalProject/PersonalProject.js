import React, { Component } from 'react'
import styled from 'styled-components'
import PersonalProjectSidebar from './PersonalProjectSidebar'
import PersonalProjectTimeline from './PersonalProjectTimeline'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  overflow: hidden;
`
class PersonalProject extends Component {
  constructor() {
    super()
    this.state = { canTrigger: false }
  }
  triggerLoading() {
    if (!this.state.canTrigger) {
    const loader = document.getElementById('loader')
    const personalproject = document.getElementById('personalproject')
    if (loader) loader.hidden = true
    if (personalproject) personalproject.hidden = false
    }
  }
  componentDidMount() {
    const personalproject = document.getElementById('personalproject')
    if (personalproject) personalproject.hidden = true
  }
  render() {
    return (
      <div>
        <div id="loader" className="loader" />
        <Container id="personalproject">
          <PersonalProjectSidebar
            id={this.props.match.params.id}
            triggerLoading={() => this.triggerLoading()}
          />
          <PersonalProjectTimeline
            id={this.props.match.params.id}
            triggerLoading={() => this.triggerLoading()}
          />
        </Container>
      </div>
    )
  }
}

export default PersonalProject
