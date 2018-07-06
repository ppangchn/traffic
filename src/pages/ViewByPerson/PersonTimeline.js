import React, { Component } from 'react'
import axios from 'axios'
import '../../components/Views/GraphBox.css'
import Timeline from '../../components/Views/react-calendar-timeline/lib'
import moment from 'moment'
import '../ViewByProject/ProjectSidebar.css'
import GraphBox from '../../components/Views/GraphBox'
import url from '../../url'
import '../../components/Views/TimelineStyle.css'
class PersonTimeline extends Component {
  constructor() {
    super()
    this.state = { groups: [], items: [] }
  }
  componentDidMount = () => {
    try {
      let items = this.state.items.map(i => i)
      let groups = this.state.groups.map(i => i)
      axios.get(`${url}/users`).then(res => {
        const { data } = res // = res.data
        let count = 1
        data.forEach(data => {
          groups.push({ id: data.id, title: data.name })
          if (data.projectTimeline) {
            data.projectTimeline.forEach(timeline => {
              let start = moment(timeline.start || 0).add(-1,'day')
              let end = moment(timeline.end || 0).add(-1,'day')
              items.push({
                id: count || 0,
                group: data.id || 0,
                title: timeline.project.name || ' ',
                start_time: start,
                end_time: end,
                canMove: true,
                canResize: true,
                canChangeGroup: false,
                className: 'bg-' + String(timeline.project.color).substring(1)
              })
              count++
            })
          }

          this.setState({
            groups,
            items
          })
        })
      })
    } catch (error) {
      console.log('fail to get data at PersonTimeline')
    }
  }
  render() {
    return (
      <GraphBox>
        <Timeline
          groups={this.state.groups}
          items={this.state.items}
          visibleTimeStart={moment().add(7 * 7, 'day')}
          visibleTimeEnd={moment().add(14 * 8, 'day')}
          sidebarWidth={0}
          lineHeight={148}
          stickyHeader={false}
          minZoom="2592000000" //4 month
          maxZoom="9676800000"
          timeSteps={{ day: 7 }}
        />
      </GraphBox>
    )
  }
}

export default PersonTimeline
