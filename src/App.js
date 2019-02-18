import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './components/Home/index';
import Login from './components/Login/index';
import Error from './components/Error/index';
import ResetPasswordView from './views/ResetPasswordView';
import NewPasswordView from './views/NewPasswordView';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>

          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/login" component={Login} />
            <Route path="/resetpassword" component={ResetPasswordView} />
            <Route path="/reset_password/:token" component={NewPasswordView} />
            <Route component={Error} />

          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
