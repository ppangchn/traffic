import React,{Component} from 'react'
import Layout from '../Layout'

class Person extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <Layout>
                <a href="/">Person Back</a>
            </Layout>
        );
    }
}

export default Person;