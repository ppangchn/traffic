import React,{Component} from 'react'
import Overview from '../pages/Overview/Overview'
import ViewbyProject from '../pages/Views/ViewbyProject/ViewbyProject'
import ViewbyPerson from '../pages/Views/ViewbyPerson/ViewbyPerson'
import Setting from '../pages/Setting/Setting'
import AddProject from '../pages/AddProject/AddProject'
import {
    Route
    } from 'react-router-dom'
    
class MainRoute extends Component {

    render() {
        return (
            <div>
                    <Route path="/project" component={ViewbyProject}/>
                    <Route path="/person" component={ViewbyPerson}/>
            </div>
        );
    }
    
}
export default MainRoute;

