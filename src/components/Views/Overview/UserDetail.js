import React, { Component } from 'react'
import styled from 'styled-components'
import { Button } from 'reactstrap'
import AddProject from '../../../pages/AddProject/AddProject'
import { Line } from 'react-chartjs-2'
import { PrimitiveDot as Dot } from 'styled-icons/octicons/PrimitiveDot'
import ProcessWeight from './ProcessWeight'
import { Edit as EditIcon } from 'styled-icons/material/Edit'
import axios from 'axios'
import url from '../../../url'
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
      capacitycolor: ['#73d363', '#d7cd5c', '#c83131'],
      canEdit: false,
      disableProcessWeight: true
    }
    this.update = this.update.bind(this)
  }
  toggleAddModal(state) {
    this.setState({ toggleAddModal: state })
  }
  update() {
    this.props.updateHeader()
  }
  setEditProcessWeight() {
    this.setState({ disableProcessWeight: !this.state.disableProcessWeight })
    if (!this.state.disableProcessWeight) {
      const data = {
        id: this.props.id,
        // projectManagement: 
      }
      // axios.put(`${url}/users/pm`,data)
    }
    
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
    if (this.props.loginUserId === this.props.id) {
      this.setState({ canEdit: true })
    }
  }
  render() {
    const { projectManagement } = this.props
    return (
      <Card
        className="userdetail"
        style={{
          outline: this.state.canEdit ? '7px solid #5bc2e1' : '',
          position: 'relative',
          top: this.state.canEdit ? '7px' : '0',
          marginRight: this.state.canEdit ? '7px' : '0',
          paddingTop: this.state.canEdit ? '3px' : '10px'
        }}
      >
        <div className="userdetailusername">
          <Dot
            className="dot"
            style={{ color: this.state.capacitycolor[0] }}
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
          <div className="editprocessweightbox">
            {this.state.canEdit && (
              <Edit
                style={{
                  color: this.state.disableProcessWeight ? 'none' : '#5bc2e1'
                }}
                // onMouseOver={this.style.color = '#5bc2e1'}
                className="editprocessweight"
                onClick={() => this.setEditProcessWeight()}
              />
            )}
          </div>
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
