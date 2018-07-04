import React, { Component } from 'react'
import axios from 'axios'
import '../../components/Views/GraphBox.css'
import '../../components/Views/TimelineStyle.css'
import Timeline from '../../components/Views/react-calendar-timeline/lib'
import moment from 'moment'
import '../ViewByProject/ProjectSidebar.css'
import GraphBox from '../../components/Views/GraphBox'
import { Popover, PopoverBody, Button } from 'reactstrap'
import 'react-day-picker/lib/style.css'
import DatePicker from '../../components/Views/EachProject/DatePicker'

class EachProjectTimeline extends Component {
  constructor() {
    super()
    this.state = { groups: [], items: [], popoverOpen: false, id: '' }
    this.toggle = this.toggle.bind(this)
  }
  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    })
  }
  onhandleRow(itemId, time, e) {
    console.log('pang')
  }
  onItemSelect = id => {
    console.log('item click', id)
    this.toggle()
    this.setState({ datepicker: String(id) })
  }
  componentDidMount = () => {
    try {
      let items = this.state.items.map(i => i)
      let groups = this.state.groups.map(i => i)
      let id = 1
      axios
        .get(
          `http://dev.pirsquare.net:3013/traffic-api/project/${this.props.id}`
        )
        .then(res => {
          const { data } = res // = res.data
          // console.log('Data Timeline', data)

          groups.push({ id: id, title: data.project.name })
          items.push({
            id: id,
            group: id,
            title: '',
            start_time: moment(data.project.start_timeline).add(6,'day'),
            end_time: moment(data.project.end_timeline).add(6,'day'),
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
              className: 'bg-' + String(data.project.color).substring(1),
              itemIdKey: String(timeline.id),
              itemProps: {
                //onClick: (e) => this.onItemSelect(timeline.id)
              }
            })
            id++
          })
          this.setState({
            groups,
            items
          })
        })
    } catch (error) {
      console.log('fail to get data at EachProjectTimeline', error)
    }
  }
  render() {
    console.log('items', this.state.items)
    console.log('groups', this.state.groups)
    console.log('datepicker', this.state.datepicker)
    return (
      <GraphBox>
        <Timeline
          groups={this.state.groups}
          items={this.state.items}
          visibleTimeStart={moment().add(7 * 7, 'day')}
          visibleTimeEnd={moment().add(14 * 8, 'day')}
          sidebarWidth={0}
          lineHeight={115.4}
          stickyHeader={false}
          minZoom="2592000000" //4 month
          maxZoom="9676800000"
          timeSteps={{ day: 7 }}
          onItemSelect={this.onItemSelect}
        />
        <Popover
          placement="bottom !important"
          isOpen={this.state.popoverOpen}
          target="pang"
          toggle={this.toggle}
        >
          <PopoverBody>
            <DatePicker />
            <div style={{ marginTop: '15px' }}>
              <Button color="5bc2e1" block size="sm">
                Save
              </Button>
            </div>
          </PopoverBody>
        </Popover>
        <button id="pang" onClick={this.toggle}>
          pang
        </button>
      </GraphBox>
    )
  }
}

export default EachProjectTimeline
