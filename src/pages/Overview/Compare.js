import React, { Component } from 'react'
import { Button } from 'reactstrap'
import { Line } from 'react-chartjs-2'
import styled from 'styled-components'
import { ChartBar } from 'styled-icons/fa-solid/ChartBar'
import './Compare.css'

const ChartIcon = ChartBar.extend`
  color: #5bc2e1;
`
const Container = styled.div`
  background-color: #f1f5f8;
  display: flex;
  -webkit-background-size: cover;
	background-size: cover;
  flex-direction: column
  height: 100vh;
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
  }
  render() {
    return (
      <Container>
        <div className="comparefont">
          <ChartIcon className="charticon" />Compare
        </div>
        <div>
          <Card className="comparegraph">
            <Line data={data} />
          </Card>
          <div>Select Manager</div>
          <Card />
        </div>
      </Container>
    )
  }
}
export default Compare
