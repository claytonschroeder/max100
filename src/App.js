import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import Dashboard from './containers/Dashboard/Dashboard';
import Project from './containers/Project/Project';
import Auth from './containers/Auth/Auth';
import Layout from './hoc/Layout/Layout';
import Counter from './containers/Counter/Counter';

import classes from './App.css';

class App extends Component {
  render() {
    return (
      <div className={ classes.App }>
        <Layout>
          <Switch>
            <Route path="/project/:id" component={Project} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/counter" component={Counter} />
            <Route path="/" component={Auth} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default withRouter(App);
