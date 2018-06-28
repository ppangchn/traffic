import React, { Component } from 'react'
import styled from 'styled-components'
import Sidebar from '../components/Sidebar'
import axios from 'axios'
import './PersonSidebar.css'
const Item = styled.div`
    background-color : #ffffff;
    border-bottom : 0.5px solid #dfdfdf;
    display: flex;
    flex-direction: column;
`
const Head = styled.div`
  padding-top: 10px;
`
const HeadContainer = styled.div`
    background-color : #ffffff;
    border-bottom : 0.5px solid #dfdfdf;
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
    this.state = { users: [] }
  }
  componentDidMount() {
    axios.get(`http://dev.pirsquare.net:3013/traffic-api/users`).then(res => {
      const { data } = res
      console.log('Data Project', data)
      this.setState({ users: data })
    })
  }
  render() {
    return (
      <Sidebar>
        <HeadContainer>
          <Head className="personhead">&emsp;Name</Head>
        </HeadContainer>
        {this.state.users.map(user => {
          return (
            <Item className="personitem">
              <User className="personname">{user.name}</User>
              <div style={{display:'flex' , flexDirection:'row'}}>
                <div className="persontag">{user.roles.name}</div>
                <div className="persontag">{user.tags}</div>
              </div>
            </Item>
          )
        })}
      </Sidebar>
    )
  }
}

export default PersonSidebar
