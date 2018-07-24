import React, { Component } from 'react'
import { Check } from 'styled-icons/material/Check'

import './ColorButton.css'
const Checkz = Check.extend`
    position: absolute;
    bottom: 1.5px; !important;
`
class ColorButton extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { color, setCheckedColor, checkedColor } = this.props
    return (
      <div>
        <div
          className="shape"
          onClick={() => {
            setCheckedColor(color,this.props.used)
          }}
          style={{ backgroundColor: color ,
            // filter: this.props.used ? 'opacity(20%)' : null
        }}
        >
          {checkedColor == color && !this.props.used && <Checkz />}
          {this.props.used && <div className="usedicon">*</div>}
        </div>
      </div>
    )
  }
}
export default ColorButton
