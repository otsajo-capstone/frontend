import React from 'react';
import Header from './header';
import Store from '../store/store';
import { Container } from 'semantic-ui-react';

const Layout = ({children}) => {
    return (
        <div>
            <Store.Consumer>
                {Store => (<Header
                logged={Store.logged}
                onLogin={Store.onLogin}
                onLogout={Store.onLogout}/>
                )}
            </Store.Consumer>
            <Container style={{ marginTop: '7em' }}>
                {children}
            </Container>
        </div>
    )
}

export default Layout;