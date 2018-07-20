import React, { Component } from 'react'
import DashBoard from '../pages/Overview/DashBoard'
import Compare from '../pages/Overview/Compare'
import ViewByProject from '../pages/ViewByProject/ViewByProject'
import ViewByPerson from '../pages/ViewByPerson/ViewByPerson'
import Setting from '../pages/Setting/Setting'
import AddProject from '../pages/AddProject/AddProject'
import EachProject from '../pages/EachProject/EachProject'
import PersonalProject from '../pages/PersonalProject/PersonalProject'
import PrivateRoute from '../../src/components/privateRoute/index'

class MainRoute extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const viewbyproject = () => {
      return <ViewByProject updateHeader={this.props.updateHeader} />
    }
    return (
      <div style={{ position: 'relative', top: '56px' }}>
        <PrivateRoute exact path="/overview" component={DashBoard} />
        <PrivateRoute path="/overview/compare" component={Compare} />
        <PrivateRoute exact path="/project" component={viewbyproject} />
        <PrivateRoute exact path="/person" component={ViewByPerson} />
        <PrivateRoute path="/addproject" component={AddProject} />
        <PrivateRoute path="/setting" component={Setting} />
        <PrivateRoute path="/project/:id" component={EachProject} />
        <PrivateRoute path="/person/:id" component={PersonalProject} />
      </div>
    )
  }
}
export default MainRoute
