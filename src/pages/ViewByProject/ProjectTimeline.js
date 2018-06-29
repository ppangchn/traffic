import React, { Component } from 'react'
import axios from 'axios'
import '../../components/Views/GraphBox.css'
import '../../components/Views/TimelineStyle.css'
import Timeline from '../../components/Views/react-calendar-timeline/lib'
import moment from 'moment'
// import { defaultSubHeaderLabelFormats } from '../../components/react-calendar-timeline/lib'
import '../ViewByProject/ProjectSidebar.css'
import GraphBox from '../../components/Views/GraphBox'
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
//console.log('testgroups', testgroups)
//console.log('testitems', testitems)
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
class ProjectTimeline extends Component {
  constructor() {
    super()
    this.state = { groups: [], items: [] }
  }
  onCanvasClick(groupId, time, e) {
    console.log('click!');
  }
  componentDidMount = () => {
    let items = this.state.items.map(i => i)
    let groups = this.state.groups.map(i => i)
    axios
      .get(`http://dev.pirsquare.net:3013/traffic-api/project/timeline`)
      .then(res => {
        const { data } = res // = res.data
        //console.log('Data Timeline', data)
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
    // //console.log('groups', this.state.groups)
    // //console.log('items', this.state.items)
    return (
      <GraphBox>
        <Timeline
        // className="lineheight"
          groups={this.state.groups}
          items={this.state.items}
          visibleTimeStart={moment().add(7*7,'day')}
          visibleTimeEnd={moment().add(14*8,'day')}
          sidebarWidth={0}
          lineHeight={109}
          stickyHeader={false}
          minZoom={2592000000} //4 month
          maxZoom={9676800000}
          timeSteps={{day: 7}}
          
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