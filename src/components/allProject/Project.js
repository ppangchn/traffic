import React,{Component} from 'react'
import Layout from '../Layout'
import Sidebar from '../projectOverview/Sidebar'
import Timeline from '../projectOverview/Timeline'
//เรียก function ใน layout และส่งขึันไป
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