import React, { Component } from 'react';
import {
  Container,
  Header,
} from 'semantic-ui-react'


class CommuHeader extends Component {
  render() {
    return (
      <div>
        <Container>
          <Header style={{
            fontSize: '3em',
            fontFamily: ['Inter', 'NotoSansKR'],
            padding: '1rem',
            color: "#5c92d7"
          }}
            textAlign='center'>
            Community
                </Header>
        </Container>
      </div>
    );
  };
}

export default CommuHeader;