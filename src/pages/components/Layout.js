import React,{Component} from 'react'
import styled from 'styled-components'
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