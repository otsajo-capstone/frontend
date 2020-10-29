import React, {Component} from 'react';
import Analysis from 'components/Analysis';
import Layout from '../components/Layout';
import Store from '../store'
import Login from '../components/Login'

class AnalysisPage extends Component {
    render(){
        return (
            <Layout>
                <Analysis/>
            </Layout>
        )
    }
};

export default AnalysisPage;