import { useHistory } from "react-router-dom";
import auth from "../adapters/auth";
import React, { useEffect } from "react";

import { message } from "antd";

export default function HandleAccountChange() {
  let history = useHistory();
  useEffect(() => {
    window.ethereum.on("accountsChanged", function (accounts) {
      // Time to reload your interface with accounts[0]!

      message.warn("Account has changed, will redirect to home.");

      setTimeout(() => {
        // ? when account changed we logout the current user and redirect home
        auth.logout(() => history.push("/"));

        // TODO maybe reload interface instead of redirecting
      }, 5000);
    });
  });

  return <></>;
}
