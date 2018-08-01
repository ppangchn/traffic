import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Percent from './Percent'
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

  render() {
    const { project } = this.props
    return (
      <Item className={`projectitem`} key={project.id}>
        <div className="projectnamecontainer" style={{ display: 'flex' }}>
          <div
            className="projectname"
            style={{
              width: '85%',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              overflow: 'hidden'
            }}
          >
            <Link
              className="linkprojectname"
              to={`/project/${project.id}`}
              style={{
                textDecoration: 'none'
              }}
              onClick={this.update}
            >
              {project.name}
            </Link>
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
