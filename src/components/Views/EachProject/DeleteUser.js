import React, { Component } from 'react'
import { X } from 'styled-icons/octicons/X'
import {
  Button,
  Popover,
  PopoverBody,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap'
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
      popoverOpen: false,
      modalOpen: false
    }
    this.toggle = this.toggle.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
  }
  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    })
  }
  toggleModal() {
    this.setState({ modalOpen: !this.state.modalOpen })
  }
  render() {
    return (
      <div>
        <Exit id={`Popover${this.props.id}`} onClick={this.toggleModal} />
        {/* <Popover
          placement="bottom"
          isOpen={this.state.popoverOpen}
          target={`Popover${this.props.id}`}
          toggle={this.toggle}
        >
          <PopoverBody>
            <Button color="danger" size="sm" onClick={this.toggleModal}>
              Confirm
            </Button>
          </PopoverBody>
        </Popover> */}
        <Modal
          isOpen={this.state.modalOpen}
          toggle={this.toggleModal}
          centered={true}
          // className={this.props.className}
        >
          <ModalHeader toggle={this.toggleModal} style={{ color: '#da3849' }}>
            Confirm Delete
          </ModalHeader>
          <ModalBody style={{display: 'flex'}}>
            Are you sure you want to delete
            <div style={{ color: '#da3849' }}>&ensp;"{this.props.name}"</div>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleModal}>
              Cancel
            </Button>
            <Button color="danger" onClick={this.toggleModal}>
              Confirm
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

export default DeleteUser
