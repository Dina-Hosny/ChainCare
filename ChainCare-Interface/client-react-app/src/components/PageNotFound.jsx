import React from "react";

import { useHistory } from "react-router-dom";
import { Result, Button } from "antd";
import Layout from "./Layout";
import MainContainer from "./MainContainer";

function PageNotFound() {
  let history = useHistory();
  return (
    <Layout>
      <MainContainer>
        <Result
          status="404"
          title="404"
          subTitle="Sorry, the page you visited does not exist."
          extra={
            <Button type="primary" onClick={() => history.push("/")} style={{color: "#16c79a"}}>
              Back Home
            </Button>
          }
        />
      </MainContainer>
    </Layout>
  );
}

export default PageNotFound;
