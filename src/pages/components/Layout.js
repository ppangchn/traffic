import React,{Component} from 'react'
import styled from 'styled-components'
const Container = styled.div`
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