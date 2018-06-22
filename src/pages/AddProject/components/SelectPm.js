import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import Slider from 'react-rangeslider'
import Select from 'react-select'
import axios from 'axios'
import './Select.css'
import { Button } from 'reactstrap'

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
      <Row>
        <Col xs="5">
          <Select
            optionClassName="drop"
            style={{ backgroundColor: '#f1f1f1' }}
            placeholder="Select PM(s)..."
            value={this.state.pm}
            onChange={this.handleChange}
            options={this.props.listpm}
          />
        </Col>
        <Col xs="3" style={{ bottom: '10px' }}>
          <Slider
            min={0}
            max={100}
            step={25}
            onChange={this.slideChange}
            value={this.state.choseweight}
            tooltip={false}
          />
        </Col>
        <Col style={{ bottom: '35px' }}>
          <div className="weightpm">{this.state.choseweight} %</div>
        </Col>
        <Col>{this.props.id > 0 && (
            <Button color="danger" onClick={this.delete}>ลบ</Button>
          )}</Col>
      </Row>
    )
  }
}

export default SelectPm
