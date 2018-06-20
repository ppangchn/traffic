import React,{Component} from 'react'
import Layout from '../components/Layout'

class Person extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <Layout>
                <a href="/">Setting Back</a>
            </Layout>
        );
    }
}

export default Person;