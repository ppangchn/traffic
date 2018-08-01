import React, { Component } from 'react'
import styled from 'styled-components'
import Sidebar from '../../components/Views/Sidebar'
import axios from 'axios'
import url from '../../url'
import PersonItem from '../../components/Views/ViewByPerson/PersonItem'
import './PersonSidebar.css'

const Head = styled.div`
  padding-top: 10px;
`
const HeadContainer = styled.div`
  background-color: #ffffff;
  border-bottom: 0.5px solid #e4eaed;
  border-right: 0.5px solid #e4eaed;
`
class PersonSidebar extends Component {
  constructor() {
    super()
    this.state = {
      users: [],
      roles: [],
      tags: [],
      listmember: [],
      filteredlistmember: [],
      rolespm: ['ADMIN', 'PM', 'BD', 'PC', 'SA', 'BM'],
      rolespd: ['DEV', 'DSN', 'TS', 'QA'],
      length: [],
      checkedall: true,
      checkedpm: false,
      checkedpd: false,
      data: {}
    }
  }
  handleChangeAll(e) {
    this.updateData(['all'])
    this.props.updateRoles(['all'])
    this.setState({
      checkedall: e.target.checked,
      checkedpm: false,
      checkedpd: false
    })
  }
  handleChangePM(e) {
    this.updateData(this.state.rolespm)
    this.props.updateRoles(this.state.rolespm)
    this.setState({
      checkedpm: e.target.checked,
      checkedall: false,
      checkedpd: false
    })
  }
  handleChangePD(e) {
    this.updateData(this.state.rolespd)
    this.props.updateRoles(this.state.rolespd)
    this.setState({
      checkedpd: e.target.checked,
      checkedall: false,
      checkedpm: false
    })
  }
  getData() {
    axios.get(`${url}/users/person`).then(res => {
      const { data } = res
      let users = []
      let roles = []
      let tags = []
      let listmember = []
      let length = []
      this.setState({ data })
      data.map(user => {
        users.push(user.name)
        roles.push(user.roles.name)
        tags.push(user.tags)
        listmember.push({ value: user.id, label: user.name })
        let count = 0
        let alltimeline = []
        user.projectTimeline.map(timeline => {
          if (
            !timeline.project.isDisable &&
            !timeline.isDisable &&
            timeline.start &&
            timeline.end
          ) {
            alltimeline.push({
              start: new Date(timeline.start).getTime(),
              end: new Date(timeline.end).getTime()
            })
            let start = new Date(timeline.start).getTime()
            let end = new Date(timeline.end).getTime()
            let add = true
            alltimeline.map(eachtimeline => {
              if (
                (start < eachtimeline.start && end < eachtimeline.start) ||
                (start > eachtimeline.end && end > eachtimeline.end)
              ) {
                add = false
              }
            })

            if (add) count++
          }
        })
        length.push(count)
      })
      this.setState({ users, roles, tags, listmember, length })
    })
    this.props.triggerLoading();
  }
  updateData(wantedroles) {
    const { data } = this.state
    let users = []
    let roles = []
    let tags = []
    let listmember = []
    let length = []
    data.map(user => {
      if (
        wantedroles[0] === 'all' ||
        wantedroles.indexOf(user.roles.name) !== -1
      ) {
        users.push(user.name)
        roles.push(user.roles.name)
        tags.push(user.tags)
        listmember.push({ value: user.id, label: user.name })
        let count = 0
        let alltimeline = []
        user.projectTimeline.map(timeline => {
          if (
            !timeline.project.isDisable &&
            !timeline.isDisable &&
            timeline.start &&
            timeline.end
          ) {
            alltimeline.push({
              start: new Date(timeline.start).getTime(),
              end: new Date(timeline.end).getTime()
            })
            let start = new Date(timeline.start).getTime()
            let end = new Date(timeline.end).getTime()
            let add = true
            alltimeline.map(eachtimeline => {
              if (
                (start < eachtimeline.start && end < eachtimeline.start) ||
                (start > eachtimeline.end && end > eachtimeline.end)
              ) {
                add = false
              }
            })

            if (add) count++
          }
        })
        length.push(count)
      }
    })
    this.setState({ users, roles, tags, listmember, length })
  }
  componentDidMount() {
    try {
      this.getData()
    } catch (error) {
      console.log('error get data at personsidebar')
    }
  }
  render() {
    return (
      <Sidebar>
        <HeadContainer className="personheadcontainer">
          <Head className="personhead">
            <div className="persontitle">Name</div>
            <div
              className="radiobox"
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                width: '100%'
              }}
            >
              <div className="radiotext">
                <input
                  type="radio"
                  id="radio1"
                  name="checkedall"
                  checked={this.state.checkedall}
                  onChange={e => this.handleChangeAll(e)}
                />
                <label
                  for="radio1"
                  style={{
                    border: this.state.checkedall
                      ? '#5bc2e1'
                      : '1px solid #5bc2e1',
                    backgroundColor: this.state.checkedall ? '#5bc2e1' : 'white'
                  }}
                />&ensp;All
              </div>
              <div className="radiotext">
                <input
                  type="radio"
                  id="radio2"
                  name="checkedpm"
                  checked={this.state.checkedpm}
                  onChange={e => this.handleChangePM(e)}
                />
                <label
                  for="radio2"
                  style={{
                    border: this.state.checkedpm
                      ? '#5bc2e1'
                      : '1px solid #5bc2e1',
                    backgroundColor: this.state.checkedpm ? '#5bc2e1' : 'white'
                  }}
                />&ensp;PM
              </div>
              <div className="radiotext">
                <input
                  type="radio"
                  id="radio3"
                  name="checkedpd"
                  checked={this.state.checkedpd}
                  onChange={e => this.handleChangePD(e)}
                />
                <label
                  for="radio3"
                  style={{
                    border: this.state.checkedpd
                      ? '#5bc2e1'
                      : '1px solid #5bc2e1',
                    backgroundColor: this.state.checkedpd ? '#5bc2e1' : 'white'
                  }}
                />&ensp;PD
              </div>
            </div>
          </Head>
        </HeadContainer>
        {this.state.users.map((user, index) => {
          return (
            <PersonItem
              key={user.email}
              name={user}
              length={this.state.length[index]}
              roles={this.state.roles[index]}
              tags={this.state.tags[index]}
            />
          )
        })}
      </Sidebar>
    )
  }
}

export default PersonSidebar
