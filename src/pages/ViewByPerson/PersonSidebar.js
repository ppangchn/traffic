import React, { Component } from 'react'
import styled from 'styled-components'
import Sidebar from '../../components/Views/Sidebar'
import axios from 'axios'
import url from '../../url'
import Select from 'react-select'
import './PersonSidebar.css'
import { max } from '../../../node_modules/moment'
const Item = styled.div`
  background-color: #ffffff;
  border-bottom: 0.5px solid #dfdfdf;
  border-right: 0.5px solid #dfdfdf;
  display: flex;
  flex-direction: column;
`
const Head = styled.div`
  padding-top: 10px;
`
const HeadContainer = styled.div`
  background-color: #ffffff;
  border-bottom: 0.5px solid #dfdfdf;
  border-right: 0.5px solid #dfdfdf;
`
const SearchBox = styled.div`
  background-color: #ffffff;
  border-bottom: 0.5px solid #dfdfdf;
  border-right: 0.5px solid #dfdfdf;
  padding-top: 5px;
  padding-bottom: 14px;
`
const User = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
class PersonSidebar extends Component {
  constructor() {
    super()
    this.state = {
      users: [],
      roles: [],
      tags: [],
      listmember: [],
      rolespm: ["ADMIN","PM","BD","PC","SA","BM"],
      rolespd: ["DEV","DSN","TS","QA"],
      length: [],
      checkedall: true,
      checkedpm: false,
      checkedpd: false
    }
  }
  handleChangeAll(e) {
    this.updateData(['all']);
    this.props.updateRoles(['all']);
    this.setState({
      checkedall: e.target.checked,
      checkedpm: false,
      checkedpd: false
    })
  }
  handleChangePM(e) {
    this.updateData(this.state.rolespm);
    this.props.updateRoles(this.state.rolespm);
    this.setState({
      checkedpm: e.target.checked,
      checkedall: false,
      checkedpd: false
    })
  }
  handleChangePD(e) {
    this.updateData(this.state.rolespd);
    this.props.updateRoles(this.state.rolespd);
    this.setState({
      checkedpd: e.target.checked,
      checkedall: false,
      checkedpm: false
    })
  }
  getData(wantedroles) {
    axios.get(`${url}/users/person`).then(res => {
      const { data } = res
      let users = []
      let roles = []
      let tags = []
      let listmember = []
      let length = []
      data.map(user => {
        if (this.state.checkedall || wantedroles.indexOf(user.roles.name)!==-1) {
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
    })
  }
  updateData(roles) {
    this.getData(roles)
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
            <div style={{ width: '60%' }}>&emsp;Name</div>
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
          </Head>
        </HeadContainer>
        {this.state.users.map((user, index) => {
          return (
            <Item
              key={user.email}
              className={`personitem${this.state.length[index]}`}
            >
              <User className="personname">{user}</User>
              <div
                className="persontagcontainer"
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  overflowX: 'hidden'
                }}
              >
                <div className="persontag">{this.state.roles[index]}</div>
                {this.state.tags[index].map(tag => {
                  return <div className="persontag">{tag.name}</div>
                })}
              </div>
            </Item>
          )
        })}
      </Sidebar>
    )
  }
}

export default PersonSidebar
