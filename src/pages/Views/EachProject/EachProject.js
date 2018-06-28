import React, { Component } from 'react'
import EachProjectSidebar from './EachProjectSidebar'
import EachProjectTimeline from './EachProjectTimeline'

class ViewbyProject extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    // divved', this.props)
    return (
      <div>
          <EachProjectSidebar id={this.props.match.params.id}/>
          <EachProjectTimeline id={this.props.match.params.id}/>
      </div>
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
