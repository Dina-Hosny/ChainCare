import React, { useState } from "react";

import { Form, Button, Row, Col } from "react-bootstrap";

export default function RequestAccess() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };
  return (
    <>
      <Row style={{ padding: "90px" }}>
        <h3 style={{color:"#57625f"}}>Request Access</h3>
        <Col sm={2}></Col>
        <Col>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="" controlId="validationCustom03" >
                <Form.Label>Patient's Ethereum Address</Form.Label>
                <Form.Control 
                  type="text"
                  placeholder="ethereum address" 
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide your patient ethereum address.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="" controlId="validationCustom03">
                <Form.Label>Doctor's Ethereum Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="ethereum address"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide your ethereum address.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Button variant="primary" type="button"  onClick={handleSubmit}>
              Request Access
            </Button>
          </Form>
        </Col>
        <Col sm={2}></Col>
      </Row>
    </>
  );
}
