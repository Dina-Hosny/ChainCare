import styled from "styled-components";
export const HomeContainer = styled.main`
  color: #fff;
  background-color: #f7f7f7;
  @media screen and (max-width: 768px) {
    padding: 100px 0;
  }
   
  /* border: 3px solid red; */
`;

export const HomeWrapper = styled.section`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: baseline;
  
  padding: 20px;
  height: 860px;
  /* border: 1px solid green; */

  @media screen and (max-width: 768px) {
    display: flex;
    flex-flow: column;
    width: 100%;
    align-items: center;
      

  }
`;

export const HomeInfoSection = styled.div`
  flex: 1;
  /* border: 1px solid blue; */
  text-align: left;
  display: flex;
  justify-content: flex-end;
  padding: 20px;
  margin: 0 10px;
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 440px;
  padding-top: 0;
  padding-bottom: 60px;
  /* border: 2px solid blue; */
`;

export const Heading = styled.h1`
  margin-bottom: 24px;
  font-size: 45px;
  line-height: 1.1;
  font-weight: bold;
  color: #16c79a;

  @media screen and (max-width: 480px) {
    font-size: 32px;
  }

  @media screen and (max-width: 768px) {
    font-size: 35px;
    text-align: center;
  }

  /* border: 2px solid orange; */
`;

export const Subtitle = styled.p`
  max-width: 440px;
  margin-bottom: 35px;
  font-size: 20px;
  /* font-weight: bold;  */
  line-height: 24px;
  color: ${({ darkText }) => (darkText ? "#010606" : "#73837e")};
  /* border: 2px dashed orange; */

  @media screen and (max-width: 768px) {
    font-size: 16px;
    text-align: center;
  }
`;

export const BtnWrap = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  /* border: 2px dashed orange; */

  @media screen and (max-width: 768px) {
    font-size: 16px;
    text-align: center;
    justify-content: center;
  }
`;

export const HomeImageSection = styled.div`
  flex: 1;
  /* border: 1px solid red; */
  text-align: center;
  padding: 20px;
  margin: 0 10px;
  
  
`;

export const ImgWrap = styled.div`
  max-width: 555px;
  height: 100%auto;
  /* border: 2px dashed greenyellow; */
`;

export const Img = styled.img`
  width: 90%;
  margin: 100px 0 10px 0;
  padding-right: 0;
  /* border: 2px dashed salmon; */
  align-self: flex-end;
  @media screen and (max-width: 768px) {
    margin: 0 0 10px 0;
    width: 90%;
  }
`;
