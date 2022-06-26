import React from "react";
import { FaEthereum } from "react-icons/fa";
import { Container, Row, Col } from "react-bootstrap";
import { Typography } from "antd";
import "../styles/header.css";
import styled from "styled-components";
import auth from "../adapters/auth";
import { useHistory } from "react-router-dom";



const DisconnectBtn = styled.button`
  width: 120px;
  background-color:#16c79a;
  border-radius: 30px;
  border: 1px solid lightgray;
  font-size: 18px;
  color: white;
  position: absolute;
  right: 130px;
  :hover {
    background-color:#16c79a;
    cursor: pointer;
    border-radius: 20px;
  }
`;

const { Title, Text } = Typography;

function Header() {
  let history = useHistory();
  function disconnect() {
    auth.logout(() => {
      history.push("/");
    });
  }
  return (
    <header>
      {" "}
      <Container className="header-container">
        <Row>
          <Col>
            <div className="header-appname">
              <span>
                <img  src='/Logo.png' alt="Logo" style={{ position:"relative", width:"30px", height:"40px",marginBottom:"5px" }}/>
              </span>
              <Title level={4} style={{ color: "#16c79a",fontSize:"20px", textAlign:"center",marginTop:"5px" }}>
                ChainCARE
              </Title>
            </div>
          </Col>
          <Col>
              <DisconnectBtn onClick={disconnect}>Logout</DisconnectBtn>
            </Col>
          <Col>
            <Title
              type="secondary"
              level={5}
              className="header-author"
              style={{ color: "#fff" }}
            >
              
            </Title>
          </Col>
        </Row>
      </Container>
    </header>
  );
}

export default Header;
