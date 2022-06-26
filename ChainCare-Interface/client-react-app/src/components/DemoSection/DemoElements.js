import styled from "styled-components";

export const CardContainer = styled.div`
  /* width: 445px; */

  text-align: center;
  border-radius: 5px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

  @media screen and (max-width: 768px) {
    padding: 40px 0;
  }
  /* border: 2px solid red; */
`;

export const CardGrid = styled.div`
  display: flex;
  flex-direction: column;
  /* grid-template-columns: 1fr;
  grid-template-rows: 250px 1fr;
  -webkit-transform: scale(1); */
  transform: scale(1);
  -webkit-transition: 0.3s ease-in-out;
  transition: 0.3s ease-in-out;

  /* &:hover {
    -webkit-transform: scale(1.3);
    transform: scale(1.3);
  } */
  /* border: 4px dashed yellow; */

  @media screen and (max-width: 768px) {
    /* transform: scale(0.5); */
    /* width: auto; */
  }
`;

export const CardVideoSection = styled.div`
  /* border: 1px solid red; */
  /* border: 5px dashed red; */

  @media screen and (max-width: 768px) {
    /* transform: scale(0.5); */
    /* width: auto; */
  }
`;

export const VideoWraper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 250px;
  /* border: 3px solid red; */

  @media screen and (max-width: 768px) {
    /* transform: scale(0.9); */
    /* width: 100%; */
  }
`;

export const CardInfoSection = styled.div`
  /* border: 1px solid blue; */
  display: flex;

  flex-direction: column;
  background-color: rgba(245, 245, 245, 0.4);
  /* border: 3px solid green; */
`;

export const VideoTitle = styled.p`
  margin: 0;
  padding: 10px;
  font-size: 16px;
  font-weight: bolder;
  /* border: 2px dashed purple; */

  @media screen and (max-width: 768px) {
    font-size: 12px;
  }
`;

export const VideoSubtitle = styled.p`
  margin: 0;
  padding: 10px;
  font-size: 14px;
  /* border: 2px dashed red; */
  @media screen and (max-width: 768px) {
    font-size: 12px;
  }
`;

export const VideoAvatar = styled.div`
  align-self: flex-start;
  margin: 0;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  /* border: 2px dashed orange; */
`;

export const VideoThumbnail = styled.img`
  cursor: pointer;

  opacity: 1;
  -webkit-transition: 0.3s ease-in-out;
  transition: 0.3s ease-in-out;
  /* border: 3px dashed orange; */

  @media screen and (max-width: 490px) {
    width: 100%;
  }

  &:hover {
    opacity: 0.5;
  }
`;

export const GoogleAvatar = styled.img`
  padding: 10px;
`;

export const DemoSectionContainer = styled.div`
  font-family: "Montserrat", sans-serif;
  @media screen and (max-width: 768px) {
    padding: 100px 0;
  }
  /* border: 2px dashed purple; */
`;

export const DemoSectionWrapper = styled.div`
  display: flex;
  z-index: 1;
  height: 860px;
  width: 100%;
  max-width: 1100px;
  margin-right: auto;

  margin-left: auto;
  padding: 0 24px;
  flex-direction: column;
  justify-content: center;
  align-content: center;

  @media screen and (max-width: 1089px) {
    /* height: auto; */
    z-index: 0;
  }
  /* border: 2px dashed red; */
  /* border: 1px solid green; */
`;

export const SliderSection = styled.div`
  width: 100%;
  height: 600px;
  margin: 0 auto;
  grid-row-start: 3;
  grid-row-end: 4;

  @media screen and (max-width: 768px) {
    /* width: auto; */
  }

  /* border: 2px dashed red; */
`;

export const DemoTitleSection = styled.div`
  display: flex;
  /* grid-row-start: 1;
  grid-row-end: 2; */
  /* border: 1px solid red; */
  /* border: 2px dashed black; */
`;

export const DemoSectionTitle = styled.div`
  align-self: flex-start;
  width: 100%;
  height: 10%;
  padding: 20px;
  font-size: 35px;
  font-weight: bold;
  /* grid-row-start: 2;
  grid-row-end: 3; */

  @media screen and (max-width: 768px) {
    font-size: 25px;
  }
  /* border: 2px dashed red; */
`;

export const DemoSectionSubtitle = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-self: center;
  text-align: center;
  font-size: 20px;

  padding: 0 50px;

  @media screen and (max-width: 768px) {
    font-size: 16px;
  }

  @media screen and (max-width: 451px) {
    font-size: 12px;
  }
`;

export const Divider = styled.div`
  display: flex;
  align-items: center;
  text-align: center;

  &::before {
    content: "";
    flex: 1;
    border-bottom: 2px solid rgba(0, 0, 0, 0.1);
  }

  &::after {
    content: "";
    flex: 1;
    border-bottom: 2px solid rgba(0, 0, 0, 0.1);
  }

  &:not(:empty)::before {
    margin-right: 0.25rem;
  }

  &:not(:empty)::after {
    margin-right: 0.25rem;
  }
`;
