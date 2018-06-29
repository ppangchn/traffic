import React, { Component } from 'react'
import axios from 'axios'
import '../../components/Views/GraphBox.css'
import Timeline from '../../components/Views/react-calendar-timeline/lib'
import moment from 'moment'
import '../ViewByProject/ProjectSidebar.css'
import GraphBox from '../../components/Views/GraphBox'
import '../../components/Views/TimelineStyle.css'
// const testgroups = [{ id: 10, title: 'group 1' }, { id: 20, title: 'group 2' }]

// const testitems = [
//   {
//     id: 1,
//     group: 10,
//     title: 'item 1',
//     start_time: moment(),
//     end_time: moment().add(1, 'week')
//   },
//   {
//     id: 2,
//     group: 20,
//     title: 'item 2',
//     start_time: moment().add(-0.5, 'week'),
//     end_time: moment().add(0.5, 'week')
//   },
//   {
//     id: 3,
//     group: 10,
//     title: 'item 3',
//     start_time: moment().add(2, 'hour'),
//     end_time: moment().add(3, 'hour')
//   }
// ]
// console.log('testgroups', testgroups)
// console.log('testitems', testitems)
// defaultSubHeaderLabelFormats ==
//   {
//     yearShort: 'YY',
//     yearLong: 'YYYY',
//     monthShort: 'MM',
//     monthMedium: 'MMM',
//     monthLong: 'MMMM',
//     dayShort: 'Do',
//     dayMedium: 'Do',
//     dayMediumLong: 'Do',
//     dayLong: 'dddd, Do',
//     hourShort: 'HH',
//     hourLong: 'HH:00',
//     minuteShort: 'mm',
//     minuteLong: 'HH:mm'
//   }
class PersonTimeline extends Component {
  constructor() {
    super()
    this.state = { groups: [], items: [] }
  }
  componentDidMount = () => {
    let items = this.state.items.map(i => i)
    let groups = this.state.groups.map(i => i)
    axios.get(`http://dev.pirsquare.net:3013/traffic-api/users`).then(res => {
      const { data } = res // = res.data
      // console.log('Data Timeline', data)
      let count = 1
      data.forEach(data => {
        groups.push({ id: data.id, title: data.name })
        data.projectTimeline.forEach(timeline => {
          let start = moment(timeline.start)
          let end = moment(timeline.end)
          items.push({
            id: count,
            group: data.id,
            title: timeline.project.name,
            start_time: start,
            end_time: end,
            canMove: true,
            canResize: true,
            canChangeGroup: false,
            className: 'bg-' + String(timeline.project.color).substring(1)
          })
          count++
        })
        this.setState({
          groups,
          items
        })
      })
    })
  }
  render() {
    return (
      <GraphBox>
        <Timeline
          groups={this.state.groups}
          items={this.state.items}
          visibleTimeStart={moment().add(7*7,'day')}
          visibleTimeEnd={moment().add(14*8,'day')}
          sidebarWidth={0}
          lineHeight={148}
          stickyHeader={false}
          minZoom="2592000000" //4 month
          maxZoom="9676800000"
          timeSteps={{day: 7}}
        />
      </GraphBox>
    )
  }
}

export default PersonTimeline
