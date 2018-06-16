import React,{Component} from 'react'
import { Container ,Row, Col } from 'reactstrap';
import Timeline from './Timeline'
import './Box.css'

class Box extends Component {
    constructor() {
        super();
    }
    render() {
        return (
          <div className="boxz">
          <Timeline />
          </div>
        );
    }
}

export default Box;