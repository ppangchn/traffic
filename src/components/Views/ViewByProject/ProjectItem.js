import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Percent from './Percent'
import moment from 'moment'
import './ProjectItem.css'

const Item = styled.div`
  background-color: #ffffff;
  border-bottom: 0.5px solid #e4eaed;
  border-right: 0.5px solid #e4eaed;
`
const Pm = styled.div`
  display: inline-block;
  text-align: center;
`

class ProjectItem extends Component {
  constructor() {
    super()
    this.state = { start: '', end: '' }
  }
  componentDidMount() {
    const { timeline } = this.props.project
    let start = ''
    let end = ''
    if (timeline.start && timeline.end) {
      start = moment(timeline.start).format('DD/MM/YY') + '-'
      end = moment(timeline.end).format('DD/MM/YY')
    }
    this.setState({ start, end })
  }
  render() {
    const { project } = this.props
    return (
      <Item className={`projectitem`} key={project.id}>
        <div className="projectnamecontainer" style={{ display: 'flex' }}>
          <div
            className="projectname"
            style={{
              whiteSpace: 'nowrap'
            }}
          >
            <div className="linkprojectnamecontainer">
              <Link
                className="linkprojectname"
                to={`/project/${project.id}`}
                style={{
                  textDecoration: 'none',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden'
                }}
                onClick={this.update}
              >
                {project.name}
              </Link>
            </div>
            <div
              className="projectdate"
              style={{
                display: 'flex',
                color: ' #9d9d9d',
                paddingLeft: '1px'
              }}
            >
              <div>{this.state.start}</div>
              <div>{this.state.end}</div>
            </div>
          </div>
        </div>

        <Percent project={project} />
        <div
          id={'pmcontainer' + project.id}
          className="pmcontainer"
          style={{
            overflowX: 'auto',
            overflowY: 'hidden'
          }}
        >
          {project.projectManagement.map(pm => {
            if (!pm.isDisable) {
              return (
                <Pm key={pm.id} className="pmname">
                  <Link
                    to={`/person/${pm.users.id}`}
                    style={{ color: 'black', textDecoration: 'none' }}
                    onClick={this.update}
                  >
                    {pm.users.name}
                  </Link>
                </Pm>
              )
            }
          })}
        </div>
      </Item>
    )
  }
}

export default ProjectItem
