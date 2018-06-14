import styled from 'styled-components'
import React,{Component} from 'react'

const Container = styled.div`
    background-color : #eaf9fe;
    width : 15inch;
    height: 100%
    -webkit-background-size: cover;
    background-size: cover;
    display : grid;
    grid-template-columns: auto auto auto;
`
const Line = styled.div`
    border: 1px solid rgba(0, 0, 0, 0.8);
    padding: 20px;
    text-align: center;
    grid-column-start: 1;
    grid-column-end: 5;
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

