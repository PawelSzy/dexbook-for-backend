import React, {Component} from 'react';
import { Button, Form, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";

class SearchForm extends Component {
  state = {
    searchText: {},
  }

  getSearchText = (e) => {
    this.setState({searchText: e.target.value});
  }

  mySubmitHandler = (e) => {
    e.preventDefault()
    this.searchBook()
  }

  searchBook = () => {
    const searchText = this.state.searchText
    this.props.history.push({
      pathname: '/search-books',
      search: `?query=${searchText}`,
    })
  }

  render() {
    return (
      <Form inline onSubmit={this.mySubmitHandler}>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" onChange={this.getSearchText} />
        <Button variant="outline-success" onClick={() => this.searchBook()}>Search</Button>
      </Form>
    )
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchForm));
