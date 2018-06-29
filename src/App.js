import React,{Component}from 'react'
import Header from './components/Header/Header'
import {
    BrowserRouter as Router,
    } from 'react-router-dom'
import Main from './Main'
import styled from 'styled-components'

const Container = styled.div`
    width:100%;
    height:100%;
`
class App extends Component {
    render() {
        return(
            <Container>
                <Router basename={'/traffic-app/build'}>
                    <div>
                        <Header />
                        <Main/>
                    </div>
                </Router>
            </Container>
        );
    }
}

export default App;