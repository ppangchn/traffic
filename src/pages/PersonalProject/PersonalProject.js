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

  render() {
    return (
      <Container>
        <PersonalProjectSidebar id={this.props.match.params.id}/>
        <PersonalProjectTimeline id={this.props.match.params.id}/>
      </Container>
    )
  }
}

export default PersonalProject
