import React from 'react'
import { Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import SearchForm from 'Components/SearchForm/SearchForm'
import './NavMenu.scss'

const NavMenu = (props) => (
  <Navbar bg="light" expand="lg">
    <NavLink className="navbar__link navbar-brand" to={"/"}>DexBook</NavLink>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <NavLink className="navbar__link nav-link" to={"/"}>Home</NavLink>
        <NavLink className="navbar__link nav-link" to={"/to-read"}>To Read</NavLink>
        <NavLink className="navbar__link nav-link" to={"/your-books"}>Your Books</NavLink>
        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
          <NavLink className="navbar__link nav-link" to={"/libraries"}>Libraries near you</NavLink>
          <NavDropdown.Divider />
        </NavDropdown>
      </Nav>

      <SearchForm />
    </Navbar.Collapse>
  </Navbar>
)

export default NavMenu