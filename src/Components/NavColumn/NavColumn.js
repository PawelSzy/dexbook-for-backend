import React from 'react'
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'

const links = [
  {link: "/to-read", title: "To Read"},
  {link: "/your-books", title: "Your Books"},
]

const NavColumn = () => (
 <div className="col-12 row">
   <Nav className="row nav d-flex flex-column text-left ml-4">
     <ul className="list-unstyled">
       {
         links.map(link => (
           <li>
             <NavLink className="navbar__link nav-link p-0 text-muted" to={link.link}>{link.title}</NavLink>
           </li>
        ))
       }
     </ul>
   </Nav>
 </div>
)

export default NavColumn
