import React,{Component,PureComponent} from 'react'
import styled from 'styled-components'
import {Folder} from 'styled-icons/fa-regular/Folder'
import {FolderOpen} from 'styled-icons/fa-solid/FolderOpen';
import {PersonOutline} from 'styled-icons/material/PersonOutline'
import {Person} from 'styled-icons/material/Person'
import {Settings} from 'styled-icons/feather/Settings'
import {Gear} from 'styled-icons/octicons/Gear'
import {ListAlt} from 'styled-icons/fa-regular/ListAlt'
import {ListAlt as ListSolid} from 'styled-icons/fa-solid/ListAlt'
import {Navbar,NavbarBrand,NavLink,Nav,NavItem} from 'reactstrap'
import {AddCircleOutline} from 'styled-icons/material/AddCircleOutline'
import {AddCircle} from 'styled-icons/material/AddCircle'
import AddProject from './addProject/AddProject'
import './Header.css'
// import { Container, Row, Col } from 'reactstrap';

const Container = styled.div`
    background-color: #5bc2e1
    max-height : 93px;
    max-width : 1920px;
    padding : 0px;
    margin : 0px;
    border : none;
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
    transition-duration: 1s;
`

const FolderClose = Folder.extend`
    width : 1.5rem;
    height : 1.5rem;
    color : white;
    &:hover ${FolderClose} {
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
        transition-duration: 300ms;
        position : relative;
        top : -1px
    }
    display: inline-block;
    cursor: pointer;
    line-height: 84px;
    border-radius: 25%
    position: relative;
`
const FolderWhite = FolderOpen.extend`
    width : 1.5rem;
    height : 1.5rem;
    color : white;
    &:hover ${FolderWhite} {
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
        transition-duration: 300ms;
    }
    display: inline-block;
    cursor: pointer;
    line-height: 84px;
    border-radius: 25%
    position: relative;
}
`

const PersonReg = PersonOutline.extend`
    width : 1.5rem;
    height : 1.5rem;
    color : white;
    &:hover ${PersonReg} {
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
        transition-duration: 300ms;
        position : relative;
        top : -1px
    }
    display: inline-block;
    border-radius: 25%
`

const PersonSolid = Person.extend`
    width : 1.5rem;
    height : 1.5rem;
    color : white;
    &:hover ${PersonSolid} {
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
        transition-duration: 300ms;
        
    }
    display: inline-block;
    border-radius: 25%
`
const SettingReg = Settings.extend`
    width : 1.5rem;
    height : 1.5rem;
    color : white;
    &:hover ${SettingReg} {
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
        transition-duration: 300ms;
        top : -1px
    }
    display: inline-block;
    cursor: pointer;
    border-radius: 25%
`
const SettingSolid = Gear.extend`
    width : 1.5rem;
    height : 1.5rem;
    color : white;
    &:hover ${SettingReg} {
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
        transition-duration: 300ms;
    }
    display: inline-block;
    cursor: pointer;
    line-height: 84px;
    border-radius: 25%
    position: relative;
    
`

const ListAltReg = ListAlt.extend`
    width : 1.5rem;
    height : 1.5rem;
    color : white;
    &:hover ${ListAltReg} {
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
        transition-duration: 300ms;
    }
    display: inline-block;
    cursor: pointer;
    line-height: 84px;
    border-radius: 25%
    position: relative;
`

const ListAltSolidz = ListSolid.extend`
    width : 1.5rem;
    height : 1.5rem;
    color : white;
    &:hover ${ListAltSolidz} {
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
        transition-duration: 300ms;
    }
    display: inline-block;
    cursor: pointer;
    line-height: 84px;
    border-radius: 25%
    position: relative;
`
const AddReg = AddCircleOutline.extend`
    width : 1.5rem;
    height : 1.5rem;
    color : white;
    &:hover ${AddReg} {
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
        transition-duration: 300ms;
    }
    display: inline-block;
    cursor: pointer;
    line-height: 84px;
    border-radius: 25%
    position: relative;
`
const AddSolid = AddCircle.extend`
    width : 1.5rem;
    height : 1.5rem;
    color : white;
    &:hover ${AddSolid} {
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
        transition-duration: 300ms;
    }
    display: inline-block;
    cursor: pointer;
    line-height: 84px;
    border-radius: 25%
    position: relative;
`

class Header extends Component {
    constructor() {
        super();
        console.log('pang')
        this.state = {folder : <FolderClose />, person : <PersonReg />,setting : <SettingReg />, list : <ListAltReg />,add : <AddReg />}
    }
    changeFolderIcon() {
        // if (window.location.pathname === "/folder") {
            this.setState({folder : <FolderWhite />})
        // }
        // else this.setState({folder : <FolderClose />})
    }
        
    changePersonIcon = () => {
        this.setState({person : <PersonSolid />})
    }
    changeSettingIcon = () => {
        this.setState({setting : <SettingSolid />})
    }
    changeListIcon() {
        this.setState({list : <ListAltSolidz />})
    }
    changeAddIcon() {
        this.setState({add : <AddSolid />})
    }
    render() {
        return (
            <Container>
                    <Navbar>
                    <NavLink href="/" onClick={() => this.changeListIcon()} activeClassName="active">{this.state.list}</NavLink>
                        <NavLink href="/folder" onClick={() => this.changeFolderIcon()} activeClassName="active">{this.state.folder}</NavLink>
                        <NavLink  href="/person" onClick={() => this.changePersonIcon()} activeClassName="active">{this.state.person}</NavLink>
                        <Navbar className="ml-auto">
                            <NavLink  href="/add" onClick={() => {this.changeAddIcon()}} activeClassName="active">{this.state.add}</NavLink>
                            <NavLink  href="/setting" onClick={() => this.changeSettingIcon()} activeClassName="active">{this.state.setting}</NavLink>
                            </Navbar>   
                    </Navbar>
                   
            </Container>
        );
    }
}

export default Header;