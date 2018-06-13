import React, { Component } from 'react';
import Header from './components/Header'
import styled from 'styled-components'

const Container = styled.div`
  background-color : #eaf9fe;
  width : 1920 px;
  height : 1365px;
  -webkit-background-size: cover;
  background-size: cover;
  padding 0;
  border : none;
  margin : 0;
`

class App extends Component {
  render() {
    return (
      <Container>
        <Header/>
      </Container>
    );
  }
}

export default App;
