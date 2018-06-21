import React,{Component} from 'react'
import Layout from '/Users/chanissat./Desktop/traffic/src/pages/components/Layout'
import PersonSidebar from './PersonSidebar'
import PersonTimeline from './PersonTimeline'


class Person extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <Layout>
          <PersonSidebar/>
          <PersonTimeline/>
        </Layout>
        );
    }
}

export default Person;