import React,{Component} from 'react'
import Layout from '../Layout'
import AddProject from '../addProject/AddProject'

class Add extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <Layout>
                <a href="/">Add Back</a>
                <AddProject />   
            </Layout>
        );
    }
}

export default Add;