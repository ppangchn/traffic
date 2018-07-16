import React, { Component } from 'react'
import axios from 'axios'
import '../../components/Views/TimelineStyle.css'
import Timeline from '../../components/Views/react-calendar-timeline/lib'
import moment from 'moment'
import '../ViewByProject/ProjectSidebar.css'
import GraphBox from '../../components/Views/GraphBox'
import url from '../../url'
class ProjectTimeline extends Component {
  constructor() {
    super()
    this.state = {
      groups: [{ id: 1, title: '' }],
      items: [
        {
          id: 1,
          group: 1,
          title: '',
          start_time: null,
          end_time: null,
          canMove: false,
          canResize: false,
          canChangeGroup: false
        }
      ]
    }
  }
  componentDidMount = () => {
    try {
      let items = this.state.items.map(i => i)
      let groups = this.state.groups.map(i => i)
      axios.get(`${url}/users/${this.props.id}`).then(res => {
        const { data } = res // = res.data
        let count = 2
        data.projectTimeline.forEach(timeline => {
          if (!timeline.project.isDisable) {
            groups.push({ id: count, title: timeline.project.name })
            let start = moment(timeline.start).add(-1, 'day')
            let end = moment(timeline.end).add(-1, 'day')
            items.push({
              id: count,
              group: count,
              title: '',
              start_time: start,
              end_time: end,
              canMove: false,
              canResize: false,
              canChangeGroup: false,
              className: 'bg-' + timeline.project.color.substring(1)
            })
            count++
          }
        })
        this.setState({
          groups,
          items
        })
      })
    } catch (error) {
      console.log('fail to get data at ProjectTimeline', error)
    }
  }
  render() {
    return (
      <GraphBox>
        <Timeline
          groups={this.state.groups}
          items={this.state.items}
          visibleTimeStart={new Date(moment().add(-7,'day')).getTime()}
          visibleTimeEnd={new Date(moment().add(7*9, 'day')).getTime()}
          sidebarWidth={0}
          lineHeight={75.5}
          stickyHeader={true}
          timeSteps={{ day: 7 }}
          itemHeightRatio={0.4}
        />
      </GraphBox>
    )
  }
}

export default ProjectTimeline
