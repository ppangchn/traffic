import React,{Component} from 'react'
import PersonSidebar from './PersonSidebar'
import PersonTimeline from './PersonTimeline'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100vw;
`
class ViewByPerson extends Component {
    render() {
        return (
            <Container>
          <PersonSidebar/>
          <PersonTimeline/>
        </Container>
        );
    }
}

export default ViewByPerson;