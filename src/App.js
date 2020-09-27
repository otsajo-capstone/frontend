import React, { Component } from 'react';
import { Home, SignUp } from 'pages';
import { Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={Home} />
        <Switch>
          <Route path="/signup/:number" component={SignUp} />
          <Route path="/signup" component={SignUp} />
        </Switch>        
      </div>
    );
  }
}

export default App;
