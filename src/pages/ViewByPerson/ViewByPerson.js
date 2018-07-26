import React,{Component} from 'react'
import PersonSidebar from './PersonSidebar'
import PersonTimeline from './PersonTimeline'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: row;
//   overflow-y: scroll;
`
class ViewByPerson extends Component {
    constructor() {
        super();
        this.state = {roles: ['all']}
    }
    updateRoles(roles) {
        this.setState({roles})
    }
    render() {
        return (
            <Container>
          <PersonSidebar updateRoles={(roles) => this.updateRoles(roles)}/>
          <PersonTimeline roles={this.state.roles}/>
        </Container>
        );
    }
}

export default ViewByPerson;