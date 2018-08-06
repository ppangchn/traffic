import React, { Component } from 'react'
import { CalendarAlt as CalendarIcon } from 'styled-icons/fa-regular/CalendarAlt'
import { Popover, PopoverBody, Button } from 'reactstrap'
import DatePicker from '../EachProject/DatePicker'
import url from '../../../url'
import axios from 'axios'
import { CalendarCheck as Calendarz } from 'styled-icons/fa-regular/CalendarCheck'
import './EditTimeline.css'
import * as moment from 'moment'

const Calendar = CalendarIcon.extend`
  width: 1rem;
  height: 1rem;
  &:hover ${Calendar} {
    color: #5bc2e1;
  }
`
const CalendarCheck = Calendarz.extend`
  width: 1.5rem;
  height: 1.3rem;
  color: #9c9c9c
  margin-right: 15px;
  margin-top: 3px;
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
    this.clearData = this.clearData.bind(this)
  }
  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    })
  }
  setStartTime(start) {
    this.setState({ start }, () => {})
  }
  setEndTime(end) {
    this.setState({ end })
  }
  clearData() {
    const data = {
      id: this.props.id,
      start: null,
      end: null
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
  sendData() {
    const data = {
      id: this.props.id,
      start: moment(this.state.start)
        .startOf('day')
        .format(),
      end: moment(this.state.end)
        .startOf('day')
        .format()
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

  componentDidMount() {
    try {
      this.setStartTime(this.props.start)
      this.setEndTime(this.props.end)
    } catch (error) {
      console.log('error getdata edittimeline', error)
    }
  }
  render() {
    return (
      <div className="calendar">
        <Calendar
          className="calendaricon"
          id={'popover' + this.props.id}
          onClick={this.toggle}
        />
        <Popover
          placement="bottom !important"
          isOpen={this.state.popoverOpen}
          target={'popover' + this.props.id}
          toggle={this.toggle}
          className="edittimelinepopover"
        >
          <PopoverBody className="edittimelinepopoverbody">
            <div style={{ display: 'flex', top: '5px !important' }}>
              {/* <CalendarCheck /> */}
              <DatePicker
                start={this.props.start}
                end={this.props.end}
                setStartTime={e => this.setStartTime(e)}
                setEndTime={e => this.setEndTime(e)}
              />
            </div>

            <div style={{ display: 'flex' }}>
              <Button
                color="cleardata"
                block
                size="sm"
                onClick={this.clearData}
              >
                Clear
              </Button>
              <Button
                color="save5bc2e1"
                block
                size="sm"
                onClick={this.sendData}
              >
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
