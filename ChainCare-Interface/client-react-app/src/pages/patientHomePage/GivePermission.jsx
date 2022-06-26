import React, { useState, useEffect } from "react";

import { Form, Button, Row, Col } from "react-bootstrap";
import AccessNotification from "../../components/AccessNotification";



import { message, notification } from "antd";

import AccessPermissionType from "../../components/AccessPermissionType";


import styled from "styled-components";

const BtnContainer = styled.div``;





export default function GivePermission() {
  const [validated, setValidated] = useState(false);
  const [patientAddress, setPatientAddress] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");


  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);

    console.log(recipientAddress);
  };

  function handleMenuClick(e) {
    message.info("Click on menu item.");
  }
  

  return (
    <>
      <Row style={{ padding: "90px",boxShadow: "#e2fad6 5px 5px 5px 5px",backgroundColor:"#fafafa" }}>
        <h3>Give Permission</h3>
        <Col sm={1}></Col>
        <Col sm={11}>
          <Form noValidate validated={validated} onSubmit={handleSubmit} >
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Recipient Ethereum Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="ethereum address"
                  onChange={(e) => setRecipientAddress(e.target.value)}
                  value={recipientAddress}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide your doctor ethereum address.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Patient's Ethereum Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={patientAddress}
                  required
                  readOnly
                />
                <Form.Control.Feedback type="invalid">
                  Please provide your ethereum address.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            

            <Row>
              <Col sm={3}>
                <Button variant="primary" type="button" onClick={handleSubmit}>
                Give Permission
                </Button>
              </Col>
              <Col sm={9}> <AccessPermissionType handleClick={handleMenuClick}/> </Col>
            </Row>
          </Form>
        </Col>
        <Col sm={1}></Col>
      </Row>
      <Row style={{ padding: "90px" }}>
        <h3>Notification</h3>
        <Col sm={1}></Col>
        <Col sm={12}>
          <AccessNotification accessType="Full Access" />
          <AccessNotification accessType="Read Only"/>
          <AccessNotification accessType="Write Only"/>
          <AccessNotification accessType="Full Access" />
          <AccessNotification accessType="Read Only"/>
          <AccessNotification accessType="Write Only"/>
          <AccessNotification accessType="Full Access"/>
        </Col>
        <Col sm={1}></Col>
      </Row>
    </>
  );
}
