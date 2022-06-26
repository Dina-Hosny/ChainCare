import React from "react";
import { useHistory } from "react-router-dom";

import { LeftSquareOutlined } from "@ant-design/icons";
import { Col } from "react-bootstrap";

export default function GoBackBtn(props) {
  let history = useHistory();

  return (
    <Col
      style={{
        display: "flex",
        alignItems: "flex-end",
      }}
    >
      <span
        style={{
          fontSize: "30px",
          flexGrow: "0.1",
          textAlign: "center",
          cursor: "pointer",
          color:"#57625f",
        }}
        onClick={() => history.push(props.path)}
      >
        <LeftSquareOutlined />
      </span>
      <span
        style={{
          flexGrow: "1",
          fontSize: "20px",
          fontWeight: "500",
          color: "#57625f",
        }}
      >
        Go Back
      </span>
    </Col>
  );
}
