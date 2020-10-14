import React, {Component} from 'react';
import Login from 'components/Login';
import Store from '../store/store';
import Layout from '../components/Layout';

/*
const LoginPage = () => (
    <div>
        <Header/>
        <Store.Consumer>
            {Store => (
                <Login onLogin={Store.onLogin}/>
            )}
        </Store.Consumer>
    </div>
)
*/

class LoginPage extends Component {
    render(){
        return (
            <Layout>
                <Store.Consumer>
                    {Store => (
                        <Login onLogin={Store.onLogin}/>
                    )}
                </Store.Consumer>
            </Layout>
        )
    }
};

export default LoginPage