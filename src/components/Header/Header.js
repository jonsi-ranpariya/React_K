import { Button, Form } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.clear("token");
    navigate("/login");
  };
  return (
    <>
      <Navbar style={{ backgroundColor: "rgb(12 16 99)" }} expand="lg">
        <Container fluid>
          <Navbar.Brand href="#" style={{ color: "white" }}>
            Logo
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <div style={{ display: "flex", marginRight: "3rem" }}>
            <Navbar.Collapse id="navbarScroll">
              <Button variant="secondary" onClick={handleLogout}>
                LogOut
              </Button>
            </Navbar.Collapse>
          </div>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
