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
      defaultgroups: [{ id: 1, title: '' }],
      defaultitems: [
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
      ],
      groups: [],
      items: []
    }
  }
  getData(id) {
    console.log(id)
    let items = this.state.defaultitems.map(i => i)
    let groups = this.state.defaultgroups.map(i => i)
    axios.get(`${url}/users/${id}`).then(res => {
      const { data } = res // = res.data
      console.log('datatata->',data)
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
  }
  componentDidMount = () => {
    try {
      this.getData(this.props.id)
    } catch (error) {
      console.log('fail to get data at ProjectTimeline', error)
    }
  }
  componentWillReceiveProps(props) {
    this.getData(props.id);
  }
  render() {
    return (
      <GraphBox>
        <Timeline
          groups={this.state.groups}
          items={this.state.items}
          visibleTimeStart={new Date(moment().add(-7, 'day')).getTime()}
          visibleTimeEnd={new Date(moment().add(7 * 6, 'day')).getTime()}
          sidebarWidth={0}
          lineHeight={75.5}
          stickyHeader={false}
          timeSteps={{ day: 7 }}
          itemHeightRatio={0.4}
          isGrid={true}
        />
      </GraphBox>
    )
  }
}

export default ProjectTimeline
