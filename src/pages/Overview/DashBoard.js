import React, { Component } from 'react'
import UserDetail from '../../components/Views/Overview/UserDetail'
import styled from 'styled-components'
import url from '../../url'
import axios from 'axios'
import { Button } from 'reactstrap'
import {Timeline as TimelineIcon} from 'styled-icons/material/Timeline'
import './Overview.css'

const Timeline = TimelineIcon.extend`
  color: #5bc2e1
`
const Container = styled.div`
  background-color: #f1f5f8;
  display: flex;
  flex-direction: column;
`
const UserContainer = styled.div`
  overflow-x: scroll;
  display: flex;
  height: 155vh;
`
class Overview extends Component {
  constructor() {
    super()
    this.state = { data: [], graph: [] }
  }
  componentDidMount() {
    axios.get(`${url}/users/person`).then(res => {
      const { data } = res
      let graph = []
      console.log('data na -> ', data)
      data.map(data => {
        data.projectTimeline.map(timeline => {
          graph.push(timeline.project.process)
        })
      })
      this.setState({ data, graph })
    })
  }
  render() {
    return (
      <Container>
        <UserContainer>
          {this.state.data.map(user => {
            return (
              <div>
                <UserDetail
                  name={user.name}
                  graph={this.state.graph}
                  projectTimeline={user.projectTimeline}
                  updateHeader={this.props.updateHeader}
                />
              </div>
            )
          })}
        </UserContainer>
          <div className="comparecontainer">
            <Button color="compare"><Timeline className="timelineicon"/>{' '}Compare</Button>
          </div>
      </Container>
    )
  }
}

export default Overview
