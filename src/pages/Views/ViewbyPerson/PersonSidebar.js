import React, { Component } from 'react'
import styled from 'styled-components'
import Sidebar from '../components/Sidebar'
import axios from 'axios'
import '../ViewbyProject/ProjectSidebar.css'
const Item = styled.div`
    width : 300px
    height : 80px
    background-color : #ffffff;
    font-family : Verdana
    border-bottom : 0.5px solid #dfdfdf;
`

const Head = styled.div`
    padding-top : 10px
    font-size : 20px
`
const HeadContainer = styled.div`
    width : 300px
    height : 60px
    background-color : #ffffff;
    font-family : Verdana
    border-bottom : 0.5px solid #dfdfdf;
    padding-top: 5px;
    padding-bottom: 14px;
`
const User = styled.div`
  margin-left: 20px;
  padding-top: 15px;
  padding-right: 25px;
  padding-bottom: 5px;
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
          <Head>
            &emsp;Name
          </Head>
        </HeadContainer>
        {this.state.users.map(user => {
          return (
            <div>
              <Item>
                <User>
                  {user.name}&ensp;
                  <div></div>
                </User>
              </Item>
            </div>
          )
        })}
      </Sidebar>
    )
  }
}

export default PersonSidebar
