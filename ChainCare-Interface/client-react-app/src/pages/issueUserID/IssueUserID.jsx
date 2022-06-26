import React, { useState } from "react";

import Layout from "../../components/Layout";
import MainContainer from "../../components/MainContainer";

import IssueDoctorCredentials from "./IssueDoctorCredentials";

import { useHistory } from "react-router-dom";

import { Container, Row, Col } from "react-bootstrap";

import { Steps, Button, message } from "antd";

import "../../styles/issueDoctorID.css";

import { Tabs } from "antd";
import IssueEntityCredentials from "./IssueEntityCredentials";

import { GiDoctorFace } from "react-icons/gi";
import { GrUserAdmin } from "react-icons/gr";

const { TabPane } = Tabs;

const { Step } = Steps;

function IssueIDTabs() {
  return (
    <>
      <Tabs tabPosition={"left"}>
        <TabPane
          tab={
            <span>
              <GiDoctorFace style={{ fontSize: "18px"  }} /> Doctors Registration
            </span>
          }
          key="1"
        >
          <IssueDoctorCredentials />
        </TabPane>
        <TabPane
          tab={
            <span>
              <GrUserAdmin style={{ fontSize: "18px" }} />Labs Registration
            </span>
          }
          key="2"
        >
          
          <IssueEntityCredentials />
        </TabPane>
      </Tabs>
    </>
  );
}

const steps = [
  
  {
    title: "Issue Users ID",
    content: <IssueIDTabs />,
  },
];

function IssueUserID() {
  let history = useHistory();
  const [current] = useState(0);


  const whenDone = () => {
    message.success("Processing complete!").then(() => {
      message.loading("returning home", 1.5).then(() => history.push("/"));
    });
  };

  return (
    <Layout>
      <MainContainer>
        <Container style={{ margin: "50px auto" }}>
          <Row>
            <Col>
              <div className="steps-content">{steps[current].content}</div>
              <div className="steps-action">
                {current === 0 && (
                  <Button
                    style={{ margin: "0 8px"  }}
                    onClick={() => history.push("/")}
                  >
                   <span className="span2"> Back Home </span>
                  </Button>
                )}
                {current === steps.length - 1 && (
                  <Button type="primary" onClick={whenDone} style={{ backgroundColor:"#16c79a"}}>
                   <span className="span1"> Done</span>
                  </Button>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </MainContainer>
    </Layout>
  );
}

export default IssueUserID;
