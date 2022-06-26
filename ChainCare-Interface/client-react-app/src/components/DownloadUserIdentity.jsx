import React, { useState } from "react";

import Modal from "./Modal";

import DownloadIdentity from "./DownloadIdentity";

import styled from "styled-components";
import QRCode from "react-qr-code";

const IdentityContainer = styled.div`
  @media screen and (max-width: 768px) {
    padding: 100px 0;
  }
`;

const IdentityWrapper = styled.div`
  display: flex;
  /* height: 500px; */
  width: 100%;
  padding: 50px 50px;
  flex-direction: column;
  box-sizing: border-box;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const IdentityTitle = styled.h1`
  font-size: 34px;
  text-align: center;
  font-weight: bold;
  font-family: "Montserrat", sans-serif;
`;

const SubtitleContainer = styled.div`
  display: flex;
  padding: 20px;
`;

const IdentitySubtitle = styled.p`
  font-size: 16px;
  font-family: "Montserrat", sans-serif;
`;

const IdentityBodyContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  /* align-items: center; */
  padding: 20px;
`;

const IdentityContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  flex-grow: 1;
`;
const IdentityQRcontainer = styled.div`
  /* background-color: grey; */
  flex-grow: 1;
  justify-content: center;
  align-items: flex-start;
  padding-top: 60px;
  text-align: center;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: bolder;
`;

const TextArea = styled.textarea`
  width: 90%;

  padding: 8px;
  margin: 10px 0;
  outline: none;
  border: none;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 5px 0px,
    rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
  resize: none;
  &:focus {
    outline: none;
  }
  color: #7c7c7c;
  line-height: 25px;
`;

export default function DownloadUserIdentity(props) {
  return (
    <div>
      {props.showModal && (
        <Modal showModal={props.showModal} setShowModal={props.setShowModal}>
          <IdentityContainer>
            <IdentityWrapper>
              <TitleContainer>
                <IdentityTitle>New User Identity</IdentityTitle>
              </TitleContainer>
              <SubtitleContainer>
                <IdentitySubtitle>
                  keep the following keys safe, later may be used for data
                  encryption, decryption and access control
                </IdentitySubtitle>
              </SubtitleContainer>
              <IdentityBodyContainer>
                <IdentityContentContainer>
                  <div>
                    <Label>Public Key</Label>
                  </div>
                  <div>
                    <TextArea rows={4} type="text" placeholder={props.pubK} />
                  </div>
                  <div>
                    <Label>Private Key</Label>
                  </div>
                  <div>
                    <TextArea rows={2} type="text" placeholder={props.priK} />
                  </div>
                  <div>
                    <Label>Symmetric Key</Label>
                  </div>
                  <div>
                    <TextArea rows={2} type="text" placeholder={props.symmK} />
                  </div>

                  <DownloadIdentity
                    pubK={props.pubK}
                    priK={props.priK}
                    symmK={props.symmK}
                    callback={props.callback}
                  />
                </IdentityContentContainer>

                <IdentityQRcontainer>
                  <QRCode
                    value={{
                      publicKey: props.pubK,
                      privateKey: props.priK,
                      symmetricKey: props.symmK,
                    }}
                  />
                </IdentityQRcontainer>
              </IdentityBodyContainer>
            </IdentityWrapper>
          </IdentityContainer>
        </Modal>
      )}

      {/* <button
        onClick={() => {
          console.log("here");
          console.log(showModal);
          setShowModal(true);
          console.log(showModal);
        }}
      >
        Show Modal{" "}
      </button> */}
    </div>
  );
}
