import React, { Component } from 'react'
import styled from 'styled-components'
import { Button, Progress } from 'reactstrap'
import AddProject from '../../../pages/AddProject/AddProject'
import { Line } from 'react-chartjs-2'
import { PrimitiveDot } from 'styled-icons/octicons/PrimitiveDot'
import ProcessWeight from './ProcessWeight'
import './UserDetail.css'
import '../../../pages/ViewByProject/ProjectSidebar.css'

const Dot = PrimitiveDot.extend``
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
    this.state = {
      toggleAddModal: false,
      data: {},
      capacitycolor: ['#73d363', '#d7cd5c', '#c83131']
    }
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
      labels: ['W 1', 'W 2', 'W 3', 'W 4'],
      datasets: [
        {
          label: '',
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
          data: this.props.graph,
          responsive: true
        }
      ]
    }
    this.setState({ data })
  }
  render() {
    const { projectManagement } = this.props
    return (
      <Card className="userdetail">
        <div>
          <Dot className="dot" style={{ color: this.state.capacitycolor[0] }} />
          {this.props.name}
        </div>
        <div>
          <Line
            data={this.state.data}
            height={350}
            options={{
              maintainAspectRatio: true,
              scales: {
                yAxes: [
                  {
                    display: true,
                    ticks: {
                      suggestedMin: 0,
                      suggestedMax: 100
                    }
                  }
                ]
              }
            }}
          />
        </div>
        <div className="eachItem">
          {projectManagement.map(project => {
            if (!project.isDisable) {
              return (
                <Item key={project.id} className="overviewprojectitem">
                  <ProcessWeight projectID={project.project.id} projectName={project.project.name} color={project.project.color} allprocessweight={project.processWeight}/>
                </Item>
              )
            }
          })}
        </div>

        <div className="boxButton">
          <Button
            onClick={() => this.toggleAddModal(true)}
            color="newproject5bc2e1"
          >
            + New Project
          </Button>
        </div>
        {this.state.toggleAddModal && (
          <AddProject
            onClose={() => this.toggleAddModal(false)}
            userid={this.props.id}
            username={this.props.name}
            roles={this.props.roles}
          />
        )}
      </Card>
    )
  }
}

export default UserDetail
