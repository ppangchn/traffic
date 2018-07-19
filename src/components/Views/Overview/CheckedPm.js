import React, { Component } from 'react'
import './CheckedPm.css'
class CheckedPm extends Component {
  constructor(props) {
    super(props)
    this.state = { checked: false, order: 0, currentorder: 0 }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(e) {
    console.log('order na ja ->', this.props.order + 1)
    const checked = e.target.checked
    const order = this.props.order + 1
    let { currentorder } = this.state
    if (this.props.order < 5) {
      if (checked) {
        if (
          currentorder != 0 && (currentorder + 1 != order ||
          currentorder - 1 != order)
        )
          this.setState({ order: currentorder })
        else {
          this.props.setOrder(true)
          this.setState({ order })
          this.setState({ currentorder: order })
        }
        console.log(this.props.color[order])
        console.log(this.props.weight)
        const data = {
          label: 'Burn',
          fill: false,
          lineTension: 0.1,
          backgroundColor: this.props.color[order].bg,
          borderColor: this.props.color[order].line,
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: this.props.color[order].pointborder,
          pointBackgroundColor: this.props.color[order].point,
          pointBorderWidth: 10,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: '#20aadb',
          pointHoverBorderColor: '#20aadb',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: this.props.weight
        }
        this.props.updateGraph(data) 
      } else {
        this.props.setOrder(false)
        this.setState({ order: 0 })
      }
      this.setState({ checked })
    } else {
      if (!checked) {
        this.props.setOrder(false)
        this.setState({ order: 0 })
        this.setState({ checked })
      }
    }
  }
  render() {
    const { pm, id, color } = this.props
    const { order } = this.state
    return (
      <div
        className="pmcheckboxcontainer"
        style={{
          backgroundColor: color[order].bg,
          borderColor: color[order].bg
        }}
      >
        <div
          className="pmcheckbox"
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <input
            type="checkbox"
            id={`checkInput${id}`}
            name="checked"
            checked={this.state.checked}
            onChange={this.handleChange}
          />
          <label for={`checkInput${id}`} />
          <div className="pmcheckboxname">{pm}</div>
        </div>
      </div>
    )
  }
}

export default CheckedPm
