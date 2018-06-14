import React,{Component} from 'react'
import styled from 'styled-components';

const Container = styled.div`
    display : grid;
    grid-template-columns: auto auto auto;
`

class Timeline extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <Container class="row">
  <div class="col">col</div>
  <div class="col">col</div>
  <div class="w-100"></div>
  <div class="col">col</div>
  <div class="col">col</div>
</Container>
        );
    }
}

export default Timeline;