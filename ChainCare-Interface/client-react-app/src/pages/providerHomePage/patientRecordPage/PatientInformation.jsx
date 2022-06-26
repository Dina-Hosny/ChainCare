import React from "react";

import { useHistory } from "react-router";
import { Button, Row, Col } from "react-bootstrap";

import { LeftCircleOutlined, CopyOutlined } from "@ant-design/icons";
import Blockies from "react-blockies";
import { Empty } from "antd";
import PatientRecordCard from "../../../components/PatientRecordCard";

import "../../../styles/patientInformation.css";
import { Typography } from "antd";
const { Paragraph } = Typography;

export default function PatientInformation(props) {
  let history = useHistory();
  const returnToPatients = () => {
    history.push("/home/providerHome/AssignedPatients/");
  };
  return (
    <>
      <Row>
        <Col>
          <span>
            <LeftCircleOutlined
              className="go-back-icon"
              onClick={returnToPatients}
            />
          </span>
          <span className="go-back-text">Go back</span>
        </Col>
      </Row>
      <Row className="record-status-text">
        <Col>You are viewing the records of the following patient</Col>
      </Row>
      <Row className="record-info-row">
        <Col sm={2}>
          <p className="record-blockie">
            <Blockies seed={props.user.address} size={5} scale={8} />
          </p>
        </Col>
        <Col sm={3}>
          <span className="record-user-name">
            {props.user.firstname} {props.user.lastname}
          </span>
        </Col>
        <Col>
          <Paragraph
            copyable={{
              text: props.user.address,
              icon: <CopyOutlined style={{ fontSize: "18px" }} />,
            }}
          >
            <span className="record-user-address">
              {`${props.user.address.substring(0, 9)}...`}
            </span>
          </Paragraph>
        </Col>
        <Col>
          {" "}
          <button className="create-record-btn" onClick={props.handleCreateBtn} style={{backgroundColor:"#16c79a"}}>
            Create new Record
          </button>
        </Col>
      </Row>
      <Row>
        <Col>
          <div>
            <p className="patient-records-text">Patient Records</p>
            <input
              placeholder="Search by record name"
              className="patient-records-search-input"
              onChange={props.searchRecordsByName}
            />
          </div>

          <div style={{ display: "flex", flexFlow: "row wrap" }}>
            {props.records.length > 0 ? (
              props.records.map((record, index) => (
                <PatientRecordCard
                  recordName={record.recordName}
                  date={record.date}
                  provider={record.provider}
                  key={record.id}
                  id={record.id}
                  viewButton={
                    <Button
                      variant="primary"
                      onClick={() => props.handleViewRecord(record)}
                    >
                      View
                    </Button>
                  }
                />
              ))
            ) : (
              <div className="patient-empty">
                <Empty />
              </div>
            )}
          </div>
        </Col>
      </Row>
    </>
  );
}
