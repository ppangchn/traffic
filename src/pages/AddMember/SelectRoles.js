import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import Select from 'react-select'
import './SelectRoles.css'
import { X } from 'styled-icons/octicons/X'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
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
    // const { value, label, weight } = this.props.roles
	}
	handleChange = selectedOption => {
		this.setState({ roles: selectedOption })
		console.log('selected', selectedOption)
		if (selectedOption) {
			console.log(`Selected: ${selectedOption.label}`)
			console.log('listroles -> ', this.state.listroles)
		}
		this.props.SetRoles(this.props.id, {
			...selectedOption
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
