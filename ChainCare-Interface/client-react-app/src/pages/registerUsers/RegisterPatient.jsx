import React, { useState, useEffect } from "react";
import {  Container, Row, Col } from "react-bootstrap";
import Modal from "../../components/Modal";
import auth from "../../adapters/auth";
import { useHistory } from "react-router-dom";
import Layout from "../../components/Layout";
import MainContainer from "../../components/MainContainer";

import "../../styles/registerPatient.css";


import { Form, Input, Button, message, notification } from "antd";

import { Typography } from "antd";

import GoBackBtn from "../../components/GoBackBtn";

import { newIdentity } from "../../cryptography/ethIdentity";


import {
  contractAddress,
  requestAccount,
  initContract,
} from "../../adapters/contractAPI";


import { ethers } from "ethers";

import DownloadUserIdentity from "../../components/DownloadUserIdentity";
import UserPassPhraseModel from "../../components/UserPassPhraseModel";
import StorjAPI from "../../adapters/APIWrapper";



const { Title } = Typography;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};
 

function RegisterPatientForm() {
  let history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});


  const warnUserToDownload = () => {
    notification["warning"]({
      message: "Download Identity Keys",
      description: "In order to register you must download the keys first.",
    });
    message.warn("You need to download your identity keys first");
  };

 
  function onFinish(values) {
    console.log("Success : ", values);
    setFormData(values);
    setShowModal(true);
  }
  
  function onFinishFailed(errorInfo) {
    console.log("Failure : ", errorInfo);
  }

  function onReset() {}

  function onFill() {}

  async function encryptionPassphrase(passphrase) {
    let storjAPI = new StorjAPI();

    // let result = initContract();
    // const provider = result.provider;
    // const signer = await provider.getSigner();
    // let Contract = new ethers.Contract(contractAddress, result.abi, signer);
    // let address =  await signer.getAddress();
    
    // let userAccessGrant;

    // if(result != -1) {
    
   
    //   // [x] 0. get user pass phrase
    //   // [] 1. generate access grant
    //   let reqData = { userPassPhrase: passphrase }
    //   storjAPI.generateUserAccess(reqData,String(address))
    //   .then(resData => {
    //     userAccessGrant = resData.userAccessGrant;
    //   })
    //   .catch(err => console.log(err));

    //   // 2. add user identity information
    //   storjAPI.uploadIdentity({
    //     userAccessGrant: userAccessGrant,
    //     objectKey: "/EHRs/identity.json",
    //     identity: {
    //       firstname: formData.firstname,
    //       lastname: formData.lastname
    //     }
    //   }, String(address))

    //   // 3. register patient
    //   await Contract.registerPatient(userAccessGrant);

      // 4. redirect to patient homepage
      // auth.login(() => history.push("/home/patientHome"));
    // }
    auth.login(() => history.push("/home/patientHome"));
  }

  return (
    <>
      
       <Form
        {...layout}
        style={{ padding: "20px"}}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        label="Form Layout"
        className="Formm"
      >



        <Form.Item
          label="First Name"
          name="firstname"
          tooltip="This is a required field"
          className="FORMIT"

        >
          <Input placeholder="firstname" required className="INPUTT"></Input>
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="lastname"
          tooltip="This is a required field"
          className="FORMIT"

        >
          <Input placeholder="lastname" required className="INPUTT"></Input>
        </Form.Item>
  

        <Form.Item
          label="National ID"
          name="National ID"
          tooltip="This is a required field"
          className="FORMIT"

        >
          <Input placeholder="National ID" required className="INPUTT"></Input>
        </Form.Item>



        <Form.Item
          label="Age"
          name="Age"
          tooltip="This is a required field"
          className="FORMIT"

        >
          <Input placeholder="Age" required className="INPUTT"></Input>
        </Form.Item>



        <Form.Item
          label="Phone"
          name="Phone"
          tooltip="This is a required field"
          className="FORMIT"

        >
          <Input placeholder="Phone" required className="INPUTT"></Input>
        </Form.Item>

        <Form.Item
          label="Email"
          name="Email"
          tooltip="This is a required field"
          className="FORMIT"

        >
          <Input placeholder="Email" required className="INPUTT"></Input>
        </Form.Item>



        <Form.Item
          label="City"
          name="City"
          tooltip="This is a required field"
          className="FORMIT"

        >
          <Input placeholder="City" required className="INPUTT" ></Input>
        </Form.Item>



        <Form.Item
          label="Address"
          name="Address"
          tooltip="This is a required field"
          className="FORMIT"

        >
          <Input placeholder="Address" required className="INPUTT"></Input>
        </Form.Item>



        <Form.Item
          label="ZipCode"
          name="ZipCode"
          tooltip="This is a required field"
          className="FORMIT"

        >
          <Input placeholder="ZipCode" required className="INPUTT"></Input>
        </Form.Item>


        <Form.Item
          label=" Social status"
          tooltip="This is a required field"
          className="FORMIT"
          >
  
 <select class="form-select form-select-sm" aria-label=".form-select-sm example" style={{ marginTop:"-10px"}}>
  <option value="11">Choose marital status</option>
  <option value="12">single</option>
  <option value="13">married</option>
  <option value="14">Divorced</option>

</select>	
</Form.Item>


<Form.Item
          label="Gender"
          tooltip="This is a required field"
          className="FORMIT"
          >
  
 <select class="form-select form-select-sm" aria-label=".form-select-sm example" style={{ marginTop:"-10px"}}>
  <option value="111">Choose your sex</option>
  <option value="112">Male</option>
  <option value="113">Female</option>
  

</select>	
</Form.Item>





<Form.Item
          label="your blood type"
          tooltip="This is a required field"
          className="FORMIT"
          >
  
 <select class="form-select form-select-sm" aria-label=".form-select-sm example" style={{ marginTop:"-10px"}}>
 <option value="00" >Choose your blood type</option>
  <option value="22">A</option>
  <option value="33">B</option>
  <option value="44">O</option>
  <option value="55">AB</option>
 

</select>	
</Form.Item>

        <Form.Item
          label="Allergy"
          name="Allergy"
          tooltip="This is a required field"
          className="FORMIT"

        >
          <Input placeholder="Allergy" required className="INPUTT"></Input>
        </Form.Item>


       
        <Form.Item
          label=" Chronic diseases"
          name=" Chronic diseases"
          tooltip="This is a required field"
          className="FORMIT"

        >
          <Input placeholder=" Chronic diseases" required className="INPUTT"></Input>
        </Form.Item>


  



        <Form.Item {...tailLayout}>


       <Button className="regist-btn"   variant ="primary"  htmlType="submit" style={{ backgroundColor : "#16c79a", fontSize:"18px", paddingLeft:"30px" ,paddingRight:"30px", paddingBottom:"20px"}} > 
            Register
          </Button>
        </Form.Item>
      </Form>
      
      <UserPassPhraseModel showModal={showModal} setShowModal={setShowModal} getPhrase={encryptionPassphrase} />
    </>
  );
}

function RegisterPatient() {
  return (
    <>
      <Layout>
        <MainContainer>
          <Container>
            <Row style={{ padding: "20px", marginTop: "20px" }}>
              <GoBackBtn path="/home/registerUsers" />
              <Col xs={7} className="form-container" style={{backgroundColor:"#e2fad6",boxShadow:"#e9ecef 5px 5px 5px 5px"}}>
                <Title level={2} style={{ textAlign: "center", fontSize:"30px", color:"#57625f" }}>
                  Patient Registration Form 
                </Title>
                <RegisterPatientForm />
              </Col>
              <Col></Col>
            </Row>
          </Container>
        </MainContainer>
      </Layout>
      
    </>
  );
}

export default RegisterPatient;
