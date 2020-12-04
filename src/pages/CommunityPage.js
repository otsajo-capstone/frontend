import React, { Component } from 'react';
import {Commu, CommuHeader} from '../components/Comminuty'
import Layout from '../components/Layout'
import Store from '../store/store';

class CommunityPage extends Component {
    render() {
        return (
            <Layout>
                <CommuHeader />
                    <Store.Consumer>
                        {Store =>
                            <Commu
                                memberId={Store.memberId}
                                colorType={Store.colorType} />}
                    </Store.Consumer>
            </Layout>
        )
    }
};

export default CommunityPage;