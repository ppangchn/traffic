import React, { Component } from 'react'
import EachProjectSidebar from './EachProjectSidebar'
import EachProjectTimeline from './EachProjectTimeline'
import styled from 'styled-components'
const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100vw;
`
class ViewbyProject extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Container>
          <EachProjectSidebar id={this.props.match.params.id}/>
          <EachProjectTimeline id={this.props.match.params.id}/>
      </Container>
    )
  }
}
export default ViewbyProject
