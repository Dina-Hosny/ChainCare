import styled from "styled-components";

import { Link } from "react-scroll";

export const Button = styled(Link)`
  border-radius: 11px;
  background: ${({ primary }) => (primary ? "#16C79A" : "#212b9c")};
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

  @media screen and (max-width: 768px) {
    font-size: 16px;
  }

  &:hover {
    transition: all 0.2s ease-in-out;
    background: ${({ primary }) => (primary ? "#16C79A" : "#185FEB")};
    color: black;

    transform: scale(1.1);
  }
`;
