import React, { Component } from 'react';
import { Home, LoginPage, SignUp, DressroomPage } from 'pages';
import { Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={LoginPage} />
        <Switch>
          <Route path="/signup/:number" component={SignUp} />
          <Route path="/signup" component={SignUp} />
        </Switch>
        <Route exact path="/dressroom" component={DressroomPage} />        
      </div>
    );
  }
}

export default App;
