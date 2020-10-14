import React, { useContext } from 'react';

const userContext = React.createContext(
    {
        logged: false,
        user: null,
        username: null,
        usertype: null
    }
);

const onLogin = () => ({
    logged: true
});

const onLogout = () => ({
    logged: false
});

export { userContext, onLogin, onLogout };