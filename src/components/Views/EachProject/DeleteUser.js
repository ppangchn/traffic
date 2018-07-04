import React, { Component } from 'react'
import { X } from 'styled-icons/octicons/X'
import { Button, Popover, PopoverBody } from 'reactstrap'
const Exit = X.extend`
  color: #a0a0a0;
  width: 1rem;
  height: 1rem;
  &:hover ${Exit} {
    color: red;
  }
`
class DeleteUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      popoverOpen: false
    }
    this.toggle = this.toggle.bind(this);
    this.delete = this.delete.bind(this);
  }
  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    })
  }
  delete() {

  }
  render() {
    return (
      <div>
        <Exit id={`Popover${this.props.id}`} onClick={this.toggle} />
        <Popover
          placement="bottom"
          isOpen={this.state.popoverOpen}
          target={`Popover${this.props.id}`}
          toggle={this.toggle}
        >
          <PopoverBody>
            <Button color="danger" size="sm" onClick={this.delete}>
              Confirm
            </Button>
          </PopoverBody>
        </Popover>
      </div>
    )
  }
}

export default DeleteUser
