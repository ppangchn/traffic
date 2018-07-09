import React, { Component } from 'react'
import styled from 'styled-components'
import '../../pages/ViewByProject/ProjectSidebar'

const Container = styled.div`
  padding-left: 0px !important;
`

class GraphBox extends Component {
  render() {
    return (
      <Container className="graphbox col col-md-9 col-sm-9 px-0">
        {this.props.children}
      </Container>
    )
  }
}

export default GraphBox
