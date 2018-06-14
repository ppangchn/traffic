import React,{Component} from 'react'
import styled from 'styled-components'
import {Folder} from 'styled-icons/fa-regular/Folder'
import {FolderOpen} from 'styled-icons/fa-solid/FolderOpen';
import {PersonOutline} from 'styled-icons/material/PersonOutline'
import {Person} from 'styled-icons/material/Person'
import Layout from './Layout'

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
    width : 25px;
    height : 25px;
    color : white;
    &:hover ${FolderClose} {
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
        transition-duration: 300ms;
        position : relative;
        top : -1px
    }
    display: inline-block;
    cursor: pointer;
    margin: 15px;
    line-height: 84px;
    border-radius: 25%
    position: relative;
`
const FolderWhite = FolderOpen.extend`
    width : 25px;
    height : 25px;
    color : white;
    &:hover ${FolderWhite} {
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
        transition-duration: 300ms;
    }
    display: inline-block;
    cursor: pointer;
    margin: 15px;
    line-height: 84px;
    border-radius: 25%
    position: relative;
}
`

const PersonReg = PersonOutline.extend`
    width : 25px;
    height : 25px;
    color : white;
    &:hover ${PersonReg} {
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
        transition-duration: 300ms;
        position : relative;
        top : -1px
    }
    display: inline-block;
    cursor: pointer;
    margin: 15px;
    line-height: 84px;
    border-radius: 25%
    position: relative;
`

const PersonSolid = Person.extend`
    width : 25px;
    height : 25px;
    color : white;
    &:hover ${PersonSolid} {
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
        transition-duration: 300ms;
    }
    display: inline-block;
    cursor: pointer;
    margin: 15px;
    line-height: 84px;
    border-radius: 25%
    position: relative;
`
class Header extends Component {
    constructor() {
        super();
        this.state = {folder : <FolderClose />, person : <PersonReg />}
        console.log('pang')
    }
    changeFolderIcon = () => {
        this.setState({folder : <FolderWhite />})
    }
    changePersonIcon = () => {
        this.setState({person : <PersonSolid />})
    }
    render() {
        return (
            <Container>
                   <a href="/folder" onClick={this.changeFolderIcon}>
                        {this.state.folder}
                   </a>
                   <a href="/person" onClick={this.changePersonIcon}>
                        {this.state.person}
                   </a>
            </Container>
        );
    }
}

export default Header;