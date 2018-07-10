import React, { Component } from 'react'
import axios from 'axios'
import '../../components/Views/TimelineStyle.css'
import Timeline from '../../components/Views/react-calendar-timeline/lib'
import moment from 'moment'
import '../ViewByProject/ProjectSidebar.css'
import GraphBox from '../../components/Views/GraphBox'
import url from '../../url'
const groups = [{ id: 1, title: 'group 1' }, { id: 2, title: 'group 2' }, { id: 3, title: 'group 2' }, { id: 4, title: 'group 2' }, { id: 5, title: 'group 2' }]

const items = [
  {
    id: 1,
    group: 1,
    title: 'item 1',
    start_time: moment(),
    end_time: moment().add(1, 'hour')
  },
  {
    id: 2,
    group: 2,
    title: 'item 2',
    start_time: moment().add(-0.5, 'hour'),
    end_time: moment().add(0.5, 'hour')
  },
  {
    id: 3,
    group: 3,
    title: 'item 3',
    start_time: moment().add(2, 'hour'),
    end_time: moment().add(3, 'hour')
  },
  {
    id: 4,
    group: 4,
    title: 'item 3',
    start_time: moment().add(2, 'hour'),
    end_time: moment().add(3, 'hour')
  },{
    id: 5,
    group: 5,
    title: 'item 3',
    start_time: moment().add(2, 'hour'),
    end_time: moment().add(3, 'hour')
  }
]
class PersonTimeline extends Component {
  constructor() {
    super()
    this.state = { groups: [], items: [] }
  }
  componentDidMount = () => {
    try {
      let items = this.state.items.map(i => i)
      let groups = this.state.items.map(i => i)
      axios.get(`${url}/users`).then(res => {
        const { data } = res // = res.data
        let count = 1
        data.forEach(data => {
          groups.push({ id: data.id, title: data.name })
          if (data.projectTimeline) {
            data.projectTimeline.forEach(timeline => {
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
            })
          }
          })
          this.setState({
            groups,
            items
        })
        })
      console.log('items na ->', items)
      console.log('groups na ->', groups)
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
          visibleTimeStart={moment().add(7*4,'day')}
          visibleTimeEnd={moment().add(7*9, 'day')}
          sidebarWidth={0}
          lineHeight={102}
          stickyHeader={false}
          minZoom="2592000000" //4 month
          maxZoom="9676800000"
          timeSteps={{ day: 7 }}
          itemHeightRatio={0.3}
          stackItems={true}
        />
      </GraphBox>
    )
  }
}

export default PersonTimeline
