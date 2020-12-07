import React, {Component} from 'react';
import Info from '../components/MyPage/Info'
import Store from '../store/store';
import Layout from '../components/Layout';
import InfoHeader from '../components/MyPage/InfoHeader'

class UserInfoPage extends Component {
    render(){
        return (
            <Layout>
                <InfoHeader/>
                <Store.Consumer>                    
                    {Store => (
                        <Info 
                        memberId={Store.memberId}
                        id={Store.id}
                        colorType={Store.colorType}
                        onChangeColor={Store.onChangeColor}
                        onLogout={Store.onLogout}/>
                    )}
                </Store.Consumer>
            </Layout>
        )
    }
};

export default UserInfoPage;