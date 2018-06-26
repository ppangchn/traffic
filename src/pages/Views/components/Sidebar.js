import React, { Component } from 'react'
import styled from 'styled-components'


const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  height: 33.8rem;
  
`

class Sidebar extends Component {
  constructor(props) {
    super(props)
    // this.state={border: ''}
  }
AddBorder() {}
  render() {
    return (
      <Container>
        {this.props.children}
      </Container>
    )
  }
}

export default Sidebar
