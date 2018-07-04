import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import Select from 'react-select'
import './Select.css'
import { X } from 'styled-icons/octicons/X'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import '../../pages/AddProject/AddProject.css'
const Exit = X.extend`
  color: #a0a0a0;
  width: 1rem;
  height: 1rem;
  &:hover ${Exit} {
    color: red;
  }
`
class SelectRoles extends Component {
  constructor(props) {
    super(props)
    this.state = { roles: '', listroles: [], choseweight: 0 }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange = selectedOption => {
    this.setState({ roles: selectedOption })
    console.log('selected', selectedOption)
    // let listpm = this.state.defaultlistpm;
    // let index = listpm.indexOf(selectedOption)
    // listpm.splice(index,1);
    // this.setState({listpm});
    // this.props.setPm(selectedOption);
    // selectedOption can be null when the `x` (close) button is clicked
    if (selectedOption) {
      console.log(`Selected: ${selectedOption.label}`)
      console.log('listroles -> ', this.state.listroles)
    }
    this.props.SelectRoles(this.props.id, {
      ...selectedOption,
      weight: this.state.choseweight
    })
  }
  slideChange = value => {
    this.setState({
      choseweight: value
    })
    this.props.setRoles(this.props.id, {
      value: this.state.roles.value,
      label: this.state.roles.label,
    })
  }
  delete = e => {
    this.props.delete(this.props.id)
  }
  render() {
    return (
      <Row>
        <Col>
          <Select
            ClassName="selectbox"
            placeholder="Select role"
            value={this.state.roles}
            onChange={this.handleChange}
            options={this.props.listroles}
            trimFilter
          />
        
          {this.props.id > 0 && (
            // <Button size="sm" color="danger" onClick={this.delete}>delete</Button>
            <Exit onClick={this.delete} />
          )}
        </Col>
      </Row>
    )
  }
}

export default SelectRoles
