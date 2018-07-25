import React, { Component } from 'react'
import EachProjectSidebar from './EachProjectSidebar'
import EachProjectTimeline from './EachProjectTimeline'
import styled from 'styled-components'
const Container = styled.div`
  display: flex;
  flex-direction: row;
`

class ViewbyProject extends Component {
  constructor(props) {
    super(props)
    this.state = { fetchData: Date.now() }
  }
  updateData = () => {
    this.setState({ fetchData: Date.now() })
  }
  render() {
    return (
      <Container>
        <EachProjectSidebar
          id={this.props.match.params.id}
          updateData={this.updateData}
        />
        <EachProjectTimeline
          id={this.props.match.params.id}
          fetchData={this.state.fetchData}
        />
      </Container>
    )
  }
}
export default ViewbyProject
