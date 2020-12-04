import React, { Component } from 'react';
import {
  Home,
  LoginPage,
  SignUp, 
  DressroomPage, 
  SearchPage, 
  AnalysisPage,
  UserInfoPage,
  CommunityPage } from 'pages';
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
      colorType: 0,
      onLogin: this.onLogin,
      onLogout: this.onLogout,
      onChangeColor: this.onChangeColor
    }
  }

  onLogin = (memberId, id, type) => {
    this.setState({
      memberId: memberId,
      id: id,
      colorType: type,
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

  onChangeColor = (newcolor) => {
    this.setState({
      colorType: newcolor
    });
  }
  
  render() {
    const {memberId, id, logged, colorType, onLogin, onLogout, onChangeColor} = this.state;
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
          <Route exact path="/community" component={CommunityPage} />        
        </div>
        </Layout>
      </Store.Provider>
    );
  }
}

export default App;
