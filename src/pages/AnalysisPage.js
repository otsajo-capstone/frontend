import React, {Component} from 'react';
import {AnalysisMain} from '../components/Analysis';
import {Crawling} from '../components/Analysis';
import {AnalysisHeader} from '../components/Analysis';
import Layout from '../components/Layout';
import Store from '../store'
import Login from '../components/Login'

import {
    Container,
  } from 'semantic-ui-react'


class AnalysisPage extends Component {
    render(){
        const { match } = this.props;
        const number = match.params.number;

        return (
            <Layout>
                <AnalysisHeader />
                <Container style={{marginBottom: '2rem'}}>
                    { (number === '1' || number === undefined) && <AnalysisMain />}
                    { (number === '2') && <Crawling/>}
                </Container>
            </Layout>
        )
    }
};

export default AnalysisPage;