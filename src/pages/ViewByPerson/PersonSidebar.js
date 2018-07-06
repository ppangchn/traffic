import React, { Component } from 'react'
import styled from 'styled-components'
import Sidebar from '../../components/Views/Sidebar'
import axios from 'axios'
import url from '../../url'
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
const User = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const Weight = styled.div`
    font-size: 10px
    color: #5bc2e1
    display: flex;
`
class PersonSidebar extends Component {
  constructor() {
    super()
    this.state = { users: [], roles: [], tags: [] }
  }
  componentDidMount() {
    axios.get(`${url}/users`).then(res => {
      const { data } = res
      console.log('Data Project', data)
      let users = []
      let roles = []
      let tags = []
      data.map(
        user => users.push(user.name),
        // roles.push(user.roles.name)
        // tags.push(user.tags)
      )
      this.setState({ users, roles, tags })
    })
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
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                {/* <div className="persontag">{this.state.roles[index]}</div>
                {this.state.tags[index].map(user => {
                  return <div className="persontag">{user.tags}</div>
                })} */}
              </div>
            </Item>
          )
        })}
      </Sidebar>
    )
  }
}

export default PersonSidebar
