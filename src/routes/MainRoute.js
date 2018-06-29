import React, { Component } from 'react'
import Overview from '../pages/Overview/Overview'
import ViewByProject from '../pages/ViewByProject/ViewByProject'
import ViewByPerson from '../pages/ViewByPerson/ViewByPerson'
import Setting from '../pages/Setting/Setting'
import AddProject from '../pages/AddProject/AddProject'
import EachProject from '../pages/EachProject/EachProject'
import { Route, withRouter } from 'react-router-dom'
import { Container } from 'reactstrap'
class MainRoute extends Component {
	render() {
		console.log('SDFKLSDFKSJFLDSJKLFJDSKLFJKDSLFJKLDSJFKLDSF')
		return (
			<div>
				<Route path="/" component={withRouter(Overview)} />
				<Route exact path="/project" component={withRouter(ViewByProject)} />
				<Route path="/person" component={withRouter(ViewByPerson)} />
				<Route path="/addproject" component={withRouter(AddProject)} />
				<Route path="/setting" component={withRouter(Setting)} />
				<Route path="/project/:id" component={withRouter(EachProject)} />
			</div>
		)
	}
}
export default MainRoute
