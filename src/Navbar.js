import React from "react";
import Nav from "react-bootstrap/Nav";

function Navbar() {
  return (
    <>
      <div style={{ gap: 13, display: "flex", padding: ".5rem 1rem" }}>
        <h1
          style={{
            fontSize: 20,
            flexGrow: 1,
            marginTop: "auto",
            textAlign: "start",
          }}
        >
          Self-study Dashboard Development
        </h1>
        <Nav activeKey="/pricingHistory" className="d-flex">
          <Nav.Item>
            <Nav.Link href="/pricingHistory">Pricing History</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/myPortfolio">My Portfolio</Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
      <hr style={{ margin: "0px 0px 10px 0px" }} />
    </>
  );
}

export default Navbar;
