import React,{Component} from 'react'
import Layout from '../Layout'
import Project from '../projectOverview/Project'
import Timeline from '../projectOverview/Timeline'
//เรียก function ใน layout และส่งขึันไป
class Folder extends Component {
    constructor() {
        super();
    }
    // href=/projectoverview
    render() {
        return(
            <Layout>
                <Project />
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
export default Folder;