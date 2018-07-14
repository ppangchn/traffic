import React, { Component } from 'react'
import { X } from 'styled-icons/octicons/X'
import axios from 'axios'
import {
  Button,
  Popover,
  PopoverBody,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap'
import url from '../../../url'
import './DeleteUser.css'

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
      modalOpen: false
    }
    this.toggleModal = this.toggleModal.bind(this)
    this.deleteUser = this.deleteUser.bind(this)
  }
  toggleModal() {
    this.setState({ modalOpen: !this.state.modalOpen })
  }
  async deleteUser() {
    try {
      this.setState({ modalOpen: !this.state.modalOpen })
      await axios
        .delete(`${url}/timeline/${this.props.id}`)
        .then(console.log('delete success!'))
      this.props.getData()
    } catch (error) {
      console.log('cant delete user at DeleteUser', error)
    }
  }
  render() {
    return (
      <div style={{position: 'absolute'}} className="deleteuserbox">
        {this.props.roles !== 'PM' &&
          this.props.roles !== 'SA' &&
          this.props.roles !== 'PC' &&
          this.props.roles !== 'BM' &&
          this.props.roles !== 'TS' &&
          this.props.roles !== 'PD' &&
          this.props.roles !== 'BD' && (
            <Exit className="deleteusericon" id={`Popover${this.props.id}`} onClick={this.toggleModal} />
          )}
        <Modal
          isOpen={this.state.modalOpen}
          toggle={this.toggleModal}
          centered={true}
        >
          <ModalHeader toggle={this.toggleModal} style={{ color: '#da3849' }}>
            Confirm Delete
          </ModalHeader>
          <ModalBody style={{ display: 'flex' }}>
            Are you sure you want to delete
            <div style={{ color: '#da3849' }}>&ensp;"{this.props.name}"</div>
          </ModalBody>
          <ModalFooter>
            <Button color="grey" onClick={this.toggleModal}>
              Cancel
            </Button>
            <Button color="danger" onClick={this.deleteUser}>
              Confirm
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

export default DeleteUser
