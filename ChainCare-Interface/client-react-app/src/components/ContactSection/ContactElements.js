import styled from "styled-components";

export const ContactSectionContainer = styled.div`
  background-color: #fafafa;
  @media screen and (max-width: 768px) {
    padding: 100px 0;
  }
`;

export const ContactSectionWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;

  height: 860px;
  width: 100%;
  max-width: 1100px;
  z-index: 1;

  margin-right: auto;
  margin-left: auto;
  padding: 0 24px;

  justify-content: center;
  align-items: center;

  @media screen and (max-width: 1089px) {
    padding: 100px 0;
    width: 100%;
    height: auto;
    z-index: 0;
  }

  /* border: 1px solid red; */
`;

export const ImageSection = styled.div`
  width: 40%;
  height: 50%;
  text-align: center;
  /* border: 1px solid green; */
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ContactFormSection = styled.div`
  width: 50%;
  text-align: center;
  /* border: 1px solid green; */
  margin: 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 15px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  font-family: "Montserrat", sans-serif;

  @media screen and (max-width: 768px) {
    padding: 10px auto;
  }

  @media screen and (max-width: 1089px) {
    width: 100%;
  }
`;

export const FormImage = styled.img`
  margin-right: 100px;
  height: 100%;

  @media screen and (max-width: 768px) {
    height: 50%;
    margin: 0px;
  }

  @media screen and (max-width: 1089px) {
    width: 100%;
  }
`;

export const FormTitle = styled.h1`
  font-size: 35px;
  font-weight: bold;
  color: #6c757d;

  @media screen and (max-width: 1089px) {
    font-size: 25px;
  }
`;

export const FormText = styled.h1`
  font-size: 20px;
  font-weight: normal;
  text-align: left;

  @media screen and (max-width: 1089px) {
    font-size: 16px;
  }
`;
