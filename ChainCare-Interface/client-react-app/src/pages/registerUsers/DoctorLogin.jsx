import React from "react";
import { useState } from "react";
import Layout from "../../components/Layout";
import MainContainer from "../../components/MainContainer";
import GoBackBtn from "../../components/GoBackBtn";

import { Link, useHistory } from "react-router-dom";
import { Typography } from "antd";

import { Form, Container, Row, Col, Button } from "react-bootstrap";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from "@material-ui/styles";


const { Title } = Typography;
const useStyles = makeStyles ({
   field: {
       marginTop: 20,
       marginBottom: 20,
       display: "block"
   }

})

function DoctorLogin() {
  let history = useHistory();
  const classes = useStyles();
  const [validated, setValidated] = useState(false);
  const [patientAddress, setPatientAddress] = useState("");
  const [revokedAddress, setRevokedAddress] = useState("");
  
  
    const handleSubmit = (event) => {
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
  
      setValidated(true);
  
      // ? 1. Determine address role (either provider or entity)
      // ? 2. Check this provider is granted Access
      // ? 3. Revoke account either entity or provider
    };
  return (
    <>
     <Layout>
        <MainContainer>
          <Container style={{marginTop: 70}} >
            <Row>
              <GoBackBtn path="/home/registerUsers" />

              <Col xs={6} className="form-container" >
                {" "}
                <Title level={2} style={{ textAlign: "center", color:"#57625f" }}>
                  Doctor Login
                </Title>
                <Col>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="" controlId="validationCustom03">
                <Form.Label>Your Ethereum Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="enter your Etherium address"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide your ethereum address.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="" controlId="validationCustom03">
                <Form.Label>Your Private Key</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="enter your privte key"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide your private key.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            

            <Button variant="primary" type="button" onClick={() => history.push("/home/ProviderHome")} style={{width:"100%"}}>
              Login
            </Button>
            
            <span>
           or  <Link to='/issueUserID' style={{color:"#16c79a"}}> create a new account</Link>
            </span>
            
          </Form>
        </Col>
            
              </Col>

              <Col></Col>
            </Row>
          </Container>
        </MainContainer>
      </Layout>
    </>
  );
}

export default DoctorLogin;
