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
    width : 30 px;
    height : 30px;
    color : white;
`
const FolderWhite = FolderOpen.extend`
    width : 30 px;
    height : 30px;
    color : white;
`
class Header extends Component {
    constructor() {
        super();
        this.state = {folder : <FolderClose />}
    }
    changeFolderIcon() {
        this.setState({folder : <FolderWhite />})
    }
    render() {
        return (
            <Container>
               <div>
                   <link to="/folder" onClick={() => {this.changeFolderIcon}}>
                   </link>
                   <a >{this.state.folder}</a>
               </div>
            </Container>
        );
    }
}

export default Header;