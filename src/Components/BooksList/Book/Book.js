import React from 'react'
import './Book.css'

const book = (props) => (
  <div className="book">
    <div className="book__title">title: {props.title}</div>
    <div className="book__author">author: {props.author}</div>
    <div className="book__price">price: {props.price}</div>
    <div className="book__score">score: {props.score}</div>
    <div className="book__rating">rating: {props.rating}</div>
    <img className="book__image" src={props.image} alt="book cover {props.title}" />
  </div>
)

export default book
