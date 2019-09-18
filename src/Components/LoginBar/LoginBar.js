import React from 'react'
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'


const loginBar = (props) => {
  let links = [
    {link: "/login", title: "Login"},
    {link: "/register", title: "Register"},
  ]

  if(props.isAuthenticated) {
    links = [{link: "/logout", title: "Logout"}]
  }

  return (
    <div className="row">
      <Nav className="row nav d-flex flex-column text-left col-12">
        <ul className="list-unstyled d-flex flex-row text-left justify-content-end my-1">
       {
         links.map(link => (
           <li>
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