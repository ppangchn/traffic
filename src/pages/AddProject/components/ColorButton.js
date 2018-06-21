import React,{Component} from 'react'
import {Check} from 'styled-icons/material/Check';
import './ColorButton.css'
const Checkz = Check.extend`
    position: absolute;
    bottom: 1.5px; !important;
`

//เรียก function ใน layout และส่งขึันไป
class ColorButton extends Component {
    constructor(props) {
        super(props);
        this.state = {click : false}
        
    }
   toggle() {
        this.setState({click:!this.state.click})
        console.log(this.state.click);
    }
    render() {
        const { color, setCheckedColor, checkedColor } = this.props
        return(
            <div>
             <div className="shape" onClick={() => {setCheckedColor(color),this.toggle()}} style={{backgroundColor: color}}>{!this.state.click || checkedColor == color && <Checkz />}</div>
            </div>

        );
    }
}
export default ColorButton;