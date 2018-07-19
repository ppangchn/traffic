import React, { Component } from 'react'
import { Line } from 'react-chartjs-2'
import styled from 'styled-components'
import { Container, Row, Col, Input } from 'reactstrap'
import { ChartBar } from 'styled-icons/fa-solid/ChartBar'
import url from '../../url'
import axios from 'axios'
import CheckedPm from '../../components/Views/Overview/CheckedPm'
import './Compare.css'

const ChartIcon = ChartBar.extend`
  color: #5bc2e1;
`
const Box = styled.div`
  background-color: #f1f5f8;
  display: flex;
  -webkit-background-size: cover;
  background-size: cover;
  flex-direction: column;
`
const Card = styled.div`
  background-color: white;
`
const data = {
  labels: ['', 'WEEK 1', 'WEEK 2', 'WEEK 3', 'WEEK 4', ''],
  datasets: [
    {
      label: 'Burn',
      fill: false,
      lineTension: 0.1,
      backgroundColor: '#20aadb',
      borderColor: '#98e3ff',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'mix(#20aadb+white)',
      pointBackgroundColor: '#20aadb',
      pointBorderWidth: 10,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: '#20aadb',
      pointHoverBorderColor: '#20aadb',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [null, 1, 2, 3, 4, null]
    }
  ]
}

class Compare extends Component {
  constructor(props) {
    super(props)
    this.state = {
      listpm: [],
      color: [
        {
          bg: '#81D827',
          point: '#81D827',
          pointborder: '#C9E9A9',
          line: '#E1F5CD'
        },
        {
          bg: '#20AADB',
          point: '#20AADB',
          pointborder: '#87CCE6',
          line: '#B5E8FB'
        },
        {
          bg: '#F48F8F',
          point: '#F48F8F',
          pointborder: '#FFBBBB',
          line: '#FFDDDD'
        },
        {
          bg: '#FFCC80',
          point: '#FFCC80',
          pointborder: '#FFE0B2',
          line: '#FFEDD2'
        },
        {
          bg: 'B180FC',
          point: 'B180FC',
          pointborder: '#D2B5FF',
          line: '#E9DBFF'
        }
      ],
      order: 0
    }
  }
  componentDidMount() {
    try {
      let listpm = []
      axios.get(`${url}/users/pm`).then(res => {
        const { data } = res
        data.map(pm => {
          listpm.push({ name: pm.name, id: pm.id })
        })
        this.setState({ listpm })
      })
    } catch (error) {
      console.log('cant get list of pm at Compare', error)
    }
  }
  setOrder(isInCrease) {
    let order = this.state.order
    if (isInCrease) order++;
    else order--;
    this.setState({order})
  }
  render() {
    return (
      <Box>
        <Container>
          <Row>
            <Col className="comparefont">
              <ChartIcon className="charticon" />Compare
            </Col>
          </Row>
          <Row>
            <Col className="col-md-8">
              <Card className="comparegraph">
                <Line data={data} height={240} />
              </Card>
            </Col>
            <Col className="col-md-2 pl-0">
              <div
                className="selectmanagerbox"
                style={{ display: 'flex', flexDirection: 'column' }}
              >
                <div>&ensp;Select Manager</div>
                {/* <div className="compareclear">CLEAR</div> */}
                <div className="viewstatistics">View statistics.</div>
                {this.state.listpm.map(pm => {
                  return <CheckedPm pm={pm.name} id={pm.id} order={this.state.order}/>
                })}
              </div>
            </Col>
          </Row>
        </Container>
      </Box>
    )
  }
}
export default Compare
