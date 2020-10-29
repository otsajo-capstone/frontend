import React, { Component } from 'react'
import logo from 'image/temp_logo.png';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import Axios from 'axios';
//import  { userContext, onLogin, onLogout } from '../UserContext';

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: '',
      password: ''
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  checkLogin = async e => {
    //새로고침 방지
    e.preventDefault();

    try {
      var formdata = new FormData();
      formdata.append('mb_id', this.state.id);
      formdata.append('mb_pw', this.state.password);

      const response = await Axios.post(
        "/colorfit/member/login/",
         formdata
      );
        
      const { status, data } = response;
      if (data.status===200){
        //(토큰 저장)
        
        this.props.onLogin(data.intResult);
        console.log('logged:', this.props.logged)
        this.props.history.push('/');
      }
      else{
        alert("login failed!");
        this.setState({
          id: "",
          password: ""
        })
      }
    } catch(error) {
      console.log(error);
    }
  }

  render() {
    return (
      <Container>
        <div className='login-form'>
          <style>{`
          body > div,
          body > div > div,
          body > div > div > div.login-form {
            height: 100%;
          }
        `}</style>
          <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as='h2' color='teal' textAlign='center'>
                <Image src={logo}/> Log-in to your account
              </Header>
              <Form size='large'>
                <Segment stacked>
                  <Form.Input 
                  fluid icon='user'
                  iconPosition='left'
                  placeholder='ID'
                  value={this.state.id}
                  onChange={this.handleChange}
                  name="id"/>
                  <Form.Input
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='PASSWORD'
                    type='password'
                    value={this.state.password}
                    onChange={this.handleChange}
                    name="password"
                  />
                  <Button
                  color='teal'
                  fluid
                  size='large'
                  onClick={this.checkLogin}>
                    Login
                  </Button>
                </Segment>
              </Form>
              <Message>
                  Join and Get your Color!<br/>
                <Link to="/search">Search ID or PassWord</Link><br /> 
                <Link to="/signup">Sign Up</Link>
              </Message>
            </Grid.Column>
          </Grid>
        </div>
      </Container>
    )
  }
}

export default withRouter(Login);