import React, { Component } from 'react'
import logo from 'image/temp_logo.png';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, Segment, Label, Header } from 'semantic-ui-react'
import Axios from 'axios';

const style = {
  base: {
    margin: '0.5rem',
    padding: '0.5rem'
  },
  paddinglr: {
    paddingLeft: '3%',
    paddingRight: '3%'
  }
};

class Find extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name1: '',
      email1: '',
      id2: '',
      name2: '',
      email2: ''
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  findId = async e => {
    try {
      const response = await Axios.get(
        "http://localhost:8080/colorfit/member/findId/" + this.state.name1 + "/"
        + this.state.email1 + "/"
      );

      const { status, data } = response;
      if (data.status === 200) {
        alert("아이디는 " + data.stringResult + " 입니다.");
      }
      else {
        alert("입력한 정보를 다시 확인해주세요.");
      }
    }
    catch (error) {
      console.log(error);
    }
  }


  findPw = async e => {
    e.preventDefault();
    try {
      const response = await Axios.get(
        "http://localhost:8080/colorfit/member/findPw/" + this.state.id2 + "/"
        + this.state.name2 + "/" + this.state.email2 + "/"
      );

      const { status, data } = response;
      if (data.status === 200) {
        alert("이메일로 임시 비밀번호가 발송되었습니다.");
        this.props.history.push('/login');
      }
      else {
        alert("입력한 정보를 다시 확인해주세요.");
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div>
        <div>
          <Form>
            <Segment piled style={style.paddinglr}>
              <Header style={{ fontSize: '2em' }}>
                Forgot Id?
                        </Header>
              <Label style={style.base}> Name </Label>
              <Form.Input
                name='name1'
                placeholder='name'
                value={this.state.name1}
                onChange={this.handleChange} />

              <Label style={style.base}> Email </Label>
              <Form.Input
                name='email1'
                fluid icon='at'
                placeholder='E-mail address'
                value={this.state.email1}
                onChange={this.handleChange} />
              <Button
                disabled={this.state.name1.length < 1
                  || this.state.email1.length < 1}
                color='teal'
                fluid size='large'
                onClick={this.findId}>
                find id
                    </Button>
            </Segment>
          </Form>
        </div>

        <div>
          <Form>
            <Segment piled style={style.paddinglr}>
              <Header style={{ fontSize: '2em' }}>
                Forgot Password?
                        </Header>
              <Label style={style.base}> Id </Label>
              <Form.Input
                name='id2'
                placeholder='id'
                value={this.state.id2}
                onChange={this.handleChange} />

              <Label style={style.base}> Name </Label>
              <Form.Input
                name='name2'
                placeholder='name'
                value={this.state.name2}
                onChange={this.handleChange} />

              <Label style={style.base}> Email </Label>
              <Form.Input
                name='email2'
                fluid icon='at'
                placeholder='E-mail address'
                value={this.state.email2}
                onChange={this.handleChange} />
              <Button
                disabled={this.state.id2.length < 1
                  || this.state.name2.length < 1
                  || this.state.email2.length < 1}
                color='teal'
                fluid size='large'
                onClick={this.findPw}>
                Send temp password to your Email
                    </Button>
            </Segment>
          </Form>
        </div>
      </div>
    )
  }
}

export default withRouter(Find);