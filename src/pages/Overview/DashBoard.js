import React, { Component } from 'react'
import UserDetail from '../../components/Views/Overview/UserDetail'
import styled from 'styled-components'
import url from '../../url'
import axios from 'axios'
import { Button } from 'reactstrap'
import { Timeline as TimelineIcon } from 'styled-icons/material/Timeline'
import { Link } from 'react-router-dom'
import auth from '../../service/index'
import './DashBoard.css'
import { FilePdf } from 'styled-icons/fa-solid';

const Timeline = TimelineIcon.extend`
	color: #5bc2e1;
`
const Container = styled.div`
	background-color: #f1f5f8;
	-webkit-background-size: cover;
	background-size: cover;
	display: flex;
	flex-direction: column;
`
const UserContainer = styled.div`
	overflow-y: hidden;
	overflow-x: scroll;
	display: flex;
	height: 100vh;
`
class DashBoard extends Component {
	constructor(props) {
		super(props)
		this.state = { data: [], loginUserId: '', allUser: [], weekList: [], graph: [] }
	}
	async getData() {
		await axios.get(`${url}/users/pm`).then(res => {
			console.log(res)
			const { data } = res
			this.setState({ data })
			const user = auth.getToken()
			const userDecoded = auth.decodeToken(user)
			let loginUserId = userDecoded.id
			this.setState({ loginUserId })
			let allUser = []
			let loginUser = {}
			data.map(user => {
				if (user.id !== loginUserId) {
					allUser.push(user)
				} else loginUser = user
			})
			allUser.unshift(loginUser)
			this.setState({ allUser })
		})
		const loader = document.getElementById('loader')
    loader.hidden = true
	}

  getDataWeek() {
	  axios.get(`${url}/processWeight/getListWeek`).then(res => {
      console.log('DataWeek --> ',res);

      this.setState({weekList: res.data})
      
    })
  }
  
	componentDidMount() {
		try {
      this.getData()
      this.getDataWeek()
		} catch (error) {
			console.log('cant get data at dsahboard', error)
		}
	}

	render() {
		return (
			<Container>
				<div id="loader" className="loader" />
				<UserContainer>
					{this.state.allUser.map(user => {


						let graph = []
						let tempGraph = [{ value: 0, counter: 0 }, { value: 0, counter: 0 }, { value: 0, counter: 0 }, { value: 0, counter: 0 }]
            let { weekList } = this.state
            console.log(weekList)
            weekList.map(($objWeek, $index) => {
              let weekListDate = new Date($objWeek)
              let weekListString = `${weekListDate.getFullYear()}-${weekListDate.getMonth()}-${weekListDate.getDate()}`
              user.projectManagement.filter(($filPm) => {
                return !$filPm.isDisable
              }).map(($objPm) => {
                let findProcessWeight = $objPm.processWeight.find(($fndWeight) => {
                  let weightDate = new Date($fndWeight.created)
                  let weightDateStr = `${weightDate.getFullYear()}-${weightDate.getMonth()}-${weightDate.getDate()}`
                  return weekListString == weightDateStr
                })

                if (!!findProcessWeight) {
                  tempGraph[$index].value += findProcessWeight.processWeight
                  tempGraph[$index].counter += 1
                }

              })
            })

            tempGraph.map(($objGraph, $index) => {
							console.log($objGraph)
							if (!!$objGraph.counter) {
								graph[$index] = $objGraph.value / $objGraph.counter
							} else {
								graph[$index] = 0
							}
            })

            console.log('cal graph -> ', graph)
						if (user.projectManagement) {
							return (
								<div key={user.id}>
									<UserDetail
										id={user.id}
										name={user.name}
										roles={user.roles}
										graph={graph}
										projectManagement={user.projectManagement}
										updateHeader={this.props.updateHeader}
										loginUserId={this.state.loginUserId}
									/>
								</div>
							)
						}
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
