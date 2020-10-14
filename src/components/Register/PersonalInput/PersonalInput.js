import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
    Button,
    Form,
    Label,
    Segment,
    Grid
  } from 'semantic-ui-react';
  import Axios from 'axios';

const style = {
    base : {
        margin:'0.5rem',
        padding:'0.5rem'
    },
    paddinglr : {
        paddingLeft : '6%',
        paddingRight : '6%'
    }
};

class PersonalInput extends Component {

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
                <Form>
                    <Segment piled style={style.paddinglr}>
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

                        <Label style={style.base}> Password </Label>
                        <Form.Input
                        name='password'
                        fluid icon='lock'
                        placeholder='Password'
                        type='password'
                        value={this.state.password}
                        onChange={this.handleChange}/>

                        <Label style={style.base}> Your Personal Color </Label>
                        <Grid style={style.base} columns='equal'>
                                <Grid.Row>
                                    <Grid.Column>
                                        <Segment>
                                            <Button fluid value='1' color={this.state.buttonColor[0]} onClick={this.handleButtonClick}>Spring Warm</Button>
                                        </Segment>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Segment>
                                            <Button fluid value='2' color={this.state.buttonColor[1]} onClick={this.handleButtonClick}>Summer Cool</Button>
                                        </Segment>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                <Grid.Column>
                                        <Segment>
                                            <Button fluid value='3' color={this.state.buttonColor[2]} onClick={this.handleButtonClick}>Autumn Warm</Button>
                                        </Segment>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Segment>
                                            <Button fluid value='4' color={this.state.buttonColor[3]} onClick={this.handleButtonClick}>Winter Cool</Button>
                                        </Segment>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column>
                                        <Segment textAlign='center'>
                                            If you don't choose anything,<br/>
                                            You can choose it later
                                        </Segment>
                                    </Grid.Column>
                                </Grid.Row>
                        </Grid>
                    </Segment>

                    <Button
                    disabled={this.state.id.length<1
                        || this.state.name.length<1
                        || this.state.email.length<1
                        || this.state.password.length<1}
                    color='teal'
                    fluid size='large'
                    onClick={this.checkRegister}>
                        Register
                    </Button>
                </Form>
            </div>
        );
    };
};

export default withRouter(PersonalInput);