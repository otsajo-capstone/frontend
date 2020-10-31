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
    base : {
        margin:'0.5rem',
        padding:'0.5rem'
    },
    paddinglr : {
        paddingLeft : '6%',
        paddingRight : '6%'
    },
    button : {
        margin:'0.1rem',
        padding:'0.1rem'
    }
};

class Info extends Component {
  constructor(props){
    super(props);

    this.state = {
      mb_id: this.props.memberId,
      mb_name: 'noname',
      mb_email: 'noemail',
      mb_type: 0
    };
  }

  componentDidMount(){

      Axios.get("/colorfit/member/mypage/" + String(this.state.mb_id))
      .then(res => (res.data.status === 200) && this.setState({
        mb_name: res.data.mdto.mb_name,
        mb_email: res.data.mdto.mb_email,
        mb_type: res.data.mdto.mb_type
      }));

  }

  render(){
    return(
        <div>
          <Container>
            <div>
              {this.state.mb_id}
            </div>
            <div>
              {this.state.mb_email}
            </div>
          </Container>
        </div>
    )
  }
};

export default withRouter(Info);