import styled from "styled-components";

export const BtnContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const Btn = styled.button`
  background-color: #f8f9fa;
  border: 1px solid #f8f9fa;
  border-radius: 4px;
  color: #3c4043;
  cursor: pointer;
  font-family: arial, sans-serif;
  font-size: 14px;
  height: 36px;
  line-height: 27px;
  min-width: 54px;
  padding: 0 16px;
  text-align: center;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: pre;

  &:hover {
    border-color: #dadce0;
    box-shadow: rgba(0, 0, 0, 0.1) 0 1px 1px;
    color: #202124;
  }

  &:focus {
    border-color: #4285f4;
    outline: none;
  }
`;
