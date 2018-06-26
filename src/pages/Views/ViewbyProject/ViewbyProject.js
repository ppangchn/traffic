import React, { Component } from 'react'
import Layout from '../../components/Layout'
import ProjectSideBar from './ProjectSidebar'
import ProjectTimeline from './ProjectTimeline'

class ViewbyProject extends Component {
  constructor() {
    super()
  }
  render() {
    return (
      <Layout>
        <div className="col-xs-4">
          <ProjectSideBar />
        </div>
        <div style={{overflow: 'auto'}}>
          <ProjectTimeline />
        </div>
      </Layout>
    )
  }
}
// const Folder = ({ setLink}) => {
//     console.log(this.props)
//     setLink();
//     return (
//         <div></div>
//     )
// }
export default ViewbyProject
