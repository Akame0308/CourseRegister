import React from 'react';
import { Navbar, Container, Nav, Form, FormControl, Button } from 'react-bootstrap';

class NavBar extends React.Component {
  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">Course System</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="courseTable">CourseTable</Nav.Link>
              <Nav.Link href="profile">Profile</Nav.Link>
            </Nav>
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Student ID"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
  }
}

export default NavBar;