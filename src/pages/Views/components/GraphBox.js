import React, { Component } from 'react'
import axios from 'axios'
import './GraphBox.css'
import '../../components/react-calendar-timeline/lib/Timeline.css'
import Timeline from '../../components/react-calendar-timeline/lib'
import moment from 'moment'
import '../ViewByProject/ProjectSidebar.css'
class GraphBox extends Component {


  render() {
    // console.log('groups', this.state.groups)
    // console.log('items', this.state.items)
    return (
      <div className="graphbox col col-sm-9 px-0" style={{overflowX: 'scroll'}}>
      {this.props.children}
      </div>
    )
  }
}

export default GraphBox
