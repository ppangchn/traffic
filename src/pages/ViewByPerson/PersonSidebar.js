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
      length: []
    }
  }
  getData() {
    axios.get(`${url}/users/person`).then(res => {
      const { data } = res
      let users = []
      let roles = []
      let tags = []
      let listmember = []
      let length = []
      data.map(user => {
        users.push(user.name)
        roles.push(user.roles.name)
        tags.push(user.tags)
        listmember.push({ value: user.id, label: user.name })
        let count = 0
        let start = 10000000000000000000000
        let end = 0
        let startmillisecond = 0
        let endmillisecond = 0
        user.projectTimeline.map(timeline => {
          if (!timeline.project.isDisable && timeline.start && timeline.end) {
            startmillisecond = new Date(timeline.start).getTime()
            endmillisecond = new Date(timeline.end).getTime()
            if (
              !(
                (start < startmillisecond && end < startmillisecond) ||
                (start > endmillisecond && end > endmillisecond)
              )
            ) {
              count++
            }
            start = Math.min(start, startmillisecond)
            end = Math.max(end, endmillisecond)
          }
        })
        length.push(count)
      })
      this.setState({ users, roles, tags, listmember, length })
      console.log('length -> ', length)
    })
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
          <Head className="personhead">&emsp;Name</Head>
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
                  flexWrap: 'wrap'
                }}
              >
                <div className="persontag">{this.state.roles[index]}</div>
                {this.state.tags[index].map(tag => {
                  return (
                    <div
                      
                      className="persontag"
                    >
                      {tag.name}
                    </div>
                  )
                })}
              </div>
              <hr className={`horizonline${this.state.length[index]}`}/>
            </Item>
          )
        })}
      </Sidebar>
    )
  }
}

export default PersonSidebar
