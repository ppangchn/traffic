import React,{Component} from 'react'
import {Check} from 'styled-icons/material/Check';
import { Container ,Row, Col, Progress } from 'reactstrap';
import './ColorButton.css'
import AddProject from './AddProject'
const Checkz = Check.extend`
    position: absolute;
    bottom: 1.5px; !important;
`

//เรียก function ใน layout และส่งขึันไป
class ColorButton extends Component {
    constructor(props) {
        super(props);
        this.state={checkedpic:null,checked:false}
    }
    setChecked() {
        console.log(this.props.unchecked)
        if (this.state.checked || this.props.unchecked) {
            console.log('UNCHECKED!');
            this.props.setCheckedColor(null);
            this.setState({checkedpic:null , checked:false})
        }
        else if (!this.state.checked) {
            this.props.setCheckedColor(this.props.color);
            this.setState({checkedpic:<Checkz />,checked:true})
        }
        console.log(this.props.color)
    }
    render() {
        return(
            <div>
                {/* <lable className="container">
                <input type="checkbox" />
                <span class="checkmark" onClick={()=> this.setChecked()}>{this.state.checked}</span>
                </lable> */}
             <div className="shape" onClick={() => {this.setChecked()}} style={{backgroundColor: this.props.color}}>{this.state.checkedpic}</div>
             {/* <div className="check"></div> */}
            </div>

        );
    }
}
export default ColorButton;