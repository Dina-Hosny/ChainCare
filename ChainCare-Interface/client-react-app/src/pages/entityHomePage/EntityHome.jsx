import React from "react";

import { Switch, Route, useRouteMatch } from "react-router-dom";

import ActionPageLayout from "../../components/ActionPageLayout";
import ProtectedRoute from "../../components/Protected.route";
import PageNotFound from "../../components/PageNotFound";

import UserActions from "../../components/UserActions";

import VerifyIcon from "../../assets/images/verifyIcon.png";

import { FcInfo } from "react-icons/fc";
import { BsPersonBoundingBox } from "react-icons/bs";
import { RiProfileLine } from "react-icons/ri";
import { HiClipboardCopy } from "react-icons/hi";

import { Divider, Table } from "antd";
import { Modal, Button, Space } from "antd";

import Blockies from "react-blockies";

import QRCode from "react-qr-code";

import EntityProfile from "../../components/EntityProfile";

import { Select } from "antd";
import { Menu, Dropdown, message } from "antd";
import { DownOutlined } from "@ant-design/icons";

import { Empty } from "antd";
import { Container, Row, Col, Form } from "react-bootstrap";

import { Typography } from "antd";

const { Option } = Select;

const { Paragraph } = Typography;

const entityActions = [
  { id: 1, name: "Profile" },
  { id: 2, name: "View Shared Records" },
];

const onClick = ({ key }) => {
  message.info(`Click on item ${key}`);

  let data = {
    recordName: "Blood Test",
  };

  info(data);
};

const menu = (
  <Menu onClick={onClick}>
    <Menu.Item key="1">Blood Test</Menu.Item>
    <Menu.Item key="2">Preasure Test</Menu.Item>
    <Menu.Item key="3">Kidny Check</Menu.Item>
  </Menu>
);

function info(props) {
  return Modal.info({
    closable: true,
    width: 900,
    title: "",
    content: (
      <Container style={{ padding: "40px" }}>
        <Row>
          <Col>
            <div style={{ fontSize: "25px", fontWeight: "bold" }}>
              Electronic Health Record
            </div>
          </Col>
          <Col>
            <div style={{ textAlign: "right" }}>
              <img src={VerifyIcon} alt="verify-logo" />
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div>
              {" "}
              <span style={{ fontWeight: "bold" }}>Record name: </span>
              {props.recordName}
            </div>
          </Col>
          <Col>
            <div style={{ textAlign: "right" }}>signed by patient</div>
          </Col>
        </Row>
        <Row style={{ margin: "10px" }}>
          <Col>
            <div
              style={{
                boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
                borderRadius: "7px",
                backgroundColor: "#FAFAFA",
                textAlign: "center",
                padding: "20px",
              }}
            >
              <QRCode value="hey" size={200} />
            </div>
          </Col>
          <Col style={{ marginTop: "50px" }}>
            <Row>
              <Col>
                <div style={{ fontWeight: "bold" }}>Patient Address</div>
              </Col>
              <Col>
                <Paragraph
                  copyable={{
                    icon: <HiClipboardCopy style={{ fontSize: "20px" }} />,
                  }}
                >
                  <span>
                    {`${"0x686eBf10835212c16751a3716a38Cc15AB76B783".substring(
                      0,
                      6
                    )}...${"0x686eBf10835212c16751a3716a38Cc15AB76B783".substring(
                      36,
                      42
                    )}`}
                  </span>
                </Paragraph>
              </Col>
              <Divider />
            </Row>
            <Row>
              <Col>
                <div style={{ fontWeight: "bold" }}>Format</div>
              </Col>
              <Col>BASE1231</Col>
              <Divider />
            </Row>
            <Row>
              <Col>
                <div style={{ fontWeight: "bold" }}>Date</div>
              </Col>
              <Col>04/05/2021</Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col>
            <div style={{ fontWeight: "bold", margin: "20px" }}>
              Doctor Note
            </div>
          </Col>
        </Row>
        <Row>
          <Col style={{ margin: "20px" }}>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Control
                as="textarea"
                rows={10}
                placeholder="text"
                readOnly
              />
            </Form.Group>
          </Col>
        </Row>
      </Container>
    ),
    onOk() {},
  });
}

