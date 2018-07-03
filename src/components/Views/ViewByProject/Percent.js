import React, { Component } from 'react'
import InlineEdit from 'react-edit-inplace'
import { Edit as EditIcon } from 'styled-icons/material/Edit'
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
    this.state = {isedited:false}
    this.dataChanged = this.dataChanged.bind(this);
  }
  dataChanged(data) {
    //send data to back end (progress)
    // axios
    // .put
  }
  customValidateText(text) {
    return text.length > 0 && text.length < 4
  }

  render() {
    return (
      <div className="percent">
        <InlineEdit
        className="editing"
          validate={this.customValidateText}
          activeClassName="editing"
          text={String(this.props.progress)+"%"}
          paramName="progress"
          change={this.dataChanged}
          editing={this.state.isedited}
          stopPropagation={true}
        />
        <div
          className="editbox"
          onClick={() => this.setState({ isedited: !this.state.isedited })}
        >
          <Edit className="Edit" />
        </div>
      </div>
    )
  }
}

export default Percent
