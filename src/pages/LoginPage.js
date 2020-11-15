import React, {Component} from 'react';
import Login from 'components/Login';
import Store from '../store/store';
import Layout from '../components/Layout';
import '.././index.css'

class LoginPage extends Component {
    render(){
        const style = {
            fontFamily: ['Inter', 'NotoSansKR'],
          }
        return (
            <Layout>
                <Store.Consumer>
                    {Store => (
                        <Login
                        style={style}
                        memberId={Store.memberId}
                        logged={Store.logged}
                        onLogin={Store.onLogin}
                        colorType={Store.colorType}
                        onChangeColor={Store.onChangeColor}/>
                    )}
                </Store.Consumer>
            </Layout>
        )
    }
};

export default LoginPage