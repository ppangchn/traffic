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
          <ProjectSideBar/>
          <ProjectTimeline/>
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
