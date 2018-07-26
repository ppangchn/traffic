import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Slider from 'rc-slider'
import '../../../pages/ViewByProject/ProjectSidebar.css'

class ProcessWeight extends Component {
  constructor() {
    super()
    this.state = {processweight : 100}
  }
  slideChange(value) {
    this.setState({processweight: value})
  }
  updateData(allprocessweight) {
    console.log(allprocessweight)
    if (allprocessweight.length > 0) {
      this.setState({processweight: allprocessweight[allprocessweight.length-1].processWeight})
    }
  }
  componentDidMount() {
    this.updateData(this.props.allprocessweight)
  }
  componentWillReceiveProps(props) {
    this.updateData(props.allprocessweight)
  }
  render() {
    return (
      <div className="overviewprojectname">
        <Link
          className="linkprojectname"
          to={`/project/${this.props.projectID}`}
          style={{
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            textDecoration: 'none'
          }}
          onClick={this.update}
        >
          {this.props.projectName}
        </Link>
        <div style={{ float: 'right' }}>{this.state.processweight}%</div>
        <Slider
        trackStyle = {{
          backgroundColor : this.props.color
        }
        }
          min={0}
          max={100}
          step={5}
          onChange={(e) => this.slideChange(e)}
          value={this.state.processweight}
        />
      </div>
    )
  }
}

export default ProcessWeight
