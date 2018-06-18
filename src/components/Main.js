import React,{Component} from 'react'
import styled from 'styled-components'
import MainRoute from '../routes/MainRoute'
// import { Container ,Row, Col } from 'reactstrap';
import {
    BrowserRouter as Router,
    Route
    } from 'react-router-dom'
import './Layout.css'
const Container = styled.div`
    background-color : #eaf9fe;
    -webkit-background-size: cover;
    background-size: cover;
    flex-direction: row;
    display: flex;
    height : 34rem
`
class Main extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Container>
                <MainRoute />
            </Container>
        );
    }
    
}
export default Main

