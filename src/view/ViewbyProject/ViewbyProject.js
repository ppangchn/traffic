import React,{Component} from 'react'
import Layout from '../components/Layout'
import Sidebar from './components/Sidebar'
import Timeline from './components/Timeline'
class Project extends Component {
    constructor() {
        super();
    }
    // href=/projectoverview
    render() {
        return(
            <Layout>
                <Sidebar/>
                <Timeline />
            </Layout>
        );
    }
}
// const Folder = ({ setLink}) => {
//     console.log(this.props)
//     setLink();
//     return (
//         <div></div>
//     )
// }
export default Project;