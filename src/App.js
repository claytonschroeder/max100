import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import Home from './containers/Home/Home';
import Project from './containers/Project/Project';
import Layout from './hoc/Layout/Layout';


import classes from './App.css';

class App extends Component {
  render() {
    return (
      <div className={ classes.App }>
        <Layout>
          <Switch>
            <Route path="/case" component={Project} />
            <Route path="/" exact component={Home} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default withRouter(App);
