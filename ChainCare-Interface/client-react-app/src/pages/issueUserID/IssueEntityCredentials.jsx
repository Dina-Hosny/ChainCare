import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { DatePicker, message } from "antd";
import Modal from "../../components/Modal";
import QRCode from "react-qr-code";
import { openNotification } from "../../helpers/trinsicExchangeNotification";

import { boltonResearchInstituteIssueEntityID } from "../../adapters/trinsic";

const key = "updatable";

function IssueEntityCredentials(props) {
  const [fullname, setFullname] = useState("");
  const [association, setAssociation] = useState("");
  const [address, setAddress] = useState("");
  const [id, setID] = useState("");
  const [department, setDepartment] = useState("");
  const [expiration, setExpiration] = useState("");
  const [qrValue, setQRvalue] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showQR, setShowQR] = useState(false);

  function issueLoading() {
    message.loading({ content: "Loading...", key });
  }

  useEffect(() => {
    if (showQR && showModal) {
      message.success({ content: "Loaded!", key, duration: 2 });
    }
  }, [showQR, showModal]);

  async function issueID() {
    try {
      if (
        fullname !== "" &&
        association !== "" &&
        address !== "" &&
        id !== "" &&
        department !== "" &&
        expiration !== ""
      ) {
        let formData = {
          "Full Name": fullname,
          Association: association,
          Address: address,
          Id: id,
          Department: department,
          Expiration: expiration,
        };

        console.log(formData);
        issueLoading();

        let result;

        if (association.toLowerCase() === "bolton research institute") {
          console.log(
            "here i am about to issue bolton research institute entity id"
          );
          result = await boltonResearchInstituteIssueEntityID(formData);
          console.log("here is the result of the issue", result);

          setQRvalue(result.offerUrl);
          setShowQR(true);
          setShowModal(true);
          return;
        } else {
          setShowQR(false);
          setShowModal(false);
          message.info(
            "We can only issue credentials for 'bolton research institute'"
          );
          return;
        }
      } else {
        message.warning("Please fill in the form entries first!");
      }
    } catch (err) {
      openNotification();
    }
  }

  return (
    <>
      <Container>
        <Row md={4}>
          <Col></Col>
          <Col
            xs={6}
            style={{
              margin: "0 auto 50px auto",
              padding: "20px",
              width: "90%",
              boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
            }}
          >
            <Form>
              <h1>Labs Registration Form</h1>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextPassword"
              >
                <Form.Label column sm="2">
                  Full Name
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    placeholder="your name"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                  />
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextEmail"
              >
                <Form.Label column sm="2">
                  Association
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    placeholder="MIT University"
                    value={association}
                    onChange={(e) => setAssociation(e.target.value)}
                  />
                </Col>
              </Form.Group>

              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextPassword"
              >
                <Form.Label column sm="2">
                  Address
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    placeholder="Oxford Rd, Manchester M21 3RN"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                 Medical ID
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    placeholder="your id e.g., 1231451"
                    value={id}
                    onChange={(e) => setID(e.target.value)}
                  />
                </Col>
              </Form.Group>


              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                  Deparment
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    placeholder="Orthopaedics"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                  />
                </Col>
              </Form.Group>
             
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                  Expiration
                </Form.Label>
                <Col sm="2">
                  <DatePicker
                    type="text"
                    onChange={(data, dataString) => setExpiration(dataString)}
                  />
                </Col>
              </Form.Group>
              <Button
                variant="primary"
                size="sm"
                style={{
                  borderRadius: "12px",
                  padding: "10px",
                  fontSize: "18px",
                  
                }}
                onClick={issueID}
              >
               Register
              </Button>
            </Form>
          </Col>
          <Col></Col>
        </Row>
        {showQR && showModal && (
          <Modal showModal={showModal} setShowModal={setShowModal}>
            <Container>
              <h4>Scan this code to accept a connectionless credential</h4>
              <Row style={{ margin: "40px" }}>
                <Col></Col>
                <Col>
                  {" "}
                  <div style={{ padding: "20px" }}>
                    <QRCode value={qrValue} />
                  </div>
                </Col>
                <Col></Col>
              </Row>
            </Container>
          </Modal>
        )}
      </Container>
    </>
  );
}
export default IssueEntityCredentials;
