import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Button,
  Form,
  Label,
  Segment,
  Grid,
  Container
} from 'semantic-ui-react';
import Axios from 'axios';

const style = {
  base: {
    margin: '0.5rem',
    padding: '0.5rem'
  },
  paddinglr: {
    paddingLeft: '6%',
    paddingRight: '6%'
  },
  button: {
    margin: '0.1rem',
    padding: '0.1rem'
  }
};

class Info extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mb_name: 'noname',
      mb_email: 'noemail',
      mb_type: 0,
      password: '',
      pw_check: '',
      buttonColor: ['teal', 'teal', 'teal', 'teal']
    };
  }

  componentDidMount() {
    Axios.get("http://localhost:8080/colorfit/member/mypage/" + String(this.props.memberId))
      .then(res => (res.data.status === 200)
        && this.setState({
          mb_name: res.data.mdto.mb_name,
          mb_email: res.data.mdto.mb_email,
          mb_type: res.data.mdto.mb_type,
        }))
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleButtonClick = (e) => {
    const nextColor = ['teal', 'teal', 'teal', 'teal'];
    var nextType = 0;

    if (this.state.buttonColor[e.target.value - 1] !== 'pink') {
      nextColor[e.target.value - 1] = 'pink';
      nextType = e.target.value;
    }
    this.setState({
      mb_type: nextType,
      buttonColor: nextColor
    });
  }

  update = async e => {
    e.preventDefault();

    try {
      var formdata = new FormData();
      formdata.append('mb_name', this.state.mb_name);
      formdata.append('mb_pw', this.state.password);
      formdata.append('mb_email', this.state.mb_email);
      formdata.append('mb_type', this.state.mb_type);
      formdata.append('mb_uid', this.props.memberId);

      const response = await Axios.post(
        "http://localhost:8080/colorfit/member/mypageUpdate",
        formdata,
      );

      const { data } = response;
      if (data.status === 200) {
        alert("정보 업데이트 되었습니다.");
      }
      else {
        alert("오류");
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div>
        <Container>
          <Form>
            <Segment style={style.paddinglr}>

              <Label style={style.base}> 아이디 </Label>
              <Form.Input
                name='id'
                type='text'
                value={this.props.id} />

              <Label style={style.base}> 이메일 </Label>
              <Form.Input
                name='email'
                fluid icon='at'
                value={this.state.mb_email}
                onChange={this.handleChange} />


              <Label style={style.base}> 이름 </Label>
              <Form.Input
                name='name'
                type='text'
                value={this.state.mb_name}
                onChange={this.handleChange} />

              <Label style={style.base}> 변경할 비밀번호 </Label>
              <Form.Input
                name='password'
                fluid icon='lock'
                placeholder='새 비밀번호'
                type='password'
                value={this.state.password}
                onChange={this.handleChange} />

              <Label style={style.base}> 비밀번호 확인 </Label>
              <Form.Input
                name='pw_check'
                fluid icon='lock'
                placeholder='비밀번호'
                type='password'
                value={this.state.pw_check}
                onChange={this.handleChange}
                error={!(this.state.password == this.state.pw_check)} />

              <Label style={style.base}> 퍼스널 컬러 </Label>
              <Grid style={style.button} columns='equal'>
                <Grid.Row>
                  <Grid.Column>
                    <Segment>
                      <Button fluid value='1' color={this.state.mb_type == 1 && 'pink' || !(this.state.mb_type == 1) && 'teal'} onClick={this.handleButtonClick}>봄 웜</Button>
                    </Segment>
                  </Grid.Column>
                  <Grid.Column>
                    <Segment>
                      <Button fluid value='2' color={this.state.mb_type == 2 && 'pink' || !(this.state.mb_type == 2) && 'teal'} onClick={this.handleButtonClick}>여름 쿨</Button>
                    </Segment>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column>
                    <Segment>
                      <Button fluid value='3' color={this.state.mb_type == 3 && 'pink' || !(this.state.mb_type == 3) && 'teal'} onClick={this.handleButtonClick}>가을 웜</Button>
                    </Segment>
                  </Grid.Column>
                  <Grid.Column>
                    <Segment>
                      <Button fluid value='4' color={this.state.mb_type == 4 && 'pink' || !(this.state.mb_type == 4) && 'teal'} onClick={this.handleButtonClick}>겨울 쿨</Button>
                    </Segment>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>

            <Button
              color='teal'
              fluid size='large'
              onClick={this.update}
              disabled={this.state.mb_name.length < 1
                || this.state.password.length < 4
                || (this.state.password != this.state.pw_check)
              }>
              수정하기
              </Button>
          </Form>
        </Container>
      </div>
    )
  }
};

export default withRouter(Info);