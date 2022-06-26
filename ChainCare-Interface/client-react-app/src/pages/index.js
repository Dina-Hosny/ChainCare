import React, { useState } from "react";
import HomeSection from "../components/HomeSection";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import { homeObjOne } from "../components/HomeSection/data";
import AboutSection from "../components/AboutSection";
import DemoSection from "../components/DemoSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer/index";
import Modal from "../components/Modal";
import { connectMetaMask, checkForWallet } from "../adapters/connectWallet";
import auth from "../adapters/auth";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Alert } from "react-bootstrap";

import {
  contractAddress,
  requestAccount,
  initContract,
} from "../adapters/contractAPI";

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

function InstallMetaMask(props) {
  return (
    <WalletBox>
      <Alert variant="warning">
        <p>You don't have MetaMask browser extension to use this app.</p>
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

  function checkUserRole() {

    let result = initContract();

    if(result != -1) {

      let signer = result.provider.getSigner();
      signer.getAddress()
      .then(address => {

        let Contract = result.contract;
        let patientRole = Contract.PATIENT_ROLE();
        let ownerRole = Contract.DEFAULT_ADMIN_ROLE();

    
        const checkRole = async () => {
          let isOwner =  await Contract.hasRole(ownerRole, address);
          let isPatient = await Contract.hasRole(patientRole, address);
          if (isOwner) {
            console.log("this account is the owner");
            auth.login(() => history.push("/home"));
          } else if (isPatient) {
            console.log("this account is a patient");
            auth.login(() => history.push("/home/patientHome"));
          } else {
            console.log("this account has no role");
            auth.login(() => history.push("/home/registerUsers"));
          }
        }

        checkRole();

      })
      .catch((err) => console.log(err.message));

    }
  }

  async function makeConnection() {
    connectMetaMask()
    .then((result) => {
      console.log(result);
      if (result.status == "success") {
        // checkUserRole();
        auth.login(() =>  history.push("/home/registerUsers"));
      }
    })
  }

  return (
    <WalletBox onClick={makeConnection}>
      <WalletImg src={props.walletImg} alt="metamask logo"></WalletImg>
      <WalletName>{props.walletName}</WalletName>
      <WalletDescription>{props.walletDescription}</WalletDescription>
    </WalletBox>
  );
}

const Home = () => {
  let history = useHistory();
  const [isOpen, setIsOpen] = useState(false);

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

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} connectOnClick={checkMetaMask} />
      <HomeSection {...homeObjOne} connectOnClick={checkMetaMask} />
      <AboutSection />
      <DemoSection />
      <ContactSection />
      <Footer />

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
    </>
  );
};
export default Home;
