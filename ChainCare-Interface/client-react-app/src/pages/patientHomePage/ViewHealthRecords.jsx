import React, { useState, useEffect } from "react";

import { Form, Button, Row, Col } from "react-bootstrap";

import { Empty, Modal } from "antd";
import PatientRecordCard from "../../components/PatientRecordCard";



export default function ViewHealthRecords(props) {
  const [visible, setVisible] = useState(false);
  const [viewOption, setViewOption] = useState(true);
  const [recordHashes, setRecordHashes] = useState([]);

  const noData = (
    <>
      <Row>
        <Col style={{ height: "200px" }}></Col>
      </Row>
      <Row>
        <Col>
          <Empty />
        </Col>
      </Row>
      <Row>
        <Col></Col>
      </Row>
    </>
  );

  return (
    <>
      {viewOption ? (
        <>
          <Row style={{ padding: "40px 5px" }}>
            <Col>
              <h3 style={{color:"gray"}}>View Health Records</h3>
              <div style={{ display: "flex", flexFlow: "row wrap"}}>
                <PatientRecordCard
                  recordName="Blood Test 1"
                  date="15-5-2022"
                  viewButton={
                    <Button  type="primary" onClick={() => setVisible(true)} style={{backgroundColor:"#b3f4cb", color:"#4caf50", borderRadius:"20px"}}>
                      View
                    </Button>
                  }
                  provider="Manchester Hosptial"
                />
                <PatientRecordCard
                  recordName="Blood Test 1"
                  date="15-5-2022"
                  viewButton={
                    <Button type="primary" onClick={() => setVisible(true)} style={{backgroundColor:"#b3f4cb", color:"#4caf50", borderRadius:"20px"}}>
                      View
                    </Button>
                  }
                  provider="Manchester Hosptial"
                />
                <PatientRecordCard
                  recordName="Blood Test 1"
                  date="15-5-2022"
                  viewButton={
                    <Button type="primary" onClick={() => setVisible(true)} style={{backgroundColor:"#b3f4cb", color:"#4caf50",  borderRadius:"20px"}}>
                      View
                    </Button>
                  }
                  provider="Manchester Hosptial"
                />
                <PatientRecordCard
                  recordName="Blood Test 1"
                  date="15-5-2022"
                  viewButton={
                    <Button type="primary" onClick={() => setVisible(true)} style={{backgroundColor:"#b3f4cb", color:"#4caf50", borderRadius:"20px"}}>
                      View
                    </Button>
                  }
                  provider="Manchester Hosptial"
                />
                <PatientRecordCard
                  recordName="Blood Test 1"
                  date="15-5-2022"
                  viewButton={
                    <Button type="primary" onClick={() => setVisible(true)} style={{backgroundColor:"#b3f4cb", color:"#4caf50", borderRadius:"20px"}}>
                      View
                    </Button>
                  }
                  provider="Manchester Hosptial"
                />
              </div>
            </Col>
          </Row>

          <Modal
            centered
            visible={visible}
            onOk={() => setVisible(false)}
            onCancel={() => setVisible(false)}
            width={1000}
          >
            <Form style={{ padding: "20px" }}>
              <h1>Record Found</h1>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                  Patient Name
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    placeholder="Mohammed Fajer"
                    readOnly
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                  Record Name
                </Form.Label>
                <Col sm="10">
                  <Form.Control type="text" placeholder="Test 1" readOnly />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                  Provider
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    placeholder="Manchester Hospital"
                    readOnly
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                  Date
                </Form.Label>
                <Col sm="10">
                  <Form.Control type="text" placeholder="20-5-2021" readOnly />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                  Patient Address
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    placeholder="0x897Fd668E8adfF344D52104A699187096aD17645"
                    readOnly
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                  Doctor's Address
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    placeholder="0x897Fd668E8adfF344D52104A699187096aD17645"
                    readOnly
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                  Doctor's Note
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    placeholder="Mohammed Fajer"
                    readOnly
                    as="textarea"
                    rows={10}
                  />
                </Col>
              </Form.Group>
            </Form>
          </Modal>
        </>
      ) : (
        noData
      )}
    </>
  );
}
