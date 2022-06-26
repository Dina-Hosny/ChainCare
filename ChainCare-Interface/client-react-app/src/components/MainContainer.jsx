import React from "react";

import "../styles/mainContainer.css";

function MainContainer(props) {
  return <main>{props.children}</main>;
}

export default MainContainer;
