import styled from "styled-components";

import { Link as LinkR } from "react-router-dom";
import { Link as LinkS } from "react-scroll";

export const Nav = styled.nav`
  background: white;

  height: 80px;
  margin-top: -80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5625rem;
  position: sticky;
  top: 0;
  z-index: 10;

  @media screen and (max-width: 960px) {
    transition: 0.8s all ease;
  }
`;

export const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 80px;
  z-index: 1;
  width: 100%;
  padding: 0 24px;
  max-width: 1100px;
`;

export const NavLogo = styled(LinkR)`
  color:#16c79a;
  justify-self: flex-start;
  cursor: pointer;

  font-size: 1.5rem;

  display: flex;
  align-items: center;
  margin-left: 24px;
  font-weight: bold;
  text-decoration: none;
  padding-right: 90px;

  &:hover {
    transform: scale(1.1);
    color: #16c79a;
  }

  @media screen and (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const MobileIcon = styled.div`
  display: none;

  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 60%);
    font-size: 1.8rem;
    cursor: pointer;
    color: #fff;
  }
`;

export const NavMenu = styled.ul`
  display: flex;

  margin-top: 28px;
  align-items: center;
  list-style: none;
  text-align: center;
  margin-right: -22px;
  width: 100%
  /* border: 1px solid green; */

 @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavItem = styled.li`
  height: 80px;
`;

export const NavLinks = styled(LinkS)`
  color: #b5c5c1;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  font-size: 1.25rem;
  padding-right: 80px;
  padding-left: 80px;


  @media screen and (max-width: 837px) {
    font-size: 1rem;
  }
  &.active {
    border-bottom: 3px solid #16c79a;
  }

  &:hover {
    transform: scale(1.1);
    color: #16c79a;
  }
`;

export const NavBtn = styled.nav`
  display: flex;
  align-items: center;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtnLink = styled(LinkR)`
  border-radius: 11px;
  background: ${({ primary }) => (primary ? "#16c79a" : "#212b9c")};
  white-space: nowrap;
  padding: ${({ big }) => (big ? "14px 48px" : "12px 30px")};
  color: #fff;
  font-size: ${({ fontBig }) => (fontBig ? "20px" : "16px")};
  white-space: nowrap;
  padding: 10px 22px;
  font-size: 1.25rem;
  font-weight: bold;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: space;

  margin: 5px;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: ${({ primary }) => (primary ? "#16c79a" : "#185FEB")};
    color: black;

    transform: scale(1.1);
  }
`;
