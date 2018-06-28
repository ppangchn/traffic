import React,{Component} from 'react'
import Overview from '../pages/Overview/Overview'
import ViewByProject from '../pages/Views/ViewByProject/ViewByProject'
import ViewByPerson from '../pages/Views/ViewByPerson/ViewByPerson'
import Setting from '../pages/Setting/Setting'
import AddProject from '../pages/AddProject/AddProject'
import EachProject from '../pages/Views/EachProject/EachProject'
import {
    Route
    } from 'react-router-dom'
    
class MainRoute extends Component {

    render() {
        return (
            <div>
                    <Route path="/" component={Overview}/>
                    <Route exact path="/project" component={ViewByProject}/>
                    <Route path="/person" component={ViewByPerson}/>
                    <Route path="/addproject" component={AddProject}/>
                    <Route path="/setting" component={Setting}/>
                    <Route path="/project/:id" component={EachProject}/>
            </div>
        );
    }
    
}
export default MainRoute;

