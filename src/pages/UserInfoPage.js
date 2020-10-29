import React, {Component} from 'react';
import Info from '../components/MyPage/Info'
import Modify from '../components/MyPage/Modify'
import Store from '../store/store';
import Layout from '../components/Layout';

class UserInfoPage extends Component {
    render(){
        const { match } = this.props;
        const number = match.params.number;

        return (
            <Layout>
                <Store.Consumer>
                        {Store => (
                            (number === '1' || number === undefined) &&
                            <Info memberId={Store.memberId}/>
                            ||
                            (number === '2') &&
                            <Modify memberId={Store.memberId}/>
                        )}
                </Store.Consumer>
            </Layout>
        )
    }
};

export default UserInfoPage;