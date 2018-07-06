import React, { Component } from 'react'
import axios from 'axios'
import '../../components/Views/GraphBox.css'
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
        })
    } catch (error) {
      console.log('fail to get data at ProjectTimeline', error)
    }
  }
  render() {
    return (
      <GraphBox>
        <Timeline
          // className="lineheight"
          groups={this.state.groups}
          items={this.state.items}
          visibleTimeStart={moment().add(7*4,'day')}
          visibleTimeEnd={moment().add(7*9, 'day')}
          sidebarWidth={0}
          lineHeight={92.4}
          stickyHeader={false}
          minZoom="2592000000" //4 month
          maxZoom="9676800000"
          timeSteps={{ day: 7 }}
          // onZoom
          // timeSteps={moment().startOf('iosWeek')}
          // subHeaderLabelFormats={defaultSubHeaderLabelFormats}
          // minResizeWidth="0"
        />
      </GraphBox>
    )
  }
}

export default ProjectTimeline
