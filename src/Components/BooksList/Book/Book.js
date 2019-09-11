import React from 'react'
import './Book.scss'
import { Button, ButtonToolbar } from 'react-bootstrap';

const book = (props) => (
  <div className="book row border-top border-bottom">
    <div className="col-md-2 my-1">
      <img className="book__image img-fluid" src={props.image} alt="book cover {props.title}" />
    </div>

    <div className="col-md-6 my-auto text-md-left">
      <div className="book__title">{props.title}</div>
      <div className="book__author">{props.author}</div>
      <div className="book__rating">rating: {props.rating}</div>
      <div className="row col-md-4 col-xl-2 pl-0 book__smaller-text mx-auto mx-md-0">
        <div className="book__price col-md-6 px-0">price: {props.price}</div>
        <div className="book__score col-md-6">score: {props.score}</div>
      </div>
    </div>

    <div className="col-md-4 my-auto">
      <Button variant="primary" size="sm">
       Want to read
      </Button>
    </div>
  </div>
)

export default book
