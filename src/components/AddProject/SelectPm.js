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
class SelectPm extends Component {
  constructor(props) {
    super(props)
    this.state = { pm: '', listpm: [], choseweight: 0 }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange = selectedOption => {
    this.setState({ pm: selectedOption })
    console.log('selected', selectedOption)
    // let listpm = this.state.defaultlistpm;
    // let index = listpm.indexOf(selectedOption)
    // listpm.splice(index,1);
    // this.setState({listpm});
    // this.props.setPm(selectedOption);
    // selectedOption can be null when the `x` (close) button is clicked
    if (selectedOption) {
      console.log(`Selected: ${selectedOption.label}`)
      console.log('listpm -> ', this.state.listpm)
    }
    this.props.setPm(this.props.id, {
      ...selectedOption,
      weight: this.state.choseweight
    })
  }
  slideChange = value => {
    this.setState({
      choseweight: value
    })
    this.props.setPm(this.props.id, {
      value: this.state.pm.value,
      label: this.state.pm.label,
      weight: value
    })
  }
  delete = e => {
    this.props.delete(this.props.id)
  }
  render() {
    return (
      <Row style={{height: '7vh'}}>
        <Col xs="4">
          <Select
            optionClassName="drop"
            style={{ backgroundColor: '#f1f1f1' , fontSize: '0.875rem'}}
            placeholder="Select PM(s)"
            value={this.state.pm}
            onChange={this.handleChange}
            options={this.props.listpm}
            trimFilter
          />
        </Col>
        <Col xs="4" style={{ bottom: '10px' }}>
          <div style={{ marginTop: '20px' }}>
            <Slider
              className="slider"
              min={0}
              max={100}
              step={25}
              onChange={this.slideChange}
              value={this.state.choseweight}
            />
          </div>
        </Col>
        <Col style={{ bottom: '35px' }}>
          <div className="weightpm">{this.state.choseweight} %</div>
        </Col>
        <Col style={{width: '1rem'}}>
          {this.props.id > 0 && (
            // <Button size="sm" color="danger" onClick={this.delete}>delete</Button>
            <Exit onClick={this.delete} />
          )}
        </Col>
      </Row>
    )
  }
}

export default SelectPm