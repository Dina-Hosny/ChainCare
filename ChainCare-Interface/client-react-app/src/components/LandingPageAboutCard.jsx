import React from "react";

import { Row, Col } from "react-bootstrap";
import { FcInfo } from "react-icons/fc";
import { BsLink45Deg } from "react-icons/bs";

import { Divider } from "antd";

import "../styles/landingPageAboutCard.css";

function LandingPageAboutCard(props) {
  return (
    <div className="about-card-container">
      <FcInfo style={{ fontSize: "20px" }} />
      <Row>
        <Col>
          {" "}
          <div className="about-card-icon-container">{props.icon}</div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="about-card-title">{props.title}</div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="about-card-description">{props.description}</div>
        </Col>
      </Row>
      <Row>
        <Col>
          <Divider />
        </Col>
      </Row>
      <Row>
        <Col>
          <div>
            <a href={props.link} target="_blank" rel="noreferrer">
              <BsLink45Deg /> Learn More{" "}
            </a>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default LandingPageAboutCard;
