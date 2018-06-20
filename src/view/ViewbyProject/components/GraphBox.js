import React,{Component} from 'react'
import { Container ,Row, Col } from 'reactstrap';
import axios from 'axios';
import './Timeline.css'


class Timeline extends Component {
    constructor() {
        super();
        this.state={start:[],end:[]}
    }
    componentDidMount() {
      axios.get(`http://dev.pirsquare.net:3013/traffic-api/timeline`)
        .then( res => {
          const { data } = res // = res.data
          console.log('Data Timeline', data)
          data.forEach(element => {
            const {start,end} = this.state;
            start.push(element.start);
            end.push(element.end);
            this.setState({start,end});
          });
        })
        console.log(start,end);
    }
    render() {
        return (
          <div className="timeline">
            <Container>
              <Row><Col></Col></Row>
              
          </Container>
          </div>
          
        );
    }
}

export default Timeline;