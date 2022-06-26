import React from "react";

import { Card, Button, Row, Col, Container } from "react-bootstrap";

import "../styles/patientRecordCard.css";

{
  /* <div className="view-record-content">
      <Card
        className="record-card"
        border="primary"
        // border="primary"
        //   style={{ width: "190px", margin: "20px 15px 0 0" }}
      >
        <Card.Header className="view-record-name">
          {props.recordName}
        </Card.Header>
        <Card.Body>
          <Card.Title>{props.date}</Card.Title>
          <Card.Text>{props.provider}</Card.Text>
          {props.viewButton}
        </Card.Body>
      </Card>
    </div> */
}

function PatientRecordCard(props) {
  return (
    <div className="record-card">
      <div className="record-name">{props.recordName}</div>
      <div className="record-date">{props.date}</div>
      <div className="record-provider">{props.provider}</div>
      <div className="view-record-btn">{props.viewButton}</div>
    </div>
  );
}

export default PatientRecordCard;
