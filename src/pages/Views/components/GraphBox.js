import React, { Component } from 'react'
import axios from 'axios'
import './GraphBox.css'
import 'react-calendar-timeline/lib/Timeline.css'
import Timeline from 'react-calendar-timeline/lib'
import moment from 'moment'
import '../ViewbyProject/ProjectSidebar.css'
class GraphBox extends Component {
  constructor() {
    super()
  }

  render() {
    // console.log('groups', this.state.groups)
    // console.log('items', this.state.items)
    return (
      <div className="graphbox">
      {this.props.children}
      </div>
    )
  }
}

export default GraphBox
