import React,{Component} from 'react'
import Overall from '../components/allProject/Overall'
import Folder from '../components/allProject/Folder'
import Person from '../components/allProject/Person'
import Setting from '../components/allProject/Setting'
import Add from '../components/allProject/Add'
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
                <Router><Route exact path="/" component={Overall}/></Router> 
                <Router><Route path="/folder" component={Folder}/></Router>
                <Router><Route path="/person" component={Person}/></Router>
                <Router><Route path="/add" component={Add}/></Router>
                <Router><Route path="/setting" component={Setting}/></Router>
            </div>
        );
    }
    
}
export default MainRoute;

