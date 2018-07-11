import React, { Component } from 'react'
import UserDetail from '../../components/Views/Overview/UserDetail'
import styled from 'styled-components'
import url from '../../url'
import axios from 'axios'

const Container = styled.div`
  background-color: #f1f5f8;
  display: flex;
  height: 200vh;
  overflow-x: scroll;
`
class Overview extends Component {
  constructor() {
    super()
    this.state = { data: [] }
  }
  componentDidMount() {
    axios.get(`${url}/users/person`).then(res => {
      const { data } = res
      console.log('data na -> ', data)
      this.setState({ data })
    })
  }
  render() {
    return (
      <Container>
        {this.state.data.map(user => {
          return (
            <div>
              <UserDetail
                name={user.name}
                projectTimeline={user.projectTimeline}
                updateHeader={this.props.updateHeader}
              />
            </div>
          )
        })}
      </Container>
    )
  }
}

export default Overview
