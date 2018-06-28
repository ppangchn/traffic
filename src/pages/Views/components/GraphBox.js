import React, { Component } from 'react'
import './GraphBox.css'
import '../../components/react-calendar-timeline/lib/Timeline.css'
import '../ViewByProject/ProjectSidebar.css'
class GraphBox extends Component {


  render() {
    // console.log('groups', this.state.groups)
    // console.log('items', this.state.items)
    return (
      <div className="graphbox col col-md-9 col-sm-9 px-0">
      {this.props.children}
      </div>
    )
  }
}

export default GraphBox
