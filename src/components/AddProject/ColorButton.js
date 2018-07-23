import React, { Component } from 'react'
import { Check } from 'styled-icons/material/Check'
import { Star } from 'styled-icons/fa-solid/Star'

import './ColorButton.css'
const Checkz = Check.extend`
    position: absolute;
    bottom: 1.5px; !important;
`
const Starz = Star.extend`
    position: absolute;
    bottom: 1.5px; !important;
    padding: 1px;
`
// const Used = X.extend`
//     position: absolute;
    
// `
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
          style={{ backgroundColor: color }}
        >
          {checkedColor == color && !this.props.used && <Checkz />}
          {this.props.used && <Starz />}
        </div>
      </div>
    )
  }
}
export default ColorButton
