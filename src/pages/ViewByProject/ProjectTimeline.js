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
    this.state = { groups: [], items: [] }
  }
  componentDidMount = () => {
    try {
      let items = this.state.items.map(i => i)
      let groups = this.state.groups.map(i => i)
      axios
        .get(`${url}/project/timeline`)
        .then(res => {
          const { data } = res // = res.data
          let count = 1
          data.forEach(data => {
            groups.push({ id: data.id, title: data.name })
            let start = moment(data.timeline.start).add(-1, 'day')
            let end = moment(data.timeline.end).add(-1, 'day')
            items.push({
              id: count,
              group: data.id,
              title: data.name,
              start_time: start,
              end_time: end,
              canMove: false,
              canResize: false,
              canChangeGroup: false,
              className: 'bg-' + data.color.substring(1)
            })
            count++
          })
          this.setState({
            groups,
            items
          })
          console.log(groups,items)
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
          visibleTimeStart={moment().add(7*4,'day')}
          visibleTimeEnd={moment().add(7*9, 'day')}
          sidebarWidth={0}
          lineHeight={110.5}
          stickyHeader={true}
          timeSteps={{ day: 7 }}
          itemHeightRatio={0.3}
        />
      </GraphBox>
    )
  }
}

export default ProjectTimeline
