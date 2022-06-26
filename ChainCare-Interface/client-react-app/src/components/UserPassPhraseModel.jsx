import React, { useEffect, useState } from "react";


import Modal from "./Modal";
import styled from "styled-components";

import randomWords from "random-words";

import { Checkbox } from "antd";

const UserpassphraseContainer = styled.div`
  @media screen and (max-width: 768px) {
    padding: 100px 0;
  }
  font-family: "Montserrat", sans-serif;
`;

const UserpassphraseWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 50px;
  flex-direction: column;
  box-sizing: border-box;
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: bold;

  text-align: center;
  margin: 0 200px;
`;

const Row1 = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  margin: 20px 0;
`;

const Row1Text = styled.h2`
  font-size: 24px;
  font-weight: bold;
  flex-grow: 2;
`;

const Row1LinksContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-grow: 1;
`;

const Row1SelectedLink = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #16c79a;

  border-bottom: 5px solid #16c79a;

  :hover {
    cursor: pointer;
  }
`;

const Row1Link = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.4);
  :hover {
    cursor: pointer;
  }
`;

const Row2 = styled.div`
  display: flex;
  flex-flow: row nowrap;
  background: rgba(128, 128, 128, 0.05);
  width: 100%;

  align-items: center;
  align-self: center;
  padding: 10px;
`;

const Row2Text = styled.p`
  font-size: 20px;

  padding: 20px;
  width: 700px;
`;

const Row2Btn = styled.button`
  align-items: center;
  appearance: button;
  background-color: #16c79a;
  border-radius: 8px;
  border-style: none;
  box-shadow: rgba(255, 255, 255, 0.26) 0 1px 2px inset;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  flex-shrink: 0;

  font-size: 24px;
  line-height: 1.15;
  margin: 0;
  padding: 10px 21px;
  text-align: center;
  text-transform: none;
  transition: color 0.13s ease-in-out, background 0.13s ease-in-out,
    opacity 0.13s ease-in-out, box-shadow 0.13s ease-in-out;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;

  :active {
    background-color: #16c79a;
  }

  :hover {
    background-color: #16c79a;
  }
`;

const Row3 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
  border-radius: 20px;
  margin-top: 40px;
  padding: 20px;
  margin-bottom: 40px;
`;

const Row3Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
`;

const Row3Text = styled.p`
  font-size: 20px;
  width: 700px;
  line-height: 150%;
  text-align: center;
`;

const Row3CheckBoxText = styled.div`
  padding: 10px 40px;
  font-size: 20px;
`;

const Row4NextBtn = styled.button`
  align-items: center;
  background-color: #16c79a;
  border: 2px solid #16c79a;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-flex;
  fill: #16c79a;

  font-size: 22px;
  font-weight: 600;
  width: 100%;
  height: 48px;
  justify-content: center;
  letter-spacing: -0.8px;
  line-height: 24px;
  min-width: 140px;
  outline: 0;
  padding: 0 17px;
  text-align: center;
  text-decoration: none;
  transition: all 0.3s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  border-radius: 20px;

  :focus {
    color: #16c79a;
  }

  :hover {
    background-color: #16c79a;
    border-color: #16c79a;
    fill: #16c79a;
  }

  :active {
    background-color: #16c79a;
    border-color: #16c79a;
    fill: #16c79a;
  }

  @media (min-width: 768px) {
    min-width: 170px;
  }

  :disabled,
  [disabled] {
    border: 1px solid #999999;
    background-color: #cccccc;
    color: #666666;
  }
`;

const InputPhrase = styled.textarea`
  border: none;
  height: 120px;
  width: 100%;
  resize: none;
  font-size: 20px;
  padding: 20px;
`;



export default function UserPassPhraseModel(props) {
  const [showModal, setShowModal] = useState(false);

  const [nextButtonEnable, setNextButtonEnable] = useState(false);

  const [copyValue, setCopyValue] = useState("Copy");

  const [generatedPassphrase, setGeneratedPassphrase] = useState("");
  const [inputPassphrase, setInputpassphrase] = useState("");

  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    console.log(index);

    if (index === 1) {
      generatePhrase();
    }

    setToggleState(index);
  };

  useEffect(() => {
    let rws = randomWords(16).toString();
    rws = rws.replace(/,/g, " ");

    setGeneratedPassphrase(rws);
  }, []);

  function generatePhrase() {
    let rws = randomWords(16).toString();
    rws = rws.replace(/,/g, " ");
    setGeneratedPassphrase(rws);
  }

  function onChange(e) {
    console.log(`checked = ${e.target.checked}`);
    setNextButtonEnable(e.target.checked);
  }

  function handleCopy() {
    setCopyValue("Copied");

    var successful = document.execCommand("copy");
    var msg = successful ? "successful" : "unsuccessful";
    console.log("Copying text command was " + msg);

    navigator.clipboard.writeText(generatedPassphrase);

    setTimeout(() => {
      setCopyValue("Copy");
    }, 2000);
  }

  return (
    <div>
      <Modal showModal={props.showModal} setShowModal={props.setShowModal}>
        <UserpassphraseContainer>
          <UserpassphraseWrapper>
            <Title>Encryption Passphrase</Title>
            <Row1>
              <Row1Text>Passphrase</Row1Text>
              <Row1LinksContainer>
                {toggleState === 1 ? (
                  <>
                    <Row1SelectedLink onClick={() => toggleTab(1)}>
                      Generate Phrase
                    </Row1SelectedLink>
                    <Row1Link onClick={() => toggleTab(2)}>
                      Enter Phrase
                    </Row1Link>
                  </>
                ) : (
                  <>
                    <Row1Link onClick={() => toggleTab(1)}>
                      Generate Phrase
                    </Row1Link>
                    <Row1SelectedLink onClick={() => toggleTab(2)}>
                      Enter Phrase
                    </Row1SelectedLink>
                  </>
                )}
              </Row1LinksContainer>
            </Row1>
            <Row2>
              {toggleState === 1 ? (
                <>
                  <Row2Text>{generatedPassphrase}</Row2Text>
                  <Row2Btn onClick={handleCopy}>{copyValue}</Row2Btn>
                </>
              ) : (
                <InputPhrase
                  value={inputPassphrase}
                  onChange={(e) => setInputpassphrase(e.target.value)}
                />
              )}
            </Row2>
            <Row3>
              <Row3Title>Save your Encryption Passphrase</Row3Title>
              <Row3Text>
                You’’ll need this passphrase to access data in your future. This
                is the only time it will be displayed. Be sure to write it down.
              </Row3Text>{" "}
              <Checkbox onChange={onChange}>
                <Row3CheckBoxText>
                  Yes, I write this down or saved it somewhere.
                </Row3CheckBoxText>
              </Checkbox>
            </Row3>
            {nextButtonEnable ? (
              <Row4NextBtn onClick={() => {
                  if(toggleState == 1) {
                    props.getPhrase(generatedPassphrase);
                  } else {
                      props.getPhrase(inputPassphrase)
                  }
              }}>Next</Row4NextBtn>
            ) : (
              <Row4NextBtn disabled>Next</Row4NextBtn>
            )}
          </UserpassphraseWrapper>
        </UserpassphraseContainer>
      </Modal>
      
    </div>
  );
}
