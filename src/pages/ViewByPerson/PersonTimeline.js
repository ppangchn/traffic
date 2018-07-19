import React, { Component } from 'react'
import axios from 'axios'
import '../../components/Views/TimelineStyle.css'
import Timeline from '../../components/Views/react-calendar-timeline/lib'
// import Timeline from 'react-calendar-timeline/lib'
import moment from 'moment'
import '../ViewByProject/ProjectSidebar.css'
import GraphBox from '../../components/Views/GraphBox'
import url from '../../url'


class PersonTimeline extends Component {
  constructor() {
    super()
    this.state = {
      groups: [],
      items: []
    }
  }
  componentDidMount = () => {
    try {
      let items = []
      let groups = []
      axios.get(`${url}/users/person`).then(res => {
        const { data } = res // = res.data
        let count = 1
        data.forEach(data => {
          groups.push({ id: data.id, title: data.name })
          if (data.projectTimeline) {
            data.projectTimeline.forEach(timeline => {
              if (!timeline.project.isDisable && !timeline.isDisable) {
                let start = null
                let end = null
                if (timeline.start && timeline.end) {
                  start = moment(timeline.start).add(-1, 'day')
                  end = moment(timeline.end).add(-1, 'day')
                }
                items.push({
                  id: count,
                  group: data.id,
                  title: timeline.project.name,
                  start_time: start,
                  end_time: end,
                  canMove: false,
                  canResize: false,
                  canChangeGroup: false,
                  className: 'bg-' + String(timeline.project.color).substring(1)
                })
                count++
              }
            })
          }
        })
        this.setState({
          groups,
          items
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
          visibleTimeStart={new Date(moment().add(7*5,'day')).getTime()}
          visibleTimeEnd={new Date(moment().add(7*12, 'day')).getTime()}
          sidebarWidth={0}
          lineHeight={60.5}
          stickyHeader={true}
          timeSteps={{ day: 7 }}
          itemHeightRatio={0.4}
          stackItems={true}
          isFixedSizeRender={true}
        />
      </GraphBox>
    )
  }
}

export default PersonTimeline
