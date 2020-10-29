import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Container,
  Header,
} from 'semantic-ui-react'

const style = {
    h1: {
      fontFamily: ['Inter', 'NotoSansKR'],
      marginTop: '3em',
    },
    h2: {
      fontFamily: ['Inter', 'NotoSansKR'],
      margin: '4em 0em 2em',
    },
    h3: {
      fontFamily: ['Inter', 'NotoSansKR'],
      marginTop: '0.5em',
      padding: '2em 0em',
    },
    last: {
      fontFamily: ['Inter', 'NotoSansKR'],
      marginBottom: '300px', 
    },
    comp: {
      fontFamily: ['Inter', 'NotoSansKR'],
      margin:'0.5rem',
      padding:'0.5rem'
    },
    base: {
      fontFamily: ['Inter', 'NotoSansKR'],
      marginBottom: '2rem',
    }
}


class RegisterHeader extends Component {
    render() {
        const { number } = this.props;
        const prior = (number > 1) ? '/signup/'+(number - 1) : '/';
        return (
            <div>
              <Container>
              <Header style={{ fontSize: '3em', fontFamily: ['Inter', 'NotoSansKR']}}
               color='teal'
               textAlign='center'>
                  COLOR FIT
                </Header>
              </Container>
            </div>
        );
    };
}

export default RegisterHeader;