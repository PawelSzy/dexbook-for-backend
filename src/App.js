import React, {Component} from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import MainPage from './Pages/MainPage/MainPage';
import MapPage from './Pages/MapPage/MapPage';
import ToReadBooksList from 'Components/BooksLists/ToReadBooksList/ToReadBooksList'
import YourBookList from 'Components/BooksLists/YourBookList/YourBookList'
import SearchBookList from 'Components/BooksLists/SearchBookList/SearchBookList'
import NavMenu from 'Components/NavMenu/NavMenu';
import BookPage from 'Pages/BookPage/BookPage'
import LoginBar from 'Components/LoginBar/LoginBar'
import Logout from 'Components/LoginBar/Logout/Logout'
import Auth from 'Components/Auth/Auth'
import * as actions from 'State/auth';

import { connect } from 'react-redux';

class App extends Component {
  componentDidMount () {
    this.props.onTryAutoSignup();
  }

  render() {
    return (
      <div className="App">
        <div className="container-fluid">
          <LoginBar isAuthenticated={this.props.isAuthenticated} />
        </div>

        <div className="container-fluid px-0">
          <NavMenu />
        </div>

        <Switch>
          <Route
            path="/register"
            exact
            render={(props) => <Auth {...props} isSignup={true} />}
          />
          <Route
            path="/login"
            exact
            render={(props) => <Auth {...props} isSignup={false} />}
          />
          <Route path="/logout" exact component={Logout} />
          <Route path="/to-read" exact component={ToReadBooksList} />
          <Route path="/your-books" exact component={YourBookList} />
          <Route path="/search-books" exact component={SearchBookList} />
          <Route path="/book" component={BookPage} />
          <Route path="/libraries" component={MapPage} />
          <Route path="/" exact component={MainPage} />
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: typeof state.auth !== 'undefined' && state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch( actions.authCheckState() )
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
