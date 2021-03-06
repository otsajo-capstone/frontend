import React, { Component } from 'react';
import Dressroom from 'components/Dressroom'
import Layout from '../components/Layout'
import { Header } from 'semantic-ui-react'
import Store from '../store/store';

class DressroomPage extends Component {
    render() {
        return (
            <Layout>
                <Header style={{
                    fontSize: '3em',
                    fontFamily: ['Inter', 'NotoSansKR'],
                    padding: '1rem',
                    color: "#5c92d7"
                }}
                    textAlign='center'>
                    Dress Room
                </Header>
                <Store.Consumer>
                    {Store =>
                        <Dressroom
                            memberId={Store.memberId}
                            colorType={Store.colorType}
                            onChangeColor={Store.onChangeColor} />}
                </Store.Consumer>
            </Layout>
        )
    }
};

export default DressroomPage;