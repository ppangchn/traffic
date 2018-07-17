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
    const { value,label, weight } = this.props.pm
    this.state = { pm: value, choseweight: weight, disabled: true ,value,label}
    this.handleChange = this.handleChange.bind(this)
    this.slideChange = this.slideChange.bind(this)
  }
  handleChange = (selectedOption) => {
    this.setState({ pm: selectedOption,value:selectedOption.value })
    console.log(this.state.pm)
    if (selectedOption) this.setState({ disabled: false })
    else this.setState({ disabled: true })
    this.props.setPm(this.props.id, {
      ...selectedOption,
      weight: this.state.choseweight
    })
    this.props.setInvalidAddPm();
  }
  slideChange = value => {
    this.setState({
      choseweight: value
    })
    this.props.setPm(this.props.id, {
      value: this.state.value,
      label: this.state.label,
      weight: value
    })
  }
  delete = e => {
    console.log('delete user!')
    this.props.delete(this.props.id)
  }
  componentDidMount() {
    if (this.state.pm) this.setState({ disabled: false })
  }
  render() {
    return (
      <Row className="selectpmbox">
        <Col xs="4">
          <Select
            ClassName="selectbox"
            style={{borderColor: '#5ac2e2 '}}
            placeholder="All"
            value={this.state.value}
            onChange={this.handleChange}
            options={this.props.listpm}
            trimFilter
            autoFocus={true}
            clearable={false}
            scrollMenuIntoView={false}
          />
        </Col>
        <Col className="sliderboxpm" xs="4">
          <div>
            <Slider
              className="slider"
              min={0}
              max={100}
              step={5}
              onChange={this.slideChange}
              value={this.state.choseweight}
              disabled={this.state.disabled}
            />
          </div>
        </Col>
        <Col className="px-0">
          <div className="weightpm">{this.state.choseweight} %</div>
        </Col>
        <Col className="deletebox">
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
