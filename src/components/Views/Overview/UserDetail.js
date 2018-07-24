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
			// <div>
			<Card className="userdetail">
				{this.props.name}
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
				<div className="eachItem">
					{projectManagement.map(project => {
						if (!project.isDisable) {
							return (
								<Item key={project.id} className="overviewprojectitem">
									<div className="overviewprojectname">
										<Link
											className="linkprojectname"
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
										{/* <div style={{ float: 'right' }}>{100}%</div> */}
										<div style={{ float: 'right' }}>{project.processWeight.processWeight}%</div>
										<Progress
											className="overviewprogress"
											color={String(project.project.color).substring(1)}
											// value={100}
											value={project.processWeight.processWeight}
										/>
									</div>
								</Item>
							)
						}
					})}
				</div>

				<div className="boxButton">
					<Button onClick={() => this.toggleAddModal(true)} color="newproject5bc2e1">
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
			// </div>
		)
	}
}

export default UserDetail
