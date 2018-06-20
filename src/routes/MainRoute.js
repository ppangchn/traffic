import React,{Component} from 'react'
import Overview from '../view/Overview/Overview'
import ViewbyProject from '../view/ViewbyProject/ViewbyProject'
import ViewbyPerson from '../view/ViewbyPerson/ViewbyPerson'
import Setting from '../view/Setting/Setting'
import AddProject from '../view/AddProject/AddProject'
// import { Container ,Row, Col } from 'reactstrap';

import {
    BrowserRouter as Router,
    Route
    } from 'react-router-dom'
class MainRoute extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                    <Route path="/" component={Overview}/>
                    <Route path="/project" component={ViewbyProject}/>
                    <Route path="/person" component={ViewbyPerson}/>
                    <Route path="/addproject" component={AddProject}/>
                    <Route path="/setting" component={Setting}/>
            </div>
        );
    }
    
}
export default MainRoute;

