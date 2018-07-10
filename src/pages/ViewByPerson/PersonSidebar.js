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
    this.state = { users: [], roles: [], tags: [], listmember: [] ,searchmember: ''}
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(value) {
    this.setState({searchmember: value})
  }
  componentDidMount() {
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
  render() {
    return (
      <Sidebar>
        <HeadContainer>
          <Head className="personhead">&emsp;Name</Head>
        </HeadContainer>
        <SearchBox className="searchbox">
          <Select
            style={{borderRadius: '50px',borderColor: '#e8e8e8'}}
            // name="form-field-name"
            placeholder="All Member"
            closeOnSelect={false}
            value={this.state.searchmember}
            onChange={this.handleChange}
            options={this.state.listmember}
          />
        </SearchBox>

        {this.state.users.map((user, index) => {
          return (
            <Item className="personitem">
              <User className="personname">{user}</User>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
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
