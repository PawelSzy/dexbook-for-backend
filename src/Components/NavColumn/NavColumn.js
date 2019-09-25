import React from 'react'
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'

const links = [
  {link: "/to-read", title: "To Read", id: 1},
  {link: "/your-books", title: "Your Books", id: 2},
  {link: '/libraries', title: "Find libraries near you", id: 3},
]

const NavColumn = () => (
 <div className="col-12 row">
   <Nav className="row nav d-flex flex-column text-left ml-4">
     <ul className="list-unstyled">
       {
         links.map(link => (
           <li key={link.id.toString()} >
             <NavLink className="navbar__link nav-link p-0 text-muted" to={link.link}>{link.title}</NavLink>
           </li>
        ))
       }
     </ul>
   </Nav>
 </div>
)

export default NavColumn
