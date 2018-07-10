import React, { Component } from 'react'
import styled from 'styled-components'
import Sidebar from '../../components/Views/Sidebar'
import axios from 'axios'
import url from '../../url'
import Select from 'react-select'
import './PersonSidebar.css'
const Item = styled.div`
  background-color: #ffffff;
  border-bottom: 0.5px solid #dfdfdf;
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
  padding-top: 5px;
  padding-bottom: 14px;
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
    }
  }
  getData() {
    axios.get(`${url}/users/person`).then(res => {
      const { data } = res
      // console.log('Data Project', data)
      let users = []
      let roles = []
      let tags = []
      let listmember = []
      data.map(user => {
        users.push(user.name)
        roles.push(user.roles.name)
        tags.push(user.tags)
        listmember.push({ value: user.id, label: user.name })
      })
      this.setState({ users, roles, tags, listmember })
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
        <HeadContainer>
          <Head className="personhead">&emsp;Name</Head>
        </HeadContainer>
        {this.state.users.map((user, index) => {
          return (
            <Item className="personitem">
              <User className="personname">{user}</User>
              <div style={{ display: 'flex', flexDirection: 'row' ,flexWrap:'wrap' }}>
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
