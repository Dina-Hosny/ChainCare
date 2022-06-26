import React, { useState, useEffect } from "react";

import { Form, Button, Row, Col } from "react-bootstrap";

import {
  contractAddress,
  requestAccount,
  initContract,
} from "../../adapters/contractAPI";
import { ethers } from "ethers";

import { message, notification } from "antd";

export default function RevokePermission() {
  const [validated, setValidated] = useState(false);
  const [patientAddress, setPatientAddress] = useState("");
  const [revokedAddress, setRevokedAddress] = useState("");


  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);

    // ? 1. Determine address role (either provider or entity)
    // ? 2. Check this provider is granted Access
    // ? 3. Revoke account either entity or provider
  };
  return (
    <>
      <Row style={{ padding: "90px", boxShadow: "#e2fad6 5px 5px 5px 5px",backgroundColor:"#fafafa", }}>
        <h3>Revoke Records</h3>
        <Col sm={1}></Col>
        <Col>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="" controlId="validationCustom03">
                <Form.Label>Your Ethereum address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={patientAddress}
                  required
                  readOnly
                />
                <Form.Control.Feedback type="invalid">
                  Please provide your doctor ethereum address.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="" controlId="validationCustom03">
                <Form.Label>Revoke from Ethereum address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Revoke from ethereum address"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide an ethereum address to revoke.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            {/* <Row className="mb-3">
              <Form.Group as={Col} md="" controlId="validationCustom03">
                <Form.Label>Record Name</Form.Label>
                <Form.Control type="text" placeholder="record name" required />
                <Form.Control.Feedback type="invalid">
                  Please provide a record name.
                </Form.Control.Feedback>
              </Form.Group>
            </Row> */}

            <Button variant="primary" type="button" onClick={handleSubmit}>
              Revoke
            </Button>

            
          </Form>
        </Col>
        <Col sm={1}></Col>
      </Row>
    </>
  );
}
