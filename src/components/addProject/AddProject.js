import React,{Component} from 'react'
import { Container ,Row, Col, Progress } from 'reactstrap';
import styled from 'styled-components'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import ColorButton from './ColorButton'
import './AddProject.css'

class AddProject extends Component {
    constructor(props) {
        super(props);
        this.state= {open : true,dropdownOpen: false, pm : ['a','b','c','d','e'],
                    color: ['#D50000','#F44336','#FF5252','#E65100','#FF6D00','#F57F17','#F9A825','#FFCC80','#FFC400','#FDD835',
                            '#FFF176','#CCFF90','#B2FF59','#76FF03','#00E676','#00C853','#1DE9B6','#69F0AE','#4DB6AC','#81D4FA',
                            '#29B6F6','#2196F3','#2979FF','#00E5FF','#18FFFF','#82B1FF','#7B1FA2','#D500F9','#EC407A','#F48FB1'],
                    projectname:"",checkedcolor:''}
        this.toggle = this.toggle.bind(this)
        this.toggledrop = this.toggledrop.bind(this);
    }
    toggle() {
        this.setState({open : !this.state.open})
        console.log(this.state.open)
    }
    toggledrop() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
          });
    }
    setCheckColor(c) {
        this.setState({checkedcolor:c})
        console.log(this.state.checkedcolor);
    }
    setUnchecked(c) {
        if (this.state.checkedcolor===c) {
            return true;
        }
        return false;
    }
    render() {
        return (
            <div style={{position: 'absolute'}}>
        <Modal isOpen={this.state.open} toggle={this.toggle}>
            <ModalHeader toggle={this.toggle}>New Project</ModalHeader>
            <ModalBody>
                <Container>
                    <Row>
                        <Col>
                            Project name
                            {console.log(this.state.projectname)}
                            <input placeholder="Type your project name" onChange={(e) => {this.setState({projectname:e.target.value})}}></input>
                        </Col>
                        <Col>
                            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggledrop}>
                                <DropdownToggle caret>All</DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem header>PM</DropdownItem>
                                    {this.state.pm.map((e) => {
                                        return <DropdownItem>{e}</DropdownItem>
                                    })}
                                </DropdownMenu>
                            </Dropdown>
                        </Col>
                    </Row>
                    <Row><Col>Project color</Col></Row>
                    <Row className="pd10">{this.state.color.map((c) => 
                        {return <Col className="pd5" md={1} sm={1} xs={2}>
                                    <ColorButton color={c} 
                                    setCheckedColor={(e) => this.setCheckColor(e)}
                                    unchecked={this.setUnchecked(c)}
                                    />
                                    </Col>})}
                    </Row>
                    <Row><Col>Member</Col></Row>
                    <Row><Col><Button color="primary" size="lg" block>Save</Button></Col></Row>
            </Container>
          </ModalBody>
        </Modal>
        </div>
        );
    }
}

export default AddProject;