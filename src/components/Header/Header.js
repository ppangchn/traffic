import React, { Component } from 'react'
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
import { withRouter } from 'react-router-dom'
import AddProject from '../../pages/AddProject/AddProject'

const Container = styled.div`
    background-color: #5bc2e1
    padding : 0px;
    margin : 0px;
    border : none;
`
const FolderClose = Folder.extend`
    width : 1.5rem;
    height : 1.5rem;
    color : white;
    &:hover ${FolderClose} {
        
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
    transition-duration: 300ms;
    position: relative;
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
      transition-duration: 300ms;
      top: -1px;
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
      transition-duration: 300ms;
      top: -1px;
    }
    display: inline-block;
    cursor: pointer;
    line-height: 84px;
    border-radius: 25%
    position: relative;
`
class Header extends Component {
  constructor(props) {
    super(props)
    // console.log('pang')
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
      toggleAddModal: false
    }
  }
  changeFolderIcon() {
    this.clear()
    this.setState({ folder: <FolderSolid /> })
    this.props.history.push('/project')
  }

  changePersonIcon() {
    this.clear()
    this.setState({ person: <PersonSolid /> })
    this.props.history.push('/person')
  }
  changeSettingIcon() {
    this.clear()
    this.setState({ setting: <SettingSolid /> })
    this.props.history.push('/setting')
  }
  changeListIcon() {
    this.clear()
    this.setState({ list: <ListAltSolidz /> })
    this.props.history.push('/overview')
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
  toggleAddModal = state => {
    this.setState({
      toggleAddModal: state
    })
    if (!state) {
      this.clear()
    }
  }
  update() {
    this.clear()
    if (window.location.pathname == '/traffic-app/build/person')
      this.setState({ person: <PersonSolid /> })
    if (window.location.pathname == '/traffic-app/build/project')
      this.setState({ folder: <FolderSolid /> })
    if (window.location.pathname == '/traffic-app/build/setting')
      this.setState({ setting: <SettingSolid /> })
    if (window.location.pathname == '/traffic-app/build/overview')
      this.setState({ list: <ListAltSolidz /> })
  }
  componentWillReceiveProps() {
    this.update()
  }
  componentDidMount() {
    this.update()
  }
  render() {
    const { toggleAddModal } = this.state
    return (
      <Container>
        <Navbar>
          <NavLink
            onClick={() => {
              this.changeListIcon()
            }}
          >
            {this.state.list}
          </NavLink>
          <NavLink
            onClick={() => {
              this.changeFolderIcon()
            }}
          >
            {this.state.folder}
          </NavLink>
          <NavLink
            onClick={() => {
              this.changePersonIcon()
            }}
          >
            {this.state.person}
          </NavLink>
          <Navbar className="ml-auto">
            <NavLink onClick={e => this.toggleAddModal(true)}>
              {this.state.add}
            </NavLink>
            <NavLink
              onClick={() => {
                this.changeSettingIcon()
              }}
            >
              {this.state.setting}
            </NavLink>
          </Navbar>
        </Navbar>
        {toggleAddModal && (
          <AddProject onClose={() => this.toggleAddModal(false)} />
        )}
      </Container>
    )
  }
}

export default withRouter(Header)
