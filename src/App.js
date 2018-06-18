import React,{Component}from 'react'
// import { Container, Row, Col } from 'reactstrap';
import Header from './components/Header'
import Overall from './components/allProject/Overall'
import Folder from './components/allProject/Folder'
import Person from './components/allProject/Person'
import Setting from './components/allProject/Setting'
import {
    BrowserRouter as Router,
    Route
    } from 'react-router-dom'
import Main from './components/Main'
import styled from 'styled-components'

const Container = styled.div`
    width:100%;
    height:100%;

`
class App extends Component {
    //exact path : /projectoverview
    render() {
        return(
            <Container>
                <Header />
                <Main/>
            </Container>
        //     <Container>     
        // <Row>
        //   <Col><Header /></Col>
        // </Row>
        // <Row>
        //     <Col>
        //         <Main/>
        //     </Col>
        // </Row>
        // </Container>
            // <div class="container">
            // <div class="row">
            // <div class="col">
            //     <Header />
            //     </div>
            // </div>
            // <div class="row">
            // <div class="col">
            // <Router><Route exact path="/" component={Overall}/></Router> 
            //     <Router><Route path="/folder" component={Folder}/></Router>
            //     <Router><Route path="/person" component={Person}/></Router>
            //     <Router><Route path="/setting" component={Setting}/></Router>
            //     </div>
            //     </div>
                
            // </div>
            
            
        );
    }
}

export default App;