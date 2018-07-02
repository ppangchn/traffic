import React, { Component } from 'react'
import styled from 'styled-components'


const Container = styled.div`
  background-color: white;
  height: 200vh;
  padding-left: 0px !important;
  padding-right: 0px !important;
`

class Sidebar extends Component {

  render() {
    return (
      <Container className="col col-md-3 col-xs-3 px-0">
        {this.props.children}
      </Container>
    )
  }
}

export default Sidebar
