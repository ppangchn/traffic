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
<<<<<<< HEAD

=======
  constructor() {
    super()
    this.state = {canTrigger: false}
  }
  triggerLoading() {
    if (this.state.canTrigger) {
      const loader = document.getElementById('loader')
      const personalproject = document.getElementById('personalproject')
      if (loader) loader.hidden = true
      if (personalproject) personalproject.hidden = false;
    }
    this.setState({ canTrigger: true })
  }
  componentDidMount() {
    const personalproject = document.getElementById("personalproject")
    if (personalproject) personalproject.hidden = true;
  }
>>>>>>> 464c1cf18db1b10d14c52bf1eeda1c11bb57940d
  render() {
    return (
      <div>
        <div id="loader" className="loader" />
        <Container id="personalproject">
          <PersonalProjectSidebar id={this.props.match.params.id} triggerLoading={() => this.triggerLoading()}/>
          <PersonalProjectTimeline id={this.props.match.params.id} triggerLoading={() => this.triggerLoading()}/>
        </Container>
      </div>
    )
  }
}

export default PersonalProject