export default function EntityHome() {
  let match = useRouteMatch();

  let emptySection = <Empty />;
  let recordDropDown = (
    <Dropdown overlay={menu}>
      <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
        Records <DownOutlined />
      </a>
    </Dropdown>
  );

  const dataSource = [
    {
      key: "1",
      patient: (
        <div>
          <Blockies
            seed={"0x686eBf10835212c16751a3716a38Cc15AB76B783"}
            size={8}
            scale={3}
          />

          <span style={{ padding: "20px" }}>
            0x686eBf10835212c16751a3716a38Cc15AB76B783
          </span>
        </div>
      ),
      record: recordDropDown,
    },
    {
      key: "2",
      patient: (
        <div>
          <Blockies
            seed={"0x686aBf10835212c16751a3716a38Cc15AB76B783"}
            size={8}
            scale={3}
          />

          <span style={{ padding: "20px" }}>
            0x686aBf10835212c16751a3716a38Cc15AB76B783
          </span>
        </div>
      ),
      record: "Record 2",
    },
    {
      key: "3",
      patient: (
        <div>
          <Blockies
            seed={"0x686eBf10835212c12751a3716a38Cc15AB76B783"}
            size={8}
            scale={3}
          />

          <span style={{ padding: "20px" }}>
            0x686eBf10835212c12751a3716a38Cc15AB76B783
          </span>
        </div>
      ),
      record: "Record 3",
    },
    {
      key: "4",
      patient: (
        <div>
          <Blockies
            seed={"0x686eBf10835212e16751a3716a38Cc15AB76B783"}
            size={8}
            scale={3}
          />

          <span style={{ padding: "20px" }}>
            0x686eBf10835212e16751a3716a38Cc15AB76B783
          </span>
        </div>
      ),
      record: "Record 4",
    },
  ];

  const columns = [
    {
      title: (
        <span>
          <BsPersonBoundingBox /> Patient
        </span>
      ),
      dataIndex: "patient",
      key: "patient",
    },
    {
      title: (
        <span>
          <RiProfileLine /> Shared Records
        </span>
      ),
      dataIndex: "record",
      key: "record",
    },
  ];

  const tableOfData = (
    <div>
      <h3>Shared Records</h3>
      <Table dataSource={dataSource} columns={columns} />;
    </div>
  );

  return (
    <>
      <Switch>
        <ProtectedRoute exact path="/home/entityHome/Profile">
          <ActionPageLayout
            status={
              <p style={{ color: "green", fontSize: "18px" }}>
                <FcInfo /> You are logged in as entity
              </p>
            }
            actions={
              <UserActions
                actions={entityActions}
                userHome="/home/entityHome/"
              />
            }
            content={
              <EntityProfile
                fullname="Mohammed Fajer"
                hospital="Manchester Hospital"
                address="Hathersage Rd, Rusholme, Manchester M13 0JH"
                id="200123"
                expiration="01/05/2022"
              />
            }
          />
        </ProtectedRoute>
        <ProtectedRoute exact path="/home/entityHome/ViewSharedRecords">
          <ActionPageLayout
            status={
              <p style={{ color: "green", fontSize: "18px" }}>
                <FcInfo /> You are logged in as entity
              </p>
            }
            actions={
              <UserActions
                actions={entityActions}
                userHome="/home/entityHome/"
              />
            }
            content={tableOfData} // tables [user (blockie, address, clipboard), ]
          />
        </ProtectedRoute>
        <Route exact path={match.path}>
          <ActionPageLayout
            status={
              <p style={{ color: "green", fontSize: "18px" }}>
                <FcInfo /> You are logged in as entity
              </p>
            }
            actions={
              <UserActions
                actions={entityActions}
                userHome="/home/entityHome/"
              />
            }
            content={
              <EntityProfile
                fullname="Mohammed Fajer"
                hospital="Manchester Hospital"
                address="Hathersage Rd, Rusholme, Manchester M13 0JH"
                id="200123"
                expiration="01/05/2022"
              />
            }
          />
        </Route>
        <Route path="*" component={PageNotFound} />
      </Switch>
    </>
  );
}
