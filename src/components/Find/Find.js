import React, { Component } from 'react'
import logo from 'image/temp_logo.png';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, Segment, Label, Header } from 'semantic-ui-react'
import Axios from 'axios';

const style = {
  base : {
      margin:'0.5rem',
      padding:'0.5rem'
  },
  paddinglr : {
      paddingLeft : '3%',
      paddingRight : '3%'
  }
};

class Find extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: '',
      name: '',
      email: '',
      password: '',
      type: 0,
      buttonColor: ['teal', 'teal', 'teal', 'teal']
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleButtonClick = (e) => {
    const nextColor = ['teal', 'teal', 'teal', 'teal'];
    var nextType = 0;

    if (this.state.buttonColor[e.target.value-1] !== 'pink'){
        nextColor[e.target.value-1] = 'pink';
        nextType = e.target.value;
    }
    this.setState({
        type: nextType,
        buttonColor: nextColor
      });
  }

  checkRegister = async e => {
    //새로고침 방지
    e.preventDefault();
    
    try {
        var formdata = new FormData();
        formdata.append('mb_id', this.state.id);
        formdata.append('mb_pw', this.state.password);
        formdata.append('mb_name', this.state.name);
        formdata.append('mb_email', this.state.email);
        formdata.append('mb_type', this.state.type);

        const response = await Axios.post(
            "/colorfit/member/signUp",
            formdata,
        );

      const { status, data } = response;
      if (data.status===200){
        this.props.history.push('/signup/2');
      }
      else{
        alert("registeration failed! check your information");
      }
    } catch(error) {
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
              name='name'
              placeholder='name'
              value={this.state.name}
              onChange={this.handleChange}/>

              <Label style={style.base}> Email </Label>
              <Form.Input
              name='email'
              fluid icon='at'
              placeholder='E-mail address'
              value={this.state.email}
              onChange={this.handleChange}/>
              <Button
                    disabled={this.state.id.length<1
                        || this.state.name.length<1
                        || this.state.email.length<1
                        || this.state.password.length<1}
                    color='teal'
                    fluid size='large'
                    onClick={this.checkRegister}>
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
              name='id'
              placeholder='id'
              value={this.state.id}
              onChange={this.handleChange}/>

              <Label style={style.base}> Name </Label>
              <Form.Input
              name='name'
              placeholder='name'
              value={this.state.name}
              onChange={this.handleChange}/>

              <Label style={style.base}> Email </Label>
              <Form.Input
              name='email'
              fluid icon='at'
              placeholder='E-mail address'
              value={this.state.email}
              onChange={this.handleChange}/>
              <Button
                    disabled={this.state.id.length<1
                        || this.state.name.length<1
                        || this.state.email.length<1
                        || this.state.password.length<1}
                    color='teal'
                    fluid size='large'
                    onClick={this.checkRegister}>
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