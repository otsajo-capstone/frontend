import React, { Component } from 'react';
import {
  Home,
  LoginPage,
  SignUp, 
  DressroomPage, 
  SearchPage, 
  AnalysisPage,
  UserInfoPage } from 'pages';
import Layout from './components/Layout'
import { Route, Switch, withRouter, Router } from 'react-router-dom';
import Store from './store/store';
import './index.css';

class App extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      memberId : 0,
      id: '',
      logged: false,
      onLogin: this.onLogin,
      onLogout: this.onLogout
    }
  }

  onLogin = (memberId, id) => {
    this.setState({
      memberId: memberId,
      id: id,
      logged: true
    });
  }

  onLogout = () => {
    this.setState({
      memberId: 0,
      id: '',
      logged: false
    });
  }

  
  render() {
    const {memberId, id, logged, onLogin, onLogout} = this.state;
    const style = {
      fontFamily: ['Inter', 'NotoSansKR'],
    }
    return (
      <Store.Provider value={this.state}>
        <Layout>
        <div style={style}>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/search" component={SearchPage} />
          <Switch>
            <Route path="/mypage/:number" component={UserInfoPage} />
            <Route path="/mypage" component={UserInfoPage} />
          </Switch>
          <Switch>
            <Route path="/signup/:number" component={SignUp} />
            <Route path="/signup" component={SignUp} />
          </Switch>
          <Switch>
            <Route exact path="/analysis/:number" component={AnalysisPage} />
            <Route exact path="/analysis" component={AnalysisPage} />
          </Switch>
          <Route exact path="/dressroom" component={DressroomPage} />        
        </div>
        </Layout>
      </Store.Provider>
    );
  }
}

export default App;
