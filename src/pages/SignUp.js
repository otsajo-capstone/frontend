import React, {Component} from 'react';
import {PersonalInput} from 'components/Register';
import {CompleteRegister} from 'components/Register';
import {RegisterHeader} from 'components/Register';
import Layout from '../components/Layout';

import {
    Container,
  } from 'semantic-ui-react'

class SignUp extends Component {
    render() {
        const { match } = this.props;
        const number = match.params.number;

        return (
            <div>
                <Layout>
                <RegisterHeader number={number} />
                <Container style={{marginBottom: '2rem'}}>
                    { (number === '1' || number === undefined) && <PersonalInput />}
                    { (number === '2') && <CompleteRegister/>}
                </Container>
                </Layout>
            </div>
        )
    }
};

export default SignUp;