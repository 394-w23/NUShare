import React from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import { signInWithGoogle, signOut } from "../../utils/firebase";
import { useProfile } from "../../utils/userProfile";

const SignInButton = () => (
  <button
    className="ml-5 p-2 w-15 btn btn-primary sign-button"
    onClick={signInWithGoogle}
  >
    Sign in
  </button>
);

const SignOutButton = () => (
  <button
    className="ml-5 p-2 w-10 btn btn-primary sign-button"
    onClick={signOut}
  >
    Sign out
  </button>
);

const Header = () => {
  const [user] = useProfile();
  const navigate = useNavigate();

  return (
    <Row className="mb-3 p-0 w-100 m-0">
      <Navbar className="p-3 navbar">
        <Container className="navbar-container">
          <div className="navbar-brand" onClick={() => navigate("/")}>
            NUShare
          </div>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          {user && (
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <div
                  className="create-ride-title"
                  onClick={() => navigate("/create-ride")}
                >
                  Create Ride
                </div>
              </Nav>
            </Navbar.Collapse>
          )}
          {user ? <SignOutButton /> : <SignInButton />}
        </Container>
      </Navbar>
    </Row>
  );
};

export default Header;
