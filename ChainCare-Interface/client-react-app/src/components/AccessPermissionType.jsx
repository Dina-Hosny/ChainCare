import React from "react";

import { Menu, Dropdown, Button, message, Space, Select } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { SiOpenaccess } from "react-icons/si";

import styled from "styled-components";

const AccessContainer = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
    
`;

const TextLabel = styled.div`
    align-self: center;
    padding-right: 10px;
`;

const { Option } = Select;



export default function AccessPermissionType(props) {
 
  return (
    <AccessContainer>

    <TextLabel>Access Permission Type</TextLabel>

    <Select defaultValue="Select Permission Type" onChange={props.handleClick} 
        suffixIcon={<SiOpenaccess />} 
        menuItemSelectedIcon={<SiOpenaccess />}
        style={{width:"230px"}}
        > 
      <Option value="Full Access">Full Access</Option>
      <Option value="Read Only">Read Only</Option>
      <Option value="Write Only">Write Only</Option>
    </Select>

    </AccessContainer>

    

  
  );
}
