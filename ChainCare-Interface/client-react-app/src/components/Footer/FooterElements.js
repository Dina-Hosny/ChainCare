import styled from "styled-components";

import { Link } from "react-router-dom";

export const FooterContainer = styled.footer`
  /* background-color: #1890ff; */
  border: 1px solid green;
  color: black;
`;

export const FooterWrap = styled.div`
  padding: 48px 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 1100px;
  margin: 0 auto;

  border: 1px solid red;
`;

export const SocialMedia = styled.section`
  max-width: 1000px;
  width: 100%;
  border: 1px dashed red;
`;

export const SocialMediaWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  max-width: 1100px;
  margin: 10px auto 10px auto;

  border: 1px dashed blue;

  @media screen and (max-width: 820px) {
    flex-direction: column;
  }
`;

export const SocialLogo = styled(Link)`
  color: #fff;
  justify-self: center;
  cursor: pointer;
  text-decoration: none;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  font-weight: bold;

  border: 1px solid purple;
`;

export const WebsiteRights = styled.small`
  color: #fff;
  margin-bottom: 16px;
  border: 1px solid black;
`;

export const SocialIcons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 240px;
  border: 1px solid red;
`;

export const SocialIconLink = styled.a`
  color: #fff;
  font-size: 24px;
`;
