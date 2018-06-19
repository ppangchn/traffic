import React,{Component} from 'react'
import Overall from '../components/allProject/Overall'
import Project from '../components/allProject/Project'
import Person from '../components/allProject/Person'
import Setting from '../components/allProject/Setting'
import AddProject from '../components/addProject/AddProject'
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
                    <Route path="/" component={Overall}/>
                    <Route path="/project" component={Project}/>
                    <Route path="/person" component={Person}/>
                    <Route path="/addproject" component={AddProject}/>
                    <Route path="/setting" component={Setting}/>
            </div>
        );
    }
    
}
export default MainRoute;

