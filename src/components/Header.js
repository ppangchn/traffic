import React,{Component} from 'react'
import styled from 'styled-components'
import {Folder} from 'styled-icons/fa-regular/Folder'
import {FolderOpen} from 'styled-icons/fa-solid/FolderOpen';
import {PersonOutline} from 'styled-icons/material/PersonOutline'

const Container = styled.div`
    background-color: #5bc2e1
    max-height : 93 px;
    max-width : 1920 px;
    padding : 0 px;
    margin : 0 px;
    border : none;
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
    transition-duration: 1s;
`

const FolderClose = Folder.extend`
    width : 25 px;
    height : 25px;
    color : white;
    &:hover ${FolderClose} {
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
const FolderWhite = FolderOpen.extend`
    width : 25 px;
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
class Header extends Component {
    constructor() {
        super();
        this.state = {folder : <FolderClose />}
    }
    changeFolderIcon = () => {
        this.setState({folder : <FolderWhite />})
    }
    render() {
        return (
            <Container>
                   <a href="/folder" onClick={this.changeFolderIcon}>
                   {this.state.folder}
                   <FolderWhite />
                   </a>
            </Container>
        );
    }
}

export default Header;