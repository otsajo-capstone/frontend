import React, { Component } from 'react';
import { AnalysisMain } from '../components/Analysis';
import { AnalysisHeader } from '../components/Analysis';
import Layout from '../components/Layout';
import Store from '../store/store';

import {
    Container,
} from 'semantic-ui-react'


class AnalysisPage extends Component {
    render() {
        return (
            <Layout>
                <AnalysisHeader />
                <Store.Consumer>{
                    Store => (
                        <Container style={{ marginBottom: '2rem' }}>
                            <AnalysisMain 
                            memberId={Store.memberId}
                            colorType={Store.colorType} />
                        </Container>
                    )}
                </Store.Consumer>
            </Layout>
        )
    }
};

export default AnalysisPage;