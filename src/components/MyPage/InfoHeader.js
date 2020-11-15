import React, { Component } from 'react';
import {
  Container,
  Header,
} from 'semantic-ui-react'

class InfoHeader extends Component {
  render() {
    return (
      <div>
        <Container>
          <Header style={{
            fontSize: '3em',
            fontFamily: ['Inter', 'NotoSansKR'],
            color: "#5c92d7"
          }}
            textAlign='center'>
            MY PAGE
                </Header>
        </Container>
      </div>
    );
  };
}

export default InfoHeader;