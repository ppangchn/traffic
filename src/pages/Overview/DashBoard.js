import React, { Component } from 'react'
import UserDetail from '../../components/Views/Overview/UserDetail'
import styled from 'styled-components'
import url from '../../url'
import axios from 'axios'
import { Button } from 'reactstrap'
import { Timeline as TimelineIcon } from 'styled-icons/material/Timeline'
import { Link } from 'react-router-dom'
import './DashBoard.css'

const Timeline = TimelineIcon.extend`
	color: #5bc2e1;
`
const Container = styled.div`
	background-color: #f1f5f8;
	-webkit-background-size: cover;
	background-size: cover;
	display: flex;
	flex-direction: column;
	height: 100vh;
	overflow-x: hidden !important;
`
const UserContainer = styled.div`
	overflow-y: hidden;
	overflow-x: scroll;
	display: flex;
`
class DashBoard extends Component {
	constructor(props) {
		super(props)
		this.state = { data: [] }
	}

	componentDidMount() {
		// let token = auth.getToken()
		// let user = auth.decodeToken(token)
		axios.get(`${url}/users/pm`).then(res => {
			const { data } = res
			this.setState({ data })
		})
	}
	render() {
		return (
			<Container>
				<UserContainer>
					{this.state.data.map(user => {
						let graph = []
						user.projectManagement.map(timeline => {
							if (!timeline.project.isDisable) graph.push(timeline.weight)
						})
						return (
							<div key={user.id}>
								<UserDetail
									id={user.id}
									name={user.name}
									roles={user.roles}
									graph={graph}
									projectManagement={user.projectManagement}
									updateHeader={this.props.updateHeader}
								/>
							</div>
						)
					})}
				</UserContainer>
				<Link to="/overview/compare">
					<Button color="compare">
						<Timeline className="timelineicon" /> Compare
					</Button>
				</Link>
			</Container>
		)
	}
}

export default DashBoard
