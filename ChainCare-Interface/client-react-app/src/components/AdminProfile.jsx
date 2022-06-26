import React from "react";

import { Container, Row, Col, Form } from "react-bootstrap";
import { Divider } from "antd";

import { GrUserAdmin } from "react-icons/gr";
import { TiUser } from "react-icons/ti";
import { FaRegAddressCard, FaRegHospital } from "react-icons/fa";
import { MdPermIdentity } from "react-icons/md";

import { FcExpired } from "react-icons/fc";

import AdminImage from "../assets/images/admin-avatar.png";

function AdminProfile(props) {
  return (
    <Container>
      <Form>
        <Row>
          <Col>
            <div>
              <p
                style={{
                  fontSize: "25px",
                  fontWeight: "bold",
                  margin: "10px 0 0 0 ",
                  color:"#57625f",
                }}
              >
                Profile
              </p>
              <p style={{ color: "#16c79a" }}>Admin </p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col style={{ textAlign: "center" }}>
            <img src={AdminImage} alt="admin avatar" />
            <Divider style={{color:"57625f"}} >Admin</Divider>
            <p style={{ padding: "20px" ,color:"#57625f"}}>
              System Admin can assign patients to doctors, view doctors and
              unassign assigned patients if necessary.
            </p>
          </Col>
        </Row>
        <Row>
          <Col
            style={{
              boxShadow: "#e2fad6 5px 5px 5px 5px",
              padding: "40px",
            }}
          >
            <div>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                  Fullname
                </Form.Label>
                <Col sm="6" style={{ display: "flex" }}>
                  <Form.Control
                    type="text"
                    placeholder={props.fullname}
                    readOnly
                  />
                 <span>
                 <TiUser
                      style={{
                        margin: "10px",
                        fontSize: "22px",
                      }}
                      />
                 </span>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                  Hospital
                </Form.Label>
                <Col sm="6" style={{ display: "flex" }}>
                  <Form.Control
                    as="textarea"
                    placeholder={props.hospital}
                    readOnly
                  />
                  <span>
                    <FaRegHospital
                      style={{
                        margin: "10px",
                        fontSize: "22px",
                      }}
                    />
                  </span>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                  Address
                </Form.Label>
                <Col sm="6" style={{ display: "flex" }}>
                  <Form.Control
                    as="textarea"
                    placeholder={props.address}
                    readOnly
                  />
                  <span>
                    <FaRegAddressCard
                      style={{
                        margin: "10px",
                        fontSize: "22px",
                      }}
                    />
                  </span>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                  ID
                </Form.Label>
                <Col sm="6" style={{ display: "flex" }}>
                  <Form.Control type="text" placeholder={props.id} readOnly />
                  <span>
                    <MdPermIdentity
                      style={{
                        margin: "10px",
                        fontSize: "22px",
                      }}
                    />
                  </span>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                  Expiration
                </Form.Label>
                <Col sm="6" style={{ display: "flex" }}>
                  <Form.Control
                    type="text"
                    placeholder={props.expiration}
                    readOnly
                  />
                  <span>
                    <FcExpired
                      style={{
                        margin: "10px",
                        fontSize: "22px",
                      }}
                    />
                  </span>
                </Col>
              </Form.Group>
            </div>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default AdminProfile;
