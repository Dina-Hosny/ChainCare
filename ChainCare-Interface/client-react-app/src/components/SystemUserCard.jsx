import React from "react";

import { Row, Col } from "react-bootstrap";

import "../styles/systemUserCard.css";

function SystemUserCard(props) {
  return (
    <>
      <div className="card-container">
        <Row>
          <Col>
            <div className="card-img">{props.image}</div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="card-user">{props.user}</div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="card-button">{props.button}</div>
          </Col>
        </Row>
        <Row>
          <Col></Col>
        </Row>
      </div>
    </>
  );
}

export default SystemUserCard;
