import React, {Component} from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import MainPage from './Containers/MainPage/MainPage';
import ToReadBooksList from 'Components/ToReadBooksList/ToReadBooksList'
import NavMenu from 'Components/NavMenu/NavMenu';

import { connect } from 'react-redux';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavMenu />
        <Switch>
          <Route path="/to-read" exact component={ToReadBooksList} />
          <Route path="/" exact component={MainPage} />
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
  return {
  };
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
