import React, { Component } from 'react'
import axios from 'axios'
import '../../components/Views/GraphBox.css'
import '../../components/Views/TimelineStyle.css'
import Timeline from '../../components/Views/react-calendar-timeline/lib'
import moment from 'moment'
import '../ViewByProject/ProjectSidebar.css'
import GraphBox from '../../components/Views/GraphBox'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import { formatDate, parseDate } from 'react-day-picker/moment'
import 'react-day-picker/lib/style.css'
import DatePicker from '../../components/Views/EachProject/DatePicker'

class EachProjectTimeline extends Component {
  constructor() {
    super()
    this.state = { groups: [], items: [] }
  }
  onhandleRow(groupId, time, e) {
    console.log('pang')
  }
  onItemSelect(itemId, e, time) {
    console.log('item click')
    return <DatePicker />
  }
  componentDidMount = () => {
    let items = this.state.items.map(i => i)
    let groups = this.state.groups.map(i => i)
    axios
      .get(`http://dev.pirsquare.net:3013/traffic-api/project/${this.props.id}`)
      .then(res => {
        const { data } = res // = res.data
        // console.log('Data Timeline', data)
        let count = 1
        items.push({
          id: count,
          group: timeline.id,
          title: '',
          start_time: start,
          end_time: end,
          canMove: false,
          canResize: false,
          canChangeGroup: false,
          className: 'bg-' + String(data.project.color).substring(1),
          itemProps: {
            onClick: e => this.onItemSelect(count, e, start)
          }
        })
        data.timeline.forEach(timeline => {
          groups.push({ id: timeline.id, title: timeline.users.name })
          let start = moment(timeline.start)
          let end = moment(timeline.end)
          items.push({
            id: count,
            group: timeline.id,
            title: '',
            start_time: start,
            end_time: end,
            canMove: false,
            canResize: false,
            canChangeGroup: false,
            className: 'bg-' + String(data.project.color).substring(1),
            itemProps: {
              onClick: e => this.onItemSelect(count, e, start)
            }
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
    return (
      <GraphBox>
        <Timeline
          groups={this.state.groups}
          items={this.state.items}
          visibleTimeStart={moment().add(7 * 7, 'day')}
          visibleTimeEnd={moment().add(14 * 8, 'day')}
          sidebarWidth={0}
          lineHeight={115}
          stickyHeader={false}
          minZoom="2592000000" //4 month
          maxZoom="9676800000"
          timeSteps={{ day: 7 }}
        />
      </GraphBox>
    )
  }
}

export default EachProjectTimeline
