import React, {Component} from 'react';
import {
  Container,
  Header,
} from 'semantic-ui-react'

class InfoHeader extends Component {
    render() {
        const { number } = this.props;
        const prior = (number > 1) ? '/mypage/'+(number - 1) : '/';
        return (
            <div>
              <Container>
              <Header style={{ fontSize: '3em', fontFamily: ['Inter', 'NotoSansKR']}}
               color='teal'
               textAlign='center'>
                  MY PAGE
                </Header>
              </Container>
            </div>
        );
    };
}

export default InfoHeader;