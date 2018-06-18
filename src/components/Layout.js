import React,{Component} from 'react'
import styled from 'styled-components'
// import { Container ,Row, Col } from 'reactstrap';
import {
    BrowserRouter as Router,
    Route
    } from 'react-router-dom'
import './Layout.css'
const Container = styled.div`
    background-color : #eaf9fe;
    flex-direction: row;
    display: flex;
`
class Layout extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Container>
                {this.props.children}
            </Container>
        );
    }
    
}
export default Layout

