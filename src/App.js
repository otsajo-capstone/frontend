import React, { Component } from 'react';
import { Home, LoginPage, SignUp, DressroomPage, SearchPage, AnalysisPage } from 'pages';
import { Route, Switch, withRouter, Router } from 'react-router-dom';
import Store from './store/store';
//import { userContext, onLogin, onLogout } from './components/UserContext';

class App extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      user : {},
      logged: false,
      onLogin: this.onLogin,
      onLogout: this.onLogout
    }
  }

/*
  state = {
    logged: false,
    user: {},
    username: {},
    usertype: {}
}
*/
  onLogin = () => {
    this.setState({
      logged: true
    });
  }

  onLogout = () => {
    this.setState({
      logged: false
    });
  }


  render() {
    const {logged, onLogout} = this.state;
    //const { logged, user, username, usertype } = this.state

    return (
      <Store.Provider value={this.state}>
        <div>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/search" component={SearchPage} />
          <Switch>
            <Route path="/signup/:number" component={SignUp} />
            <Route path="/signup" component={SignUp} />
          </Switch>
          <Route exact path="/analysis" component={AnalysisPage} />
          <Route exact path="/dressroom" component={DressroomPage} />        
        </div>
      </Store.Provider>
    );
  }
}

export default App;
