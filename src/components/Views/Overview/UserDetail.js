import React, { Component } from 'react'
import styled from 'styled-components'
import { Button, Progress } from 'reactstrap'
import AddProject from '../../../pages/AddProject/AddProject'
import { Link } from 'react-router-dom'
import { Line } from 'react-chartjs-2'
import './UserDetail.css'
import '../../../pages/ViewByProject/ProjectSidebar.css'

const Card = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  border-radius: 3px;
  box-shadow: 5px 5px 37px 5px #d8ecf5;
`
const Item = styled.div`
  background-color: #ffffff;
  border-bottom: 0.5px solid #fff6f5;
`

class UserDetail extends Component {
  constructor(props) {
    super(props)
    this.state = { toggleAddModal: false, data: {} }
    this.update = this.update.bind(this)
  }
  update() {
    this.props.updateHeader()
  }
  toggleAddModal(state) {
    this.setState({ toggleAddModal: state })
  }
  componentDidMount() {
    const data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Burn',
          fill: false,
          lineTension: 0.1,
          backgroundColor: '#20aadb',
          borderColor: '#98e3ff',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: '#20aadb',
          pointBackgroundColor: '#20aadb',
          pointBorderWidth: 5,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: '#20aadb',
          pointHoverBorderColor: '#20aadb',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: this.props.graph
        }
      ]
    }
    this.setState({ data })
  }
  render() {
    const { projectTimeline } = this.props
    return (
      <Card className="userdetail">
        {this.props.name}
        <Line data={this.state.data} />
        {/* <Scatter data={data}/> */}
        {projectTimeline.map(project => {
          if (!project.project.isDisable) {
            return (
              <Item className="overviewprojectitem">
                <div className="overviewprojectname">
                  <Link
                    className={
                      'linkprojectname-' + project.project.color.substring(1)
                    }
                    to={`/project/${project.project.id}`}
                    style={{
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      textDecoration: 'none'
                    }}
                    onClick={this.update}
                  >
                    {project.project.name}
                  </Link>
                  <div style={{ float: 'right' }}>
                    {project.project.process}%
                  </div>
                  <Progress
                    className="overviewprogress"
                    color={String(project.project.color).substring(1)}
                    value={project.project.process}
                  />
                </div>
              </Item>
            )
          }
        })}
        <Button onClick={() => this.toggleAddModal(true)} color="5bc2e1">
          + New Project
        </Button>
        {this.state.toggleAddModal && (
          <AddProject onClose={() => this.toggleAddModal(false)} />
        )}
      </Card>
    )
  }
}

export default UserDetail
