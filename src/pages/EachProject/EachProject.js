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
  }
  render() {
    // divved', this.props)
    console.log(`PARAMMMM ${this.props.match.params.id}`)
    return (
      <Container>
          <EachProjectSidebar id={this.props.match.params.id}/>
          <EachProjectTimeline id={this.props.match.params.id}/>
      </Container>
    )
  }
}
// const Folder = ({ setLink}) => {
//     console.log(this.props)
//     setLink();
//     return (
//         <div></div>
//     )
// }
export default ViewbyProject
