import React,{Component} from 'react'
import Layout from '../Layout'
import Project from '../projectOverview/Project'
import Timeline from '../projectOverview/Timeline'
class Folder extends Component {
    constructor() {
        super();
    }
    // href=/projectoverview
    render() {
        return(
            <Layout class="container">
                <div class="row">
                    <div class="col-4">
                        <Project /> 
                    </div>
                    <div class="col-8">
                        <Timeline />
                    </div>
                </div>
                <a href="/">folder back</a>
        </Layout>
        );
    }
}
export default Folder;