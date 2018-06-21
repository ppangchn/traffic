import React, { Component } from 'react'
import axios from 'axios'
import '../components/GraphBox.css'
import '/Users/chanissat./Desktop/traffic/node_modules/react-calendar-timeline/lib/Timeline.css'
import Timeline from 'react-calendar-timeline/lib'
import moment from 'moment'
import '../ViewbyProject/ProjectSidebar.css'
import GraphBox from '../components/GraphBox'
const testgroups = [{ id: 10, title: 'group 1' }, { id: 20, title: 'group 2' }]

const testitems = [
  {
    id: 1,
    group: 10,
    title: 'item 1',
    start_time: moment(),
    end_time: moment().add(1, 'week')
  },
  {
    id: 2,
    group: 20,
    title: 'item 2',
    start_time: moment().add(-0.5, 'week'),
    end_time: moment().add(0.5, 'week')
  },
  {
    id: 3,
    group: 10,
    title: 'item 3',
    start_time: moment().add(2, 'hour'),
    end_time: moment().add(3, 'hour')
  }
]
console.log('testgroups', testgroups)
console.log('testitems', testitems)
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
    axios
      .get(`http://dev.pirsquare.net:3013/traffic-api/project/timeline`)
      .then(res => {
        const { data } = res // = res.data
        console.log('Data Timeline', data)
        let count = 1
        data.forEach(data => {
          groups.push({ id: data.id, title: data.name })
          let start = moment(data.timeline.start)
          let end = moment(data.timeline.end)
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
  }
  render() {
    // console.log('groups', this.state.groups)
    // console.log('items', this.state.items)
    return (
      <GraphBox>
        <Timeline
          style={{ background: '#eaf9fe' }}
          groups={this.state.groups}
          items={this.state.items}
          defaultTimeStart={moment()}
          defaultTimeEnd={moment().add(4, 'month')}
          sidebarWidth="0"
          lineHeight="80"
          stickyHeader="false"
          minZoom="9676800000" //4 month
          maxZoom="9676800000"
          timeSteps={{ day: 7 }}
          // subHeaderLabelFormats={defaultSubHeaderLabelFormats}
          // minResizeWidth="0"
        />
      </GraphBox>
    )
  }
}

export default PersonTimeline
