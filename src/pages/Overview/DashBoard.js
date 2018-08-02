import React, { Component } from 'react'
import UserDetail from '../../components/Views/Overview/UserDetail'
import styled from 'styled-components'
import url from '../../url'
import axios from 'axios'
import { Button } from 'reactstrap'
import { Timeline as TimelineIcon } from 'styled-icons/material/Timeline'
import { Link } from 'react-router-dom'
import auth from '../../service/index'
import './DashBoard.css'

const Timeline = TimelineIcon.extend`
  color: #5bc2e1;
`
const Container = styled.div`
  background-color: #f1f5f8;
  -webkit-background-size: cover;
  background-size: cover;
  display: flex;
  flex-direction: column;
`
const UserContainer = styled.div`
  overflow-y: hidden;
  overflow-x: scroll;
  display: flex;
  height: 100vh;
`
class DashBoard extends Component {
  constructor(props) {
    super(props)
    this.state = { data: [], loginUserId: '', allUser: [] }
  }
  async getData() {
    await axios.get(`${url}/users/pm`).then(res => {
      const { data } = res
      this.setState({ data })
      const user = auth.getToken()
      const userDecoded = auth.decodeToken(user)
      let loginUserId = userDecoded.id
      this.setState({ loginUserId })
      let allUser = []
      let loginUser = {}
      data.map(user => {
        if (user.id !== loginUserId) {
          allUser.push(user)
        } else loginUser = user
      })
      allUser.unshift(loginUser)
      this.setState({ allUser })
    })
    const loader = document.getElementById("loader")
      loader.hidden = true;
  }
  componentDidMount() {
    try {
      this.getData()
      
    } catch (error) {
      console.log('cant get data at dsahboard',error)
    }
  }

  render() {
    return (
      <Container >
        <div id="loader" className="loader"></div>
        <UserContainer>
          {this.state.allUser.map(user => {
            let graph = []
            if (user.projectManagement) {
              user.projectManagement.map(timeline => {
                if (!timeline.project.isDisable) graph.push(timeline.weight)
              })
              return (
                <div key={user.id}>
                  <UserDetail
                    id={user.id}
                    name={user.name}
                    roles={user.roles}
                    graph={graph}
                    projectManagement={user.projectManagement}
                    updateHeader={this.props.updateHeader}
                    loginUserId={this.state.loginUserId}
                  />
                </div>
              )
            }
          })}
        </UserContainer>
        <Link to="/overview/compare">
          <Button color="compare">
            <Timeline className="timelineicon" /> Compare
          </Button>
        </Link>
      </Container>
    )
  }
}

export default DashBoard
