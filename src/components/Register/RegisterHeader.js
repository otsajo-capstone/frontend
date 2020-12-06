import React, {Component} from 'react';
import {
  Container,
  Header,
} from 'semantic-ui-react'

class RegisterHeader extends Component {
    render() {
        return (
            <div>
              <Container>
              <Header style={{ fontSize: '3em',
                color: "#5c92d7",
               fontFamily: ['Inter', 'NotoSansKR']}}
               textAlign='center'>
                  SIGN UP
                </Header>
              </Container>
            </div>
        );
    };
}

export default RegisterHeader;