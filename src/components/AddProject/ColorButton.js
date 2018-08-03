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
    this.state = { iscurrentcolor: false }
  }
  componentWillReceiveProps(props) {
    // console.log(props)
    if (props.checkedColor == props.color)
      this.setState({ iscurrentcolor: true })
  }
  render() {
    const { color, setCheckedColor, checkedColor , used } = this.props
    return (
      <div>
        <div
          className="shape"
          onClick={() => {
            setCheckedColor(color, used, checkedColor)
          }}
          style={{
            backgroundColor: color
          }}
        >
          {((checkedColor == color && !this.props.used) ||
            (this.props.used && checkedColor == color)) && <Checkz />}
          {this.props.used &&
            checkedColor !== color &&
            !this.state.iscurrentcolor && <div className="usedicon">*</div>}
        </div>
      </div>
    )
  }
}
export default ColorButton
