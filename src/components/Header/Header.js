import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useState } from "react";
import SignUp from "../Forms/SignUp";
import axios from "axios";

const Header = () => {
  const [isShowing, setIsShowing] = useState(false);
  const [userList, setUserList] = useState([])

  const openForm = () => setIsShowing(true);
  const closeForm = () => setIsShowing(false);

  const addUser = (newUser) => {
    axios
      .post("http://localhost:4200/users/", 
        newUser
      )
      .then(console.log("added"));
    const newList = [...userList, { ...newUser }];
    setUserList(newList);
  };


  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container fluid>
          <Navbar.Brand>Exercise Tracker</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <NavDropdown title="Options" id="basic-nav-dropdown">
                <NavDropdown.Item href="/">Sign In</NavDropdown.Item>
                <NavDropdown.Item onClick={openForm}>Sign Up</NavDropdown.Item>
                <NavDropdown.Item href="/">Personal Training</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/">About Us</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div>
        {isShowing && (
          <SignUp
            onCLoseFormAndButtons={closeForm}
            onOpenFormAndButtons={openForm}
            onAddUser = {addUser}
          />
        )}
      </div>
    </div>
  );
};

export default Header;
