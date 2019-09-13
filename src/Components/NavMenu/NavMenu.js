import React from 'react'
import { Button, Nav, NavDropdown, Form, FormControl, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './NavMenu.scss'

const NavMenu = (props) => (
  <Navbar bg="light" expand="lg">
    <Navbar.Brand href="#home">DexBook</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link><NavLink className="navbar__link" to={"/"}>Home</NavLink></Nav.Link>
        <Nav.Link><NavLink className="navbar__link" to={"/to-read"}>To Read</NavLink></Nav.Link>
        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
        </NavDropdown>
      </Nav>
      <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <Button variant="outline-success">Search</Button>
      </Form>
    </Navbar.Collapse>
  </Navbar>
)

export default NavMenu