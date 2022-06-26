import React from "react";

import { useHistory } from "react-router";


import { Button, Row, Col } from "react-bootstrap";

export default function UserActions(props) {
  let history = useHistory();

  function handleClick(e) {
    history.push(`${props.userHome}${e.target.innerHTML.replace(/\s/g, "")}`);
  }

  return (
    <>
      {props.actions.map((action, index) => (
        <Row className="action-items" key={index}>
          <Col>
            <Button
              style={{ width: "100%", textAlign: "left",color:"#fafafa", }}
              size="lg"
              onClick={handleClick}
              variant="outline-success"
            >
              {action.name}
            </Button>
          </Col>
        </Row>
      ))}
    </>
  );
}
