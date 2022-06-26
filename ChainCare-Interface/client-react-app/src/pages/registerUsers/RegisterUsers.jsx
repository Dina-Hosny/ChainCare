import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from 'react-router-dom';

import Layout from "../../components/Layout";
import MainContainer from "../../components/MainContainer";
import SystemUserCard from "../../components/SystemUserCard";

import { AiOutlineInfoCircle } from "react-icons/ai";

import { useHistory } from "react-router";

import "../../styles/registerUsers.css";

import AdminImage from "../../assets/images/admin-avatar.png";
import PatientImage from "../../assets/images/patient-avatar.png";
import ProviderImage from "../../assets/images/provider-avatar.png";
import EntityImage from "../../assets/images/entity-avatar.png";

import { Popover } from "antd";

function RegisterUsers() {
  let history = useHistory();

  const patientInfo = (
    <div>
      <p>Patient Registration</p>
    </div>
  );

  const adminInfo = (
    <div>
      <p>Admin Login, to verify your credentials or issue new one.</p>
    </div>
  );

  const providerInfo = (
    <div>
      <p>Doctor Login, to verify your credentials or issue new one.</p>
    </div>
  );

  const entityInfo = (
    <div>
      <p>Laboratories Login, to verify your credentials or issue new one.</p>
    </div>
  );

  return (
    <>
      <Layout>
        <MainContainer>
          <Container>
            <Row>
              <Col className="register-text">Haven't a patient account?
? 
              <Link to='/home/registerPatient' style={{color:"#16c79a"}}> creat one</Link>
              </Col>
            </Row>
            <Row>
              <Col>
                <p className="system-users-text">System Users</p>
              </Col>
            </Row>
            <Row className="users-container">
              <SystemUserCard
                image={<img src={PatientImage} alt="patient avatar" />}
                user={
                  <div>
                    {" "}
                    <Popover content={patientInfo}>
                      <span className="info-icon">
                        Patient <AiOutlineInfoCircle />
                      </span>{" "}
                    </Popover>
                  </div>
                }
              

                button={
                  <button onClick={() => history.push("/home/PatientLogin")} style={{backgroundColor: "#16c79a" }} >
                    {" "}
                    Login{" "}
                  </button>
                }
                
              />
              <SystemUserCard
                image={<img src={AdminImage} alt="admin avatar" />}
                user={
                  <div>
                    {" "}
                    <Popover content={adminInfo}>
                      <span className="info-icon">
                        Admin <AiOutlineInfoCircle />
                      </span>{" "}
                    </Popover>
                  </div>
                }
                button={
                  <button onClick={() => history.push("/home/adminLogin")} style={{backgroundColor: "#16c79a" }}>
                    {" "}
                    Login{" "}
                  </button>
                }
              />
              <SystemUserCard
                image={<img src={ProviderImage} alt="provider avatar" />}
                user={
                  <div>
                    {" "}
                    <Popover content={providerInfo}>
                      <span className="info-icon">
                        Doctor <AiOutlineInfoCircle />
                      </span>{" "}
                    </Popover>
                  </div>
                }
                button={
                  <button onClick={() => history.push("/home/doctorLogin")} style={{backgroundColor: "#16c79a" }}>
                    {" "}
                    Login{" "}
                  </button>
                }
              />
              <SystemUserCard
                image={<img src={EntityImage} alt="entity avatar" />}
                user={
                  <div>
                    {" "}
                    <Popover content={entityInfo}>
                      <span className="info-icon">
                      Laboratories <AiOutlineInfoCircle />
                      </span>{" "}
                    </Popover>
                  </div>
                }
                button={
                  <button onClick={() => history.push("/home/entityLogin")} style={{backgroundColor: "#16c79a" }}>
                    {" "}
                    Login{" "}
                  </button>
                }
              />
            </Row>
          </Container>
        </MainContainer>
      </Layout>
    </>
  );
}

export default RegisterUsers;
