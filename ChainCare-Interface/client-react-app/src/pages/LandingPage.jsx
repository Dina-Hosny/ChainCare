import React, { useState } from "react";

import Modal from "../components/Modal";
import Layout from "../components/Layout";
import MainContainer from "../components/MainContainer";

import { connectMetaMask, checkForWallet } from "../adapters/connectWallet";
import auth from "../adapters/auth";

import { Container, Row, Col, Button, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import LandingPageImage from "../assets/images/landingPageImg.png";
import ImagePlaceHolder from "../assets/images/imagePlaceHolder.png";

import { FaCubes, FaCreditCard } from "react-icons/fa";
import { FcInfo } from "react-icons/fc";
import { BsLink45Deg } from "react-icons/bs";
import { SiIpfs } from "react-icons/si";

import { Space } from "antd";

import { Divider } from "antd";

import "../styles/landingpage.css";
import LandingPageAboutCard from "../components/LandingPageAboutCard";

const WalletBox = styled.div`
  margin: 50px;
  width: 400px;
  :hover {
    background-color: #f8f8f8;
    cursor: pointer;
    border-radius: 20px;
  }
`;

const WalletImg = styled.img`
  width: 100px;
  height: 100px;
  display: block;
  margin-left: auto;
  margin-right: auto;
`;

const WalletName = styled.h3`
  text-align: center;
`;

const WalletDescription = styled.p`
  text-align: center;
`;

function HomeInfo(props) {
  let history = useHistory();
  return (
    <Container className="main-container">
      <Row>
        <Col className="home-section-text">
          <Row>
            <Col>
              <div className="home-section-text-title ">
                Electronic Health Record
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div>
                <p className="home-section-text-subtitle">
                  powered by ethereum blockchain technology
                </p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div>
                <Space size={8}>
                  <button
                    className="button-37"
                    style={{ fontSize: "22px", fontWeight: "bold" }}
                    onClick={props.connectOnClick}
                  >
                    Connect
                  </button>
                  <button
                    className="button-37"
                    style={{
                      backgroundColor: "#1890FF",
                      border: "none",
                      fontSize: "22px",
                      fontWeight: "bold",
                    }}
                    onClick={() => history.push("/issueUserID")}
                  >
                    Issue User ID
                  </button>
                </Space>
              </div>
            </Col>
          </Row>
        </Col>
        <Col style={{ margin: "20px" }}>
          <div>
            <img src={LandingPageImage} alt="ethereum-network" />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

function AboutSection(props) {
  return (
    <>
      <Container className="about-section-text">
        <Row>
          <Col>
            <Divider>
              <h3>About</h3>
            </Divider>
            <p className="about-section-description">
              The main technologies used for creating this application.
            </p>
          </Col>
        </Row>
      </Container>
      <Container className="about-section-card-container">
        <LandingPageAboutCard
          icon={<FaCubes className="about-card-icon" />}
          title={<p>BLOCKCHAIN TECHNOLOGY</p>}
          description={
            <p>
              (BCT) Providing a public distributed and decentralised ledger
              governed by smart contracts for assets management and security.
            </p>
          }
          link="https://ethereum.org/en/"
        />

        <LandingPageAboutCard
          icon={<SiIpfs className="about-card-icon" />}
          title={<p>INTERPLANETART FILE SYSTEM</p>}
          description={
            <p>
              (IPFS) Distributed and dencetralised peer-to-peer file system
              relies on cryptography and content-addressing for data storage.
            </p>
          }
          link="https://ipfs.io/"
        />

        <LandingPageAboutCard
          icon={<FaCreditCard className="about-card-icon" />}
          title={<p>SELF-SOVEREIGN IDENTIY</p>}
          description={
            <p>
              (Trinsic) is a digital blockchain based verifiable data exchange
              platform between issuers, holders and verifiers of credentials.
            </p>
          }
          link="https://trinsic.id/"
        />
      </Container>
    </>
  );
}

function InstallMetaMask(props) {
  return (
    <WalletBox>
      <Alert variant="warning">
        <p>You dont have MetaMask browser extension to use this app.</p>
        <Alert.Link href="https://metamask.io/" target="_blank">
          Here
        </Alert.Link>{" "}
        you can install the chrome/firefox browser extension.
      </Alert>
    </WalletBox>
  );
}

function MetaMaskConnect(props) {
  // ? connect to metamask and redirect to homepage

  let history = useHistory();

  async function makeConnection() {
    connectMetaMask()
      .then((result) => {
        console.log(result.status);
        if (result.status === "success") {
          auth.login(() => history.push("/home"));
        }
      })
      .catch((err) => console.log(err.message));
  }

  return (
    <WalletBox onClick={makeConnection}>
      <WalletImg src={props.walletImg} alt="metamask logo"></WalletImg>
      <WalletName>{props.walletName}</WalletName>
      <WalletDescription>{props.walletDescription}</WalletDescription>
    </WalletBox>
  );
}

function LandingPage() {
  let history = useHistory();

  const [showModal, setShowModal] = useState(false);
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);

  function checkMetaMask() {
    if (checkForWallet()) {
      setIsMetaMaskInstalled(true);
    } else {
      setIsMetaMaskInstalled(false);
    }

    setShowModal(true);
  }

  return (
    <Layout>
      <MainContainer>
        <HomeInfo connectOnClick={checkMetaMask} />
        <AboutSection />

        <Modal showModal={showModal} setShowModal={setShowModal}>
          {isMetaMaskInstalled ? (
            <MetaMaskConnect
              walletImg="https://cdn.iconscout.com/icon/free/png-512/metamask-2728406-2261817.png"
              walletName="MetaMask"
              walletDescription="Connect to your MetaMask Wallet"
            />
          ) : (
            <InstallMetaMask />
          )}
        </Modal>
      </MainContainer>
    </Layout>
  );
}

export default LandingPage;
