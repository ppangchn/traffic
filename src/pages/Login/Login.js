import React, { Component } from 'react'
import {
  Button,
  Form,
  Modal,
  ModalHeader,
  ModalBody,
  Input,
  FormFeedback,
  ModalFooter
} from 'reactstrap'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import './Login.css'
import url from '../../url'
import axios from 'axios'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`
export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      invalidpassword: false,
      invalidemail: false,
      message: ''
    }
  }

  handleInputChange = e => {
    const { name, value } = e.target
    this.setState({ [name]: value })
    this.setState({ message: '' })
  }

  handleSubmit = e => {
    try {
      const data = {
        email: this.state.email,
        password: this.state.password
      }

      if (this.state.email && this.state.password) {
        axios.post(`${url}/users/login`, data).then($res => {
          const { data } = $res
          this.setState({ message: data.message })
          if (
            data.message != 'Email or Password Invalid' &&
            data.message != 'Invalid password' &&
            data.message != 'Email not found'
          ) {
            localStorage.setItem('token', data.token)
            this.props.history.push(`/overview`)
          }
        })
      } else {
        console.log('cant login')
      }

      e.preventDefault()
    } catch (error) {
      console.error('on error ->', error)
    }
  }

  render() {
    return (
      <Container>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center'
          }}
        >
          <div className="iconTraffic">traffic.</div>
          <Form onSubmit={this.handleSubmit}>
            <div className="ipp">
              <input
                style={{ fontSize: '8px !important' }}
                name="email"
                className="inputform"
                type="email"
                placeholder="Example@pirsquare.net"
                onChange={this.handleInputChange}
                value={this.state.email}
                invalid={this.state.invalidemail}
                required
              />
            </div>
            <div className="ipp">
              <input
                className="inputform"
                style={{ fontSize: '8px !important' }}
                name="password"
                type="password"
                placeholder="Password"
                onChange={this.handleInputChange}
                value={this.state.password}
                invalid={this.state.invalidpassword}
                required
              />
            </div>
            <Button color="submit" size="lg" block>
              Sign In
            </Button>
          </Form>
          <div className="btsave">
            <Link
              className="des"
              to={`/forgotpass`}
              style={{ textDecoration: 'none' }}
            >
              Forgot password?
            </Link>
            <div className="err">{this.state.message}</div>
          </div>
        </div>
      </Container>
    )
  }
}
