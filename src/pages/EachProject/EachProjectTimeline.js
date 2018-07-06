import React, { Component } from 'react'
import axios from 'axios'
import '../../components/Views/GraphBox.css'
import '../../components/Views/TimelineStyle.css'
import Timeline from '../../components/Views/react-calendar-timeline/lib'
// import Timeline from 'new-react-calendar-timeline/lib'
import moment from 'moment'
import '../ViewByProject/ProjectSidebar.css'
import GraphBox from '../../components/Views/GraphBox'
import { Button } from 'reactstrap'
import 'react-day-picker/lib/style.css'
import url from '../../url'

class EachProjectTimeline extends Component {
  constructor() {
    super()
    this.state = { groups: [], items: [], id: '' }
  }
  async getData() {
    let items = []
    let groups = []
    let id = 1
    await axios.get(`${url}/project/${this.props.id}`).then(res => {
      const { data } = res // = res.data
      // console.log('Data Timeline', data)
      groups.push({ id: id, title: data.project.name })
      items.push({
        id: id,
        group: id,
        title: '',
        start_time: moment(data.project.start_timeline).add(6, 'day'),
        end_time: moment(data.project.end_timeline).add(6, 'day'),
        canMove: false,
        canResize: false,
        canChangeGroup: false,
        className: 'bg-' + String(data.project.color).substring(1)
      })
      id++
      data.timeline.forEach(timeline => {
        groups.push({ id: id, title: timeline.users.name })
        let start = moment(timeline.start).add(6, 'day')
        let end = moment(timeline.end).add(6, 'day')
        items.push({
          id: id,
          group: id,
          title: '',
          start_time: start,
          end_time: end,
          canMove: false,
          canResize: false,
          canChangeGroup: false,
          className: 'bg-' + String(data.project.color).substring(1)
        })
        id++
      })
      this.setState({
        groups,
        items
      })
    })
  }
  componentDidMount = () => {
    try {
      this.getData()
    } catch (error) {
      console.log('fail to get data at EachProjectTimeline', error)
    }
  }
  componentWillReceiveProps() {
    try {
      this.getData()
    } catch (error) {
      console.log('fail to get data at EachProjectTimeline', error)
    }
  }
  render() {
    console.log('groups ->', this.state.groups)
    console.log('items->', this.state.items)
    return (
      <GraphBox>
        <Timeline
          groups={this.state.groups}
          items={this.state.items}
          visibleTimeStart={moment()}
          visibleTimeEnd={moment().add(14, 'day')}
          sidebarWidth={0}
          lineHeight={115.4}
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
