import React from "react";

import "../styles/patientInfoCard.css";
import Blockies from "react-blockies";
import { Typography } from "antd";
import { CopyOutlined } from "@ant-design/icons";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  useHistory,
} from "react-router-dom";

const { Paragraph } = Typography;

function PatientInfoCard(props) {
  let match = useRouteMatch();
  let history = useHistory();

  function dynamicUserRoutes() {
    let path = `${match.path}/${props.firstname + props.lastname + props.id}`;
    // alert(path);
    history.push(path);
  }

  return (
    <div className="patient-card">
      <div className="patient-card-title">
        <p>
          {props.firstname} {props.lastname}
        </p>
      </div>
      <div className="patient-card-body">
        <Paragraph
          copyable={{
            text: props.address,
            icon: <CopyOutlined />,
          }}
          style={{ fontSize: "16px", }}
        >
          {`${props.address.substring(0, 9)}...`}
        </Paragraph>
        <p>
          {" "}
          <Blockies seed={props.address} size={5} scale={8} />
        </p>
        <button className="patient-card-button" onClick={dynamicUserRoutes}>
          View Records{" "}
        </button>
      </div>
    </div>
  );
}

export default PatientInfoCard;
