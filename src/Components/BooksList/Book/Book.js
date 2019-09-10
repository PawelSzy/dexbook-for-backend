import React from 'react'
import './Book.css'

const book = (props) => (
  <div className="book">
    <div className="book__title">title: {props.title}</div>
    <div className="book__author">author: {props.author}</div>
    <div className="book__price">price: {props.price}</div>
    <div className="book__score">score: {props.score}</div>
    <div className="book__rating">rating: {props.rating}</div>
    <div className="book__image">image: {props.image}</div>
  </div>
)

export default book
