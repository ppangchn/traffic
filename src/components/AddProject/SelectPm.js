import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import Select from 'react-select'
import { X } from 'styled-icons/octicons/X'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import '../../pages/AddProject/AddProject.css'
import './SelectPm.css'
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
    const { value, label, weight, roles } = this.props.pm
    this.state = {
      pm: value,
      choseweight: weight,
      disabled: true,
      value,
      label,
      roles,
      selectedOption: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.slideChange = this.slideChange.bind(this)
  }
  handleChange = selectedOption => {
    if (selectedOption) this.setState({ pm: selectedOption, value: selectedOption.value })
    if (selectedOption) this.setState({ disabled: false })
    else this.setState({ disabled: true })
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
      value: this.state.value,
      label: this.state.label,
      weight: value
    })
  }
  delete = e => {
    this.props.delete(this.props.id)
  }
  componentWillReceiveProps(props) {
    this.setState({
      value: props.pm.value,
      label: props.pm.label,
      pm: props.pm.value,
      roles: props.roles
    })
  }

  componentDidMount() {
    if (this.state.pm) this.setState({ disabled: false })
  }
  render() {
    return (
      <Row className="selectpmbox">
        <Col md="4" sm="4" xs="12">
          <Select
            ClassName="selectbox"
            style={{ borderColor: '#5ac2e2 ' }}
            placeholder="All"
            value={this.state.value}
            onChange={this.handleChange}
            options={this.props.listpm}
            trimFilter
            clearable={false}
            scrollMenuIntoView={false}
          />
        </Col>
        <Col className="sliderboxpm" md="4" sm="4" xs="8">
          <div>
            <Slider
              className="slider"
              trackStyle={{
                backgroundColor : '#5ac2e2'
              }}
              min={0}
              max={100}
              step={5}
              onChange={this.slideChange}
              value={this.state.choseweight}
              disabled={this.state.disabled}
            />
          </div>
        </Col>
        <Col className="px-0" md="2" sm="2" xs="1">
          <div className="weightpm">{this.state.choseweight} %</div>
        </Col>
        <Col className="deletebox" md="1" sm="1" xs="1">
          {this.props.id > 0 && (
            <Exit onClick={this.delete} />
          )}
        </Col>
      </Row>
    )
  }
}

export default SelectPm
