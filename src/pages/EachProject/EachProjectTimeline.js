import React, { Component } from 'react'
import axios from 'axios'
import '../../components/Views/TimelineStyle.css'
import Timeline from '../../components/Views/react-calendar-timeline/lib'
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
      groups.push({ id: id, title: data.project.name })
      items.push({
        id: id,
        group: id,
        title: '',
        start_time: moment(data.project.start_timeline).add(-1, 'day'),
        end_time: moment(data.project.end_timeline).add(-1, 'day'),
        canMove: false,
        canResize: false,
        canChangeGroup: false,
        className: 'bg-' + String(data.project.color).substring(1)
      })
      id++
      data.timeline.forEach(timeline => {
        groups.push({ id: id, title: timeline.users.name })
        let start = moment(timeline.start).add(-1, 'day')
        let end = moment(timeline.end).add(-1, 'day')
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
    return (
      <GraphBox>
        <Timeline
          groups={this.state.groups}
          items={this.state.items}
          visibleTimeStart={new Date(moment().add(-7,'day')).getTime()}
          visibleTimeEnd={new Date(moment().add(7*7, 'day')).getTime()}
          sidebarWidth={0}
          lineHeight={115}
          stickyHeader={false}
          timeSteps={{ day: 7 }}
          itemHeightRatio={0.3}
        />
      </GraphBox>
    )
  }
}

export default EachProjectTimeline
