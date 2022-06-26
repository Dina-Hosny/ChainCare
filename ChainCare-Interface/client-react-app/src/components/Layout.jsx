import React from "react";
import Header from "./Header";
import Footer from "./Footer";

import styled from "styled-components";

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
  height: 100vh;
`;

function Layout(props) {
  return (
    <LayoutContainer>
      <Header />
      {props.children}
      <Footer />
    </LayoutContainer>
  );
}

export default Layout;
