import React, {Component} from 'react';
import Find from 'components/Find'
import Layout from '../components/Layout';

class SearchPage extends Component {
    render(){
        return (
            <Layout>
                <Find/>
            </Layout>
        )
    }
};

export default SearchPage;