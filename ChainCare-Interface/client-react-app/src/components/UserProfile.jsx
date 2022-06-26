import React from "react";

import { Row, Col, Form } from "react-bootstrap";

import "../styles/profile.css";

function UserProfile(props) {
  return (
    <Row>
      <Row>
        <Col sm={4} className="profile-info-title">
          <span>{props.title}</span>
        </Col>
        <Col sm={8}></Col>
      </Row>
      <Row>
        <Col sm={4} className="profile-info-text">
          Full Name
        </Col>
        <Col sm={8}>
          <Form.Control
            type="text"
            placeholder={props.name}
            readOnly
            className="profile-info-form-entry"
          />
        </Col>
      </Row>
      <Row>
        <Col sm={4} className="profile-info-text">
          Ethereum Address
        </Col>
        <Col sm={8}>
          <Form.Control
            className="profile-info-form-entry"
            type="text"
            placeholder={props.address}
            readOnly
          />
        </Col>
      </Row>
    </Row>
  );
}

export default UserProfile;
