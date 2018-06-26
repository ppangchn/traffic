import React, { Component,} from 'react'
import styled from 'styled-components'
import { Folder } from 'styled-icons/fa-regular/Folder'
import { FolderOpen } from 'styled-icons/fa-solid/FolderOpen'
import { PersonOutline } from 'styled-icons/material/PersonOutline'
import { Person } from 'styled-icons/material/Person'
import { Settings } from 'styled-icons/feather/Settings'
import { Gear } from 'styled-icons/octicons/Gear'
import { ListAlt } from 'styled-icons/fa-regular/ListAlt'
import { ListAlt as ListSolid } from 'styled-icons/fa-solid/ListAlt'
import { Navbar, NavLink } from 'reactstrap'
import { AddCircleOutline } from 'styled-icons/material/AddCircleOutline'
import { Link } from 'react-router-dom'
import AddProject from '../AddProject/AddProject'
import './Header.css'

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
const FolderSolid = FolderOpen.extend`
    width : 1.5rem;
    height : 1.5rem;
    color : white;
    display: inline-block;
    cursor: pointer;
    line-height: 84px;
    border-radius: 25%
    position: relative;
}
`

const PersonReg = PersonOutline.extend`
  width: 1.5rem;
  height: 1.5rem;
  color: white;
  &:hover ${PersonReg} {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2),
      0 6px 20px 0 rgba(0, 0, 0, 0.19);
    transition-duration: 300ms;
    position: relative;
    top: -1px;
  }
  display: inline-block;
  border-radius: 25%;
`

const PersonSolid = Person.extend`
  width: 1.5rem;
  height: 1.5rem;
  color: white;
  display: inline-block;
  border-radius: 25%;
`
const SettingReg = Settings.extend`
  width: 1.5rem;
  height: 1.5rem;
  color: white;
  &:hover ${SettingReg} {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2),
      0 6px 20px 0 rgba(0, 0, 0, 0.19);
    transition-duration: 300ms;
    top: -1px;
  }
  display: inline-block;
  cursor: pointer;
  border-radius: 25%;
`
const SettingSolid = Gear.extend`
    width : 1.5rem;
    height : 1.5rem;
    color : white;
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
class Header extends Component {
  constructor() {
    super()
    console.log('pang')
    this.state = {
      folder: <FolderClose />,
      person: <PersonReg />,
      setting: <SettingReg />,
      list: <ListAltReg />,
      add: <AddReg />,
      icondefault: {
        folder: <FolderClose />,
        person: <PersonReg />,
        setting: <SettingReg />,
        list: <ListAltReg />,
        add: <AddReg />
      },
      toggleAddModal: false,
      // saved: true
    }
  }
  changeFolderIcon() {
    this.clear()
    this.setState({ folder: <FolderSolid /> })
  }

  changePersonIcon() {
    this.clear()
    this.setState({ person: <PersonSolid /> })
  }
  changeSettingIcon() {
    this.clear()
    this.setState({ setting: <SettingSolid /> })
  }
  changeListIcon() {
    this.clear()
    this.setState({ list: <ListAltSolidz /> })
  }
  clear() {
    let def = this.state.icondefault
    this.setState({
      folder: def.folder,
      person: def.person,
      setting: def.setting,
      list: def.list,
      add: def.add
    })
  }
  toggleAddModal = (state) => {
    this.setState({
      toggleAddModal: state,
      // saved: state
    })
  }
  // isSaved(e) {
  //   this.setState({saved: e})
  // }
  componentDidMount() {
    console.log(window.location.pathname);
    if (window.location.pathname=="/traffic-app/build/person")  this.setState({ person: <PersonSolid /> })
    if (window.location.pathname=="/traffic-app/build/project")  this.setState({ folder: <FolderSolid /> })
    if (window.location.pathname=="/traffic-app/build/setting")  this.setState({ setting: <SettingSolid /> })
    if (window.location.pathname=="/traffic-app/build/")  this.setState({ list: <ListAltSolidz /> })
    
  }
  render() {
    const { toggleAddModal,saved } = this.state
    return (
      <Container>
        <Navbar>
          <Link to="/">
            <NavLink
              onClick={() => {
                this.changeListIcon()
              }}
              activeClassName="active"
            >
              {this.state.list}
            </NavLink>
          </Link>
          <Link to="/project">
            <NavLink
              onClick={() => {
                this.changeFolderIcon()
              }}
              activeClassName="active"
            >
              {this.state.folder}
            </NavLink>
          </Link>
          <Link to="/person">
            <NavLink
              onClick={() => {
                this.changePersonIcon()
              }}
              activeClassName="active"
            >
              {this.state.person}
            </NavLink>
          </Link>
          <Navbar className="ml-auto">
            <a onClick={e => this.toggleAddModal(true)}>
              <NavLink
                activeClassName="active"
              >
                {this.state.add}
              </NavLink>
            </a>
            <Link to="/setting">
              <NavLink
                onClick={() => {
                  this.changeSettingIcon()
                }}
                activeClassName="active"
              >
                {this.state.setting}
              </NavLink>
            </Link>
          </Navbar>
        </Navbar>
        {(toggleAddModal) && <AddProject onClose={() => this.toggleAddModal(false)} />}
      </Container>
    )
  }
}

export default Header
