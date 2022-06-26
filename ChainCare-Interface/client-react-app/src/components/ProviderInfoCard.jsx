import React, { useEffect, useState } from "react";

import { Container, Row, Col, Form } from "react-bootstrap";
import { ethers } from "ethers";
import Blockies from "react-blockies";

import { CgShutterstock } from "react-icons/cg";
import { FcPlus } from "react-icons/fc";
import { CopyOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import { Divider } from "antd";

import "../styles/providerInfoCard.css";

import { Drawer } from "antd";

import { List, message, Avatar, Spin } from "antd";

import InfiniteScroll from "react-infinite-scroller";

// import reqwest from "reqwest";

// import axios from "axios";

const fakeDataUrl =
  "https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo";

const { Paragraph } = Typography;

function AssignedPatientsList(props) {
  const [data, setData] = useState([
    {
      address: "0x686eBf10835212c16751a3716a38Cc15AB76B783",
    },
    {
      address: "0x686aBf10835212c16751a3716a38Cc15AB76B783",
    },
    {
      address: "0x686eBf10835212c16751a3716a38Cc15AB76B783",
    },
    {
      address: "0x686aBf10835212c16751a3716a38Cc15AB76B783",
    },
    {
      address: "0x686eBf10835212c16751a3716a38Cc15AB76B783",
    },
    {
      address: "0x686aBf10835212c16751a3716a38Cc15AB76B783",
    },
    {
      address: "0x686eBf10835212c16751a3716a38Cc15AB76B783",
    },
    {
      address: "0x686aBf10835212c16751a3716a38Cc15AB76B783",
    },
    {
      address: "0x686eBf10835212c16751a3716a38Cc15AB76B783",
    },
    {
      address: "0x686aBf10835212c16751a3716a38Cc15AB76B783",
    },
    {
      address: "0x686eBf10835212c16751a3716a38Cc15AB76B783",
    },
    {
      address: "0x686aBf10835212c16751a3716a38Cc15AB76B783",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // const fetchData = (callback) => {
  //   axios.get(fakeDataUrl).then((res) => callback(res.data));
  // };

  return (
    <div className="demo-infinite-container">
      <InfiniteScroll
        initialLoad={false}
        pageStart={0}
        hasMore={!loading && hasMore}
        useWindow={false}
      >
        {data.map((item) => (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                padding: "10px 0 0 0",
              }}
            >
              <Blockies seed={item.address} size={5} scale={8} />
              <span>{item.address}</span>{" "}
              <div>
                <button class="button-60" role="button">
                  <CgShutterstock
                    style={{ fontSize: "20px", margin: "5px", color: "red" }}
                  />
                  <span style={{ fontWeight: "bold" }}>Unassign</span>
                </button>
              </div>
            </div>
            <Divider />
          </>
        ))}
      </InfiniteScroll>
    </div>
  );
}

function AssignPatientsDrawer(props) {
  const [visible, setVisible] = useState(false);
  const [placement, setPlacement] = useState("right");

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onChange = (e) => {
    setPlacement(e.target.value);
  };

  return (
    <>
      <button class="button-33" role="button" onClick={showDrawer}>
        Assign Patients <FcPlus />
      </button>
      <Drawer
        title={<h3>Assign Patient</h3>}
        placement={placement}
        closable={false}
        onClose={onClose}
        visible={visible}
        width={720}
        key={placement}
      >
        <Form>
          <Row>
            <Col
              style={{
                boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
                padding: "40px",
              }}
            >
              <div>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="3">
                    Doctor Ethereum Addres
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                      type="text"
                      placeholder="0x686eBf10835212c16751a3716a38Cc15AB76B783"
                      readOnly
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="3">
                    Patient Ethereum Address
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control type="text" />
                  </Col>
                </Form.Group>

                <button
                  class="button-60"
                  style={{ color: "#1890FF", float: "right" }}
                >
                  {" "}
                  Assign
                </button>
              </div>
            </Col>
          </Row>
        </Form>

        <Divider></Divider>
        <h3>Assigned Patients</h3>
        <AssignedPatientsList />
      </Drawer>
    </>
  );
}

export default function ProviderInfoCard(props) {
  const [address, setAddress] = useState("");

  async function getUserData() {
    if (
      typeof window.ethereum !== "undefined" ||
      typeof window.web3 !== "undefined"
    ) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      setAddress(await signer.getAddress());
    }
  }

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="provider-card-container">
      <Row>
        <Col>
          {" "}
          <Blockies seed={address} size={8} scale={3} />{" "}
        </Col>
        <Col sm={8}>
          <Paragraph
            copyable={{
              text: address,
              icon: (
                <CopyOutlined />
                // style={{ fontSize: "35px", margin: "5px" }}
              ),
            }}
            style={{ fontSize: "12px" }}
          >
            {`${address.substring(0, 9)}...${address.substring(33, 42)}`}
          </Paragraph>
        </Col>
      </Row>
      <Row>
        <Col>
          {" "}
          <div class="provider-card-image">{props.image}</div>{" "}
        </Col>
      </Row>
      <Row>
        <Col>
          {" "}
          <div className="provider-name-dep">
            <p>{props.name} </p>
            {/* <p>{props.department} </p> */}
          </div>{" "}
        </Col>
      </Row>
      <Row>
        <Col style={{ margin: "20px" }}>
          <AssignPatientsDrawer />
        </Col>
      </Row>
    </div>
  );
}
