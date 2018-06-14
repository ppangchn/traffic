import React,{Component} from 'react'
import Header from './components/Header'
import Overall from './components/allProject/Overall'
import Folder from './components/allProject/Folder'
import Person from './components/allProject/Person'
import {
    BrowserRouter as Router,
    Route
    } from 'react-router-dom'


class App extends Component {
    //exact path : /projectoverview
    render() {
        return(
            <div>
                <Header />
                <Router><Route exact path="/" component={Overall}/></Router> 
                <Router><Route path="/folder" component={Folder}/></Router>
                <Router><Route path="/person" component={Person}/></Router>
            </div>
            
        );
    }
}

export default App;