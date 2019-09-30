import React from 'react'
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'

const loginBar = (props) => {
  let links = [
    {link: "/login", title: "Login", id: "1" },
    {link: "/register", title: "Register", id: "2" },
  ]

  if(props.isAuthenticated) {
    links = [{link: "/logout", title: "Logout", id: "3"}]
  }

  return (
    <div className="row">
      <Nav className="row nav d-flex flex-column text-left col-12 pr-0">
        <ul className="list-unstyled d-flex flex-row text-left justify-content-end my-1">
       {
         links.map(link => (
           <li key={link.id}>
             <NavLink className="navbar__link nav-link p-0 text-muted ml-2" to={link.link}>{link.title}</NavLink>
           </li>
         ))
         }
        </ul>
      </Nav>
    </div>
  )
}

export default loginBar