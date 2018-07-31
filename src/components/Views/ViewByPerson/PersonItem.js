import React, { Component } from 'react'
import styled from 'styled-components'
import '../../../pages/ViewByPerson/PersonSidebar.css'

const Item = styled.div`
  background-color: #ffffff;
  border-bottom: 0.5px solid #e4eaed;
  border-right: 0.5px solid #e4eaed;
  display: flex;
  flex-direction: column;
`
const User = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
class PersonItem extends Component {
  constructor(props) {
    super(props)
    this.state = { overflow: false, id: '' }
  }
  componentDidMount() {
    const id = 'persontag' + this.props.name
    const x = document.getElementById(id)
    console.log(x)
    if (x.scrollWidth > x.clientWidth && this.props.length <= 2) {
      this.setState({ overflow: true })
    }
  }
  render() {
    const { name } = this.props
    return (
      <Item
        className={
          this.state.overflow && this.props.length <=2
            ? `personitem${this.props.length}overflow`
            : `personitem${this.props.length}`
        }
      >
        <User className="personname">{name}</User>
        <div
          id={'persontag' + this.props.name}
          className="persontagcontainer"
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: this.props.length >2 ? 'wrap' : 'none',
            overflowX: this.props.length <=2 ? 'auto' : 'none',
          }}
        >
          <div className="persontag">{this.props.roles}</div>
          {this.props.tags.map(tag => {
            return <div className="persontag">{tag.name}</div>
          })}
        </div>
      </Item>
    )
  }
}
export default PersonItem
