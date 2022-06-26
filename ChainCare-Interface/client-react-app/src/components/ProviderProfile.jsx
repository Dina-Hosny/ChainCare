import React from "react";

import { Container, Row, Col, Form } from "react-bootstrap";
import { Divider } from "antd";

import { BiUser } from "react-icons/bi";

import { FaRegHospital, FaRegAddressCard } from "react-icons/fa";

import { FcDepartment, FcOvertime } from "react-icons/fc";

import { GiRank3 } from "react-icons/gi";

import { IoIosCard } from "react-icons/io";

import ProviderImage from "../assets/images/provider-avatar.png";

function ProviderProfile(props) {
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
                  color: "#57625f",
                  
                }}
              >
                Profile
              </p>
              <p style={{ color: "#16c79a" }}>Doctor </p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col style={{ textAlign: "center" }}>
            <img src={ProviderImage} alt="patient avatar" />
            <Divider style={{color: "#57625f" }}>Doctor</Divider>
            <p style={{ padding: "20px",color: "#57625f" }}>
              Doctor can do any of the CRUD operation on patient records that
              granted doctor access, but other records created by other
              doctors are read only. Finally can request access from an
              ethereum patient account.
            </p>
          </Col>
        </Row>
        <Row>
          <Col
            style={{
              boxShadow: "#e2fad6 5px 5px 5px 5px",
              padding: "40px",
              backgroundColor:"#f7f7f7",
            }}
          >
            <div>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="3">
                  Hosptial
                </Form.Label>
                <Col sm="8" style={{ display: "flex" }}>
                  <Form.Control
                    type="text"
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
                <Form.Label column sm="3">
                  Fullname
                </Form.Label>
                <Col sm="8" style={{ display: "flex" }}>
                  <Form.Control
                    type="text"
                    placeholder={props.fullname}
                    readOnly
                  />
                  <span>
                    <BiUser
                      style={{
                        margin: "10px",
                        fontSize: "22px",
                      }}
                    />
                  </span>
                </Col>
              </Form.Group>
              {/* <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="3">
                  Address
                </Form.Label>
                <Col sm="8" style={{ display: "flex" }}>
                  <Form.Control
                    type="text"
                    placeholder={props.address}
                    readOnly
                  />
                  <span>
                    <FaRegAddressCard
                      style={{
                        margin: "10px",
                        fontSize: "22px",
                        color: "#1890FF",
                      }}
                    />
                  </span>
                </Col>
              </Form.Group> */}
              {/* <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="3">
                  Position
                </Form.Label>
                <Col sm="8" style={{ display: "flex" }}>
                  <Form.Control
                    type="text"
                    placeholder={props.position}
                    readOnly
                  />
                  <span>
                    <GiRank3
                      style={{
                        margin: "10px",
                        fontSize: "22px",
                        color: "#1890FF",
                      }}
                    />
                  </span>
                </Col>
              </Form.Group> */}
              {/* <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="3">
                  Department
                </Form.Label>
                <Col sm="8" style={{ display: "flex" }}>
                  <Form.Control
                    type="text"
                    placeholder={props.department}
                    readOnly
                  />
                  <span>
                    <FcDepartment
                      style={{
                        margin: "10px",
                        fontSize: "22px",
                        color: "#1890FF",
                      }}
                    />
                  </span>
                </Col>
              </Form.Group> */}
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="3">
                  ID
                </Form.Label>
                <Col sm="8" style={{ display: "flex" }}>
                  <Form.Control type="text" placeholder={props.id} readOnly />
                  <span>
                    <IoIosCard
                      style={{
                        margin: "10px",
                        fontSize: "22px",
                      }}
                    />
                  </span>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="3">
                  Expiration
                </Form.Label>
                <Col sm="8" style={{ display: "flex" }}>
                  <Form.Control type="text" placeholder={props.id} readOnly />
                  <span>
                    <FcOvertime
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

export default ProviderProfile;
