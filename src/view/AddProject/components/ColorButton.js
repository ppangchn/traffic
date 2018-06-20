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
        
    }
    render() {
        const { color, setCheckedColor, checkedColor } = this.props
        return(
            <div>
                {/* <lable className="container">
                <input type="checkbox" />
                <span class="checkmark" onClick={()=> this.setChecked()}>{this.state.checked}</span>
                </lable> */}
             <div className="shape" onClick={e => setCheckedColor(color)} style={{backgroundColor: color}}>{checkedColor == color && <Checkz />}</div>
             {/* <div className="check"></div> */}
            </div>

        );
    }
}
export default ColorButton;