import React,{Component} from 'react'
import styled from 'styled-components'
import MainRoute from './routes/MainRoute'

const Container = styled.div`
    background-color : #eaf9fe;
    -webkit-background-size: cover;
    background-size: cover;
    flex-direction: row;
    display: flex;
    height: 100vh;
`
class Main extends Component {
    render() {
        return (
            <Container>
                <MainRoute />
            </Container>
        );
    }
    
}
export default Main

