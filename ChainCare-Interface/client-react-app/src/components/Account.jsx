import React, { useEffect, useState } from "react";

import { Container, Row, Col } from "react-bootstrap";


import { ethers } from "ethers";

import styled from "styled-components";

import auth from "../adapters/auth";
import { useHistory } from "react-router-dom";

// import Identicon from "react-identicons";

import Blockies from "react-blockies";
// import { Avatar } from "antd";

import { CopyOutlined } from "@ant-design/icons";

import { Typography } from "antd";
const { Paragraph } = Typography;

const DisconnectBtn = styled.button`
  width: 120px;
  background-color:#16c79a;
  border-radius: 30px;
  margin-top: 10px;
  border: 1px solid lightgray;
  font-size: 18px;
  color: white;
  :hover {
    background-color:#16c79a;
    cursor: pointer;
    border-radius: 20px;
  }
`;



function Account(props) {
  let history = useHistory();
  const [userAddress, setUserAddress] = useState("");
  const [connectedToNet, setConnectedToNet] = useState("");
  const [userBalance, setUserBalance] = useState("");
  async function getUserData() {
    if (
      typeof window.ethereum !== "undefined" ||
      typeof window.web3 !== "undefined"
    ) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      await provider.send("eth_requestAccounts", []);

      switch (window.ethereum.chainId) {
        case "0x1":
          setConnectedToNet("Ethereum Main Network");
          break;
        case "0x3":
          setConnectedToNet("Ropsten Test Network");
          break;
        case "0x4":
          setConnectedToNet("Rinkeby Test Network");
          break;
        case "0x5":
          setConnectedToNet("Goerli Test Network");
          break;
        case "0x2a":
          setConnectedToNet("Kovan Test Network");
          break;
        case "0x539":
          setConnectedToNet("Localhost Local Network");
          break;
        default:
          break;
      }

      setUserAddress(await signer.getAddress());
      setUserBalance(ethers.utils.formatEther(await signer.getBalance()));

      // let n = await provider.getNetwork();
      // let name = n.name;
      // if (name === "homestead") setConnectedToNet("Ethereum Mainnet");
      // else {
      //   setConnectedToNet(
      //     `${name.charAt(0).toUpperCase() + name.slice(1)} Test Network`
      //   );
      // }
      // setUserBalance(ethers.utils.formatEther(await signer.getBalance()));
      // setUserAddress(await signer.getAddress());
    }
  }

  useEffect(() => {
    getUserData();
  }, []);

  function disconnect() {
    auth.logout(() => {
      history.push("/");
    });
  }

  return (
    <>
    <Container
      style={{
        margin: "20px auto 20px auto",
        padding: "20px",
        boxShadow: "rgba(33, 35, 38, 0.1) 0px 10px 10px -10px",
        backgroundColor: "rgb(97 195 170 / 29%)",
        borderRadius: "22px",
      }}
    >
      <Row>
        <Col>
          <p
            style={{
              fontSize: "20px",
              display: "flex",
              flexFlow: "column nowrap",
              color: "gray",
            }}
          >
            Connected to{" "}
            <span style={{ fontWeight: "bold" }}>{connectedToNet}</span>
          </p>
          <Row>
            <Col>{props.status}</Col>
          </Row>
        </Col>
        <Col>
          <Row>
            <Col style={{ textAlign: "right" }}>
              <Blockies seed={userAddress} size={5} scale={8} />
            </Col>
            <Col>
              {" "}
              <Paragraph
                copyable={{
                  text: userAddress,

                  icon: (
                    <CopyOutlined style={{  color:"#16c79a" }}/>
                    //style={{ fontSize: "35px", margin: "5px" }}
                  ),
                }}
                style={{ fontSize: "20px", color:"grey"}}
              >
                {`${userAddress.substring(0, 9)}...${userAddress.substring(
                  33,
                  42
                )}`}
              </Paragraph>
            </Col>
          </Row>
          <Row>
            <Col>
              <p
                style={{
                  textAlign: "right",
                  marginTop: "10px",
                  fontSize: "20px",
                  color: "grey",
                }}
              >
                {" "}
                ${userBalance}
              </p>
            </Col>
            <Col>
              <DisconnectBtn onClick={disconnect}>Logout</DisconnectBtn>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>

  
  </>
  );
}

export default Account;
