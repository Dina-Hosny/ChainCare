import React, { useState } from "react";
import styled from "styled-components";

import { message, Modal } from "antd";
import SVG2 from "../../assets/images/contact.svg";

import { init } from "emailjs-com";

import emailjs from "emailjs-com";

import {
  ContactSectionContainer,
  ContactSectionWrapper,
  ImageSection,
  ContactFormSection,
  FormImage,
  FormTitle,
} from "./ContactElements";

const SendBtn = styled.button`
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
  font-family: "RM Neue", sans-serif;
  font-size: 100%;
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

  &:active {
    background-color: #16c79a;
  }

  &:hover {
    background-color: #16c79a;
  }
`;

const TextInput = styled.input`
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 2px;
  background-color: rgba(237, 236, 236, 0.1);
  padding: 10px;
  margin: 10px 0;
`;

const TextArea = styled.textarea`
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 2px;
  background-color: rgba(237, 236, 236, 0.1);
  padding: 20px;
  margin: 10px 0;
`;

init("user_82fzaUvfE6abBKVHWMknR");
export default function ContactSection() {
  const [name, setName] = useState();
  const [emailMessage, setMessage] = useState();
  const [email, setEmail] = useState();

  function errorModal() {
    Modal.error({
      title: "This is an error message",
      content: `${email} is not a valid email. Please enter a valid email and try again.`,
    });
  }

  function validEmail(email) {
    var filter =
      /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
    return String(email).search(filter) !== -1;
  }

  const success = () => {
    message.success("This is a valid email. The email has been send.");
  };

  const error = () => {
    message.error("Please enter valid email");
  };

  function sendEmail(e) {
    e.preventDefault();

    console.log({
      n: name,
      m: emailMessage,
      e: email,
    });

    if (!validEmail(email)) {
      errorModal();
    }

    emailjs
      .sendForm(
        "service_3h1ngap",
        "template_o7pryds",
        e.target,
        "user_82fzaUvfE6abBKVHWMknR"
      )
      .then(
        (result) => {
          console.log(result.text);
          success();
        },
        (error) => {
          console.log(error.text);
          error(error.text);
        }
      );
  }

  const onSubmit = (event) => {
    event.preventDefault();
    console.log({
      n: name,
      m: emailMessage,
      e: email,
    });

    if (!validEmail(email)) {
      errorModal();
    } else {
      // message.success("This is a valid email");
      success();
    }
  };

  return (
    <ContactSectionContainer id="contact">
      <ContactSectionWrapper>
        <ImageSection>
          <FormImage src={SVG2} alt="contact" />
        </ImageSection>
        <ContactFormSection>
          <FormTitle>Contact Us</FormTitle>
        
          <form onSubmit={sendEmail}>
            <TextInput
              name="name"
              type="text"
              placeholder="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <TextInput
              name="email"
              type="text"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextArea
              name="message"
              type="text"
              placeholder="message"
              value={emailMessage}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
            <SendBtn type="submit">Send</SendBtn>
          </form>
        </ContactFormSection>
      </ContactSectionWrapper>
    </ContactSectionContainer>
  );
}
