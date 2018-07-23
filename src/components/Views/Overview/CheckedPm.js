import React, { Component } from 'react'
import './CheckedPm.css'
class CheckedPm extends Component {
  constructor(props) {
    super(props)
    this.state = { checked: false, index: 0 }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(e) {
    const checked = e.target.checked
    let { index } = this.state
    let canSetDataColor = this.props.usedcolor.includes(false)
    if (canSetDataColor) {
      if (checked) {
        index = this.update()
        this.props.setUsedColor(index)
        const data = {
          label: this.props.pm,
          fill: false,
          lineTension: 0.1,
          backgroundColor: this.props.color[index].bg,
          borderColor: this.props.color[index].line,
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: this.props.color[index].pointborder,
          pointBackgroundColor: this.props.color[index].point,
          pointBorderWidth: 4,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: this.props.color[index].point,
          pointHoverBorderColor: this.props.color[index].point,
          pointHoverBorderWidth: 7,
          pointRadius: 7,
          pointHitRadius: 10,
          data: this.props.weight
        }
        this.props.updateGraph(data, index)
      } else {
        this.props.setUnUsedColor(index)
        this.props.updateGraph(null, index)
        this.setState({ index: 0 })
      }
      this.setState({ checked })
    } else {
      if (!checked) {
        this.props.setUnUsedColor(index)
        this.props.updateGraph(null, index)
        this.setState({ index: 0 })
        this.setState({ checked })
      }
    }
  }
  update() {
    let index = 0
    this.props.usedcolor.some((c, i) => {
      if (!c) {
        index = i
        return true
      }
    })
    this.setState({ index })
    return index
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.isclear) {
      this.setState({ index: 0, checked: false })
      this.props.setClear(false)
    }
  }
  render() {
    const { pm, id, color } = this.props
    const { index } = this.state
    return (
      <div
        className="pmcheckboxcontainer"
        style={{
          backgroundColor: color[index].bg,
          borderColor: color[index].bg,
          color: this.state.checked ? 'white' : 'black'
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
          <label
            for={`checkInput${id}`}
            style={{
              border: this.state.checked
                ? `2px solid ${color[index].checkedbox}`
                : '2px solid #5bc2e1',
              backgroundColor: this.state.checked
                ? color[index].checkedbox
                : 'white'
            }}
          />
          <div className="pmcheckboxname">{pm}</div>
        </div>
      </div>
    )
  }
}

export default CheckedPm
