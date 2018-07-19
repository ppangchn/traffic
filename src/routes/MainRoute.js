import React, { Component } from 'react'
import DashBoard from '../pages/Overview/DashBoard'
import Compare from '../pages/Overview/Compare'
import ViewByProject from '../pages/ViewByProject/ViewByProject'
import ViewByPerson from '../pages/ViewByPerson/ViewByPerson'
import Setting from '../pages/Setting/Setting'
import AddProject from '../pages/AddProject/AddProject'
import EachProject from '../pages/EachProject/EachProject'
import { Route, withRouter } from 'react-router-dom'
import PersonalProject from '../pages/PersonalProject/PersonalProject'

class MainRoute extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const viewbyproject = () => {
      return <ViewByProject updateHeader={this.props.updateHeader} />
    }
    return (
      <div 
      // style={{position:'relative',zIndex:'-1'}}
      >
        <Route exact path="/overview" component={withRouter(DashBoard)} />
        <Route path="/overview/compare" component={withRouter(Compare)} />
        <Route exact path="/project" component={withRouter(viewbyproject)} />
        <Route exact path="/person" component={withRouter(ViewByPerson)} />
        <Route path="/addproject" component={withRouter(AddProject)} />
        <Route path="/setting" component={withRouter(Setting)} />
        <Route path="/project/:id" component={withRouter(EachProject)} />
        <Route path="/person/:id" component={withRouter(PersonalProject)} />
      

      </div>
    )
  }
}
export default MainRoute
