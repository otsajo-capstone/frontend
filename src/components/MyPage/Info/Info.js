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

  render(){
    return(
        <div>
          <Container>
          
          </Container>
        </div>
    )
  }
};

export default withRouter(Info);