import React from 'react';
import Header from './header';
import { Container } from 'semantic-ui-react';
//import  { userContext, onLogin, onLogout } from './UserContext';

const Layout = ({children}) => {
    return (
        <div>
                {<Header/>}
                <Container style={{ marginTop: '7em' }}>
                {children}
                </Container>
        </div>
    )
}

export default Layout;