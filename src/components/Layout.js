import styled from 'styled-components'
import React,{Component} from 'react'

const Container = styled.div`
    background-color : #eaf9fe;
    width : 15inch;
    height: 100%
    -webkit-background-size: cover;
    background-size: cover;
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

