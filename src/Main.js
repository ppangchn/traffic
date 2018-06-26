import React,{Component} from 'react'
import styled from 'styled-components'
import MainRoute from './routes/MainRoute'

const Container = styled.div`
    background-color : #eaf9fe;
    -webkit-background-size: cover;
    background-size: cover;
    flex-direction: row;
    display: flex;
    height : 33.8rem
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

