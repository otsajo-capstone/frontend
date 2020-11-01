import React, { Component } from 'react';
import { AnalysisMain } from '../components/Analysis';
import { Result } from '../components/Analysis';
import { AnalysisHeader } from '../components/Analysis';
import Layout from '../components/Layout';
import Store from '../store/store';

import {
    Container,
} from 'semantic-ui-react'


class AnalysisPage extends Component {
    render() {
        const { match } = this.props;
        const number = match.params.number;

        return (
            <Layout>
                <AnalysisHeader />

                <Store.Consumer>{
                    Store => (
                        <Container style={{ marginBottom: '2rem' }}>
                            { (number === '1' || number === undefined) &&
                            <AnalysisMain 
                            memberId={Store.memberId} />}
                            { (number === '2') && <Result />}
                        </Container>
                    )}
                </Store.Consumer>
            </Layout>
        )
    }
};

export default AnalysisPage;