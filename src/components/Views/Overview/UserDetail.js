import React, { Component } from 'react'
import styled from 'styled-components'
import { Button } from 'reactstrap'
import AddProject from '../../../pages/AddProject/AddProject'
import { Line } from 'react-chartjs-2'
import { PrimitiveDot as Dot } from 'styled-icons/octicons/PrimitiveDot'
import ProcessWeight from './ProcessWeight'
import { Edit as EditIcon } from 'styled-icons/material/Edit'
import './UserDetail.css'
import '../../../pages/ViewByProject/ProjectSidebar.css'

const Edit = EditIcon.extend`
  position: relative;
  color: #d9d9d9
  :hover ${Edit} {
    color: #5bc2e1
  }
`
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
      capacitycolor: ['#73d363', '#ffdc1a', '#c83131'],
      canEdit: false,
      disableProcessWeight: true,
      graph: []
    }
    this.update = this.update.bind(this)
  }
  toggleAddModal(state) {
    this.setState({ toggleAddModal: state })
  }
  update() {
    this.props.updateHeader()
  }
  componentDidMount() {

    console.log('props on did mount -> ', this.props.graph)
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
    if (this.props.loginUserId === this.props.id) {
      this.setState({ disableProcessWeight: false })
    }
  }

  componentWillReceiveProps(props) {
    // let { graph } = props

    // this.setState({graph})
    console.log('props new -> ' , props)
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
          data: props.graph,
          responsive: true
        }
      ]
    }
    this.setState({ data })
    console.log('prop new -> ', props)
  }

  render() {
    const { projectManagement } = this.props
    return (
      <Card
        className="userdetail"
        style={{
          outline: !this.state.disableProcessWeight ? '7px solid #5bc2e1' : '',
          position: 'relative',
          top: !this.state.disableProcessWeight ? '7px' : '0',
          marginRight: !this.state.disableProcessWeight ? '7px' : '0',
          paddingTop: !this.state.disableProcessWeight ? '3px' : '10px'
        }}
      >
        <div className="userdetailusername">
          <Dot
            className="dot"
            style={{ color: this.state.capacitycolor[this.props.indexcurrentcolor] }}
            options={{
              scales: {
                xAxes: [
                  {
                    ticks: {
                      display: false
                    }
                  }
                ]
              }
            }}
          />
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
              },
              legend: { display: false }
            }}
          />
        </div>
        <div className="eachItem">
          {projectManagement.map(project => {
            if (!project.isDisable) {
              return (
                <Item key={project.id} className="overviewprojectitem">
                  <ProcessWeight
                    userid={this.props.loginUserId}
                    pmid={project.id}
                    projectID={project.project.id}
                    projectName={project.project.name}
                    color={project.project.color}
                    allprocessweight={project.processWeight}
                    disableProcessWeight={this.state.disableProcessWeight}
                  />
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
