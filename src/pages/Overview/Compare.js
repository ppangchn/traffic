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
class Compare extends Component {
  constructor(props) {
    super(props)
    this.state = {
      listpm: [],
      color: [
        {
          bg: null,
          point: null,
          pointborder: null,
          line: null,
          checkedbox: null
        },
        {
          bg: '#81D827',
          point: '#81D827',
          pointborder: '#C9E9A9',
          line: '#E1F5CD',
          checkedbox: '#77C824'
        },
        {
          bg: '#20AADB',
          point: '#20AADB',
          pointborder: '#87CCE6',
          line: '#B5E8FB',
          checkedbox: '#1D9ECB'
        },
        {
          bg: '#F48F8F',
          point: '#F48F8F',
          pointborder: '#FFBBBB',
          line: '#FFDDDD',
          checkedbox: '#E28484'
        },
        {
          bg: '#FFCC80',
          point: '#FFCC80',
          pointborder: '#FFE0B2',
          line: '#FFEDD2',
          checkedbox: '#EDBD76'
        },
        {
          bg: '#B180FC',
          point: '#B180FC',
          pointborder: '#D2B5FF',
          line: '#E9DBFF',
          checkedbox: '#A476EA'
        }
      ],
      usedcolor: [true, false, false, false, false, false],
      data: {
        labels: ['', 'WEEK 1', 'WEEK 2', 'WEEK 3', 'WEEK 4', ''],
        datasets: []
      }
    }
  }
  updateGraph(pmdata, index) {
    let { data } = this.state
    if (pmdata) {
      if (data.datasets[index - 1]) data.datasets[index - 1] = pmdata
      else data.datasets.push(pmdata)
    } else {
      if (index > 0) data.datasets.splice(index - 1, index - 1)
      else data.datasets.splice(index - 1, index)
    }
    this.setState({ data })
  }
  setUsedColor(index) {
    let { usedcolor } = this.state
    usedcolor[index] = true
    this.setState({ usedcolor })
  }
  setUnUsedColor(index) {
    let { usedcolor } = this.state
    usedcolor[index] = false
    this.setState({ usedcolor })
  }
  componentDidMount() {
    try {
      let listpm = []
      axios.get(`${url}/users/pm`).then(res => {
        const { data } = res
        data.map(pm => {
          let weight = [null]
          pm.projectManagement.map(pmdetail => {
            if (!pmdetail.isDisable && !pmdetail.project.isDisable)
              weight.push(pmdetail.weight)
          })
          weight.push(null)
          listpm.push({
            name: pm.name,
            id: pm.id,
            weight: weight
          })
        })
        this.setState({
          listpm
        })
      })
    } catch (error) {
      console.log('cant get list of pm at Compare', error)
    }
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
                <Line data={this.state.data} height={240} />
              </Card>
            </Col>
            <Col className="col-md-2 pl-0">
              <div
                className="selectmanagerbox"
                style={{ display: 'flex', flexDirection: 'column' }}
              >
                <div className="selectmanagerhead">
                  <div className="selectmanagertext">&ensp;Select Manager</div>
                  {/* <div className="compareclear">CLEAR</div> */}
                  <div className="viewstatistics">View statistics.</div>
                </div>
                {this.state.listpm.map(pm => {
                  return (
                    <CheckedPm
                      pm={pm.name}
                      id={pm.id}
                      weight={pm.weight}
                      color={this.state.color}
                      usedcolor={this.state.usedcolor}
                      setUsedColor={index => this.setUsedColor(index)}
                      setUnUsedColor={index => this.setUnUsedColor(index)}
                      updateGraph={(data, index) =>
                        this.updateGraph(data, index)
                      }
                    />
                  )
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
