import React, { Component } from 'react'
import InlineEdit from 'react-edit-inplace'
import { Edit as EditIcon } from 'styled-icons/material/Edit'
import url from '../../../url'
import axios from 'axios'
import { Progress } from 'reactstrap'
import './Percent.css'

const Edit = EditIcon.extend`
  position: relative;
  color: #d9d9d9;
  :hover ${Edit} {
    color: #5bc2e1;
  }
`
class Percent extends Component {
  constructor(props) {
    super(props)
    this.state = { isedited: false, process: '0' }
    this.dataChanged = this.dataChanged.bind(this)
  }
  dataChanged(process) {
    const value = +process.process
    const data = {
      process: value,
      id: this.props.project.id
    }
    try {
      axios
        .put(`${url}/project`, data)
        .then(
          console.log('send!'),
          this.setState({ process: process.process ,isedited: false})
        )
    } catch (error) {
      console.log('cant send process value at Percent', error)
    }
  }
  customValidateText(text) {
    return text.length > 0 && text.length < 4 && +text <= 100 && text !== "00" && text!="000" && +text >=0 && !text.includes('.')
  }
  componentDidMount() {
    this.setState({ process: '' + this.props.project.process })
  }
  render() {
    const {project} = this.props;
    return (
      <div className="progresscontainer">
        <Progress
          className="progress"
          color={String(project.color).substring(1)}
          value={this.state.process}
        />
        <div className="percent">
          <InlineEdit
            className="editing"
            validate={this.customValidateText}
            activeClassName="editing"
            text={this.state.process}
            paramName="process"
            change={this.dataChanged}
            editing={this.state.isedited}
            stopPropagation={true}
          />&nbsp;%
          <div
            className="editbox"
            onClick={() => this.setState({ isedited: !this.state.isedited })}
          >
            <Edit className="Edit" />
          </div>
        </div>
      </div>
    )
  }
}

export default Percent
