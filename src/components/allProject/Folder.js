import React,{Component} from 'react'
import Header from '../Header'
import Layout from '../Layout'

class Folder extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <Layout>
                <Header />
                <a href="/">Back</a>
            </Layout>
        );
    }
}

export default Folder;