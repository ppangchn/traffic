import React, { Component } from 'react'
import EachProjectSidebar from './EachProjectSidebar'
import EachProjectTimeline from './EachProjectTimeline'
import styled from 'styled-components'
const Container = styled.div`
  display: flex;
  flex-direction: row;
`

class ViewbyProject extends Component {
  constructor(props) {
    super(props)
    this.state = { fetchData: Date.now(), canTrigger: false }
  }
  updateData = () => {
    console.log(Date.now())
    this.setState({ fetchData: Date.now() })
  }
  triggerLoading() {
    console.log(this.state.canTrigger)
    if (this.state.canTrigger) {
      const loader = document.getElementById('loader')
      const eachproject = document.getElementById('eachproject')
      if (loader) loader.hidden = true
      if (eachproject) eachproject.hidden = false
    }
    this.setState({ canTrigger: true })
  }
  componentDidMount() {
    const eachproject = document.getElementById('eachproject')
    if (eachproject) eachproject.hidden = true
  }
  render() {
    return (
      <div>
        <div id="loader" className="loader" />
        <Container id="eachproject">
          <EachProjectSidebar
            id={this.props.match.params.id}
            updateData={this.updateData}
            triggerLoading={() => this.triggerLoading()}
            loader={document.getElementById("loader")}
            eachproject={document.getElementById("eachproject")}
          />
          <EachProjectTimeline
            id={this.props.match.params.id}
            fetchData={this.state.fetchData}
            triggerLoading={() => this.triggerLoading()}
          />
        </Container>
      </div>
    )
  }
}
export default ViewbyProject
