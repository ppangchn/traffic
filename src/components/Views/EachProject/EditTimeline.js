import React, { Component } from 'react'
import { CalendarAlt as CalendarIcon } from 'styled-icons/fa-regular/CalendarAlt'
import { Popover, PopoverBody, Button } from 'reactstrap'
import DatePicker from '../EachProject/DatePicker'
import url from '../../../url'
import axios from 'axios'
import './EditTimeline.css'
import * as moment from 'moment'
const Calendar = CalendarIcon.extend`
  width: 1rem;
  height: 1rem;
  &:hover ${Calendar} {
    color: #5bc2e1;
  }
`

class EditTimeline extends Component {
  constructor() {
    super()

    this.state = {
      start: 0,
      end: 0,
      popoverOpen: false
    }
    this.toggle = this.toggle.bind(this)
    this.sendData = this.sendData.bind(this)
  }
  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    })
  }
  setStartTime(start) {
    this.setState({ start }, () => {
      console.log('start->', this.state.start)
    })
    // console.log('start->', start)
  }
  setEndTime(end) {
    this.setState({ end })
    console.log('end->', end)
  }
  sendData() {
    const data = {
      id: this.props.id,
      start: moment(this.state.start).startOf('day').format(),
      end: moment(this.state.end).startOf('day').format()
    }
    try {
      axios.put(`${url}/timeline`, data).then(() => {
        this.toggle()
        this.props.updateData()
        this.props.getData()
      })
      console.log('send!')
    } catch (error) {
      console.log('cant update timelineF', error)
    }
  }
  // getData() {
  //   axios.get(`${url}/project/${this.props.id}`).then(res => {
  //     const { data } = res
  //     console.log('data ja ->', data)
  //     this.setState({
  //       data
  //     })
  //   })
  // }
  // componentDidMount() {
  //   try {
  //     this.getData()
  //   } catch (error) {
  //     console.log('error getdata edittimeline', error)
  //   }
  // }
  render() {
    return (
      <div className="calendar">
        <Calendar id={'popover' + this.props.id} onClick={this.toggle} />
        <Popover
          placement="bottom !important"
          isOpen={this.state.popoverOpen}
          target={'popover' + this.props.id}
          toggle={this.toggle}
        >
          <PopoverBody>
            <DatePicker
              start={this.props.start}
              end={this.props.end}
              setStartTime={e => this.setStartTime(e)}
              setEndTime={e => this.setEndTime(e)}
            />
            <div style={{ marginTop: '15px' }}>
              <Button color="5bc2e1" block size="sm" onClick={this.sendData}>
                Save
              </Button>
            </div>
          </PopoverBody>
        </Popover>
      </div>
    )
  }
}
export default EditTimeline
