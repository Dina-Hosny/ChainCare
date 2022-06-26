import React from "react";

import { Row, Col, Container } from "react-bootstrap";

import Layout from "../components/Layout";
import MainContainer from "../components/MainContainer";

import "../styles/actionPageLayout.css";

function ActionPageLayout(props) {
  return (
    <Layout>
      <MainContainer>
        <Container>
          <Row>
            <Col sm={3} className="action-container">
              <p className="action-title">Actions</p>
              {props.actions}
            </Col>
            <Col sm={8} className="nav-container">
              {/* <p className="action-title">Navigation</p> */}
              {props.content}
            </Col>
          </Row>
        </Container>
      </MainContainer>
    </Layout>
  );
}

export default ActionPageLayout;
