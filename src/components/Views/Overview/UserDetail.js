import React, { Component } from 'react'
import styled from 'styled-components'
import { Button , Progress} from 'reactstrap'
import AddProject from '../../../pages/AddProject/AddProject'
import { Link } from 'react-router-dom'
import {Line} from 'react-chartjs-2';
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
const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
};
class UserDetail extends Component {
  constructor(props) {
    super(props)
    this.state = { toggleAddModal: false }
    this.update = this.update.bind(this)
  }
  update() {
    this.props.updateHeader()
  }
  toggleAddModal(state) {
    this.setState({ toggleAddModal: state })
  }
  render() {
    const { projectTimeline } = this.props
    return (
      <Card className="userdetail">
        {this.props.name}
        <Line data={data} />
        {projectTimeline.map(project => {
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
                <div style={{float: 'right'}}>{project.project.process}%</div>
                <Progress
                  className="overviewprogress"
                  color={String(project.project.color).substring(1)}
                  value={project.project.process}
                />
              </div>
            </Item>
          )
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
