import React, { Component } from 'react'
import './CheckedPm.css'
class CheckedPm extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { pm, id } = this.props
    return (
      <div className={`pmcheckboxcontainer`}>
        <div
          className="pmcheckbox"
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <input type="checkbox" id={`checkInput${id}`} name="" />
          <label for={`checkInput${id}`} />
          <div className="pmcheckboxname">{pm}</div>
        </div>
      </div>
    )
  }
}

export default CheckedPm
