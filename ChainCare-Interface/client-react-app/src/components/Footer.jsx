import React from "react";

import { Container, Row, Col } from "react-bootstrap";

import { AiOutlineCopyrightCircle } from "react-icons/ai";

import "../styles/footer.css";

function Footer() {
  return (
    <footer>
      <Container className="footer-container">
        <Row>
          <Col>
            <div>
              <span>Copyright</span>
              <span className="copyright-icon">
                <AiOutlineCopyrightCircle />
              </span>
              <span>{new Date().getFullYear()} All rights reserved.</span>
        
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
