import React, { useState, useEffect } from "react";

import { Switch, Route, useRouteMatch } from "react-router-dom";

import UserProfile from "../../components/UserProfile";
import ActionPageLayout from "../../components/ActionPageLayout";
import ProtectedRoute from "../../components/Protected.route";
import PageNotFound from "../../components/PageNotFound";

import UserActions from "../../components/UserActions";
import ViewHealthRecords from "./ViewHealthRecords";
import GivePermission from "./GivePermission";
import ShareRecords from "./ShareRecords";
import RevokePermission from "./RevokePermission";

import { FcInfo } from "react-icons/fc";
import { Modal, message } from "antd";

import "../../styles/profile.css";
import PatientProfile from "../../components/PatientProfile";


import { getFromIPFS } from "../../adapters/ipfs";



import { decryptDataWithSymKey } from "../../cryptography/decryption";

import { BtnContainer, Btn } from "../../components/UpdateKeysBtn";

import styled from "styled-components";

const PromptFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  flex-grow: 1;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: bolder;
`;

const TextArea = styled.textarea`
  width: 90%;

  padding: 8px;
  margin: 10px 0;
  outline: none;
  border: none;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 5px 0px,
    rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
  resize: none;
  &:focus {
    outline: none;
  }
  color: #7c7c7c;
  line-height: 25px;
`;

const patientActions = [
  { id: 1, name: "Profile" },
  { id: 2, name: "View Health Records" },
  { id: 3, name: "Give Permission" },
  { id: 4, name: "Share Records" },
  { id: 5, name: "Revoke Permission" },
];



function PatientHome() {
  let match = useRouteMatch();

  const [reload, setReload] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [patientData, setPatienData] = useState({});

 

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
  };

  const handleCancel = () => {
  };


  return (
    <>
      <Switch>
        <ProtectedRoute exact path="/home/patientHome/Profile">
          <ActionPageLayout
            status={
              <p style={{ color: "green", fontSize: "18px" }}>
                <FcInfo /> You are logged in as patient
              </p>
            }
            actions={
              <UserActions
                actions={patientActions}
                userHome="/home/patientHome/"
              />
            }
            content={
              <PatientProfile
                fullname={name}
                address={address}
              />
            }
          />
        </ProtectedRoute>
        <ProtectedRoute exact path="/home/patientHome/ViewHealthRecords">
          <ActionPageLayout
            status={
              <p style={{ color: "green", fontSize: "18px" }}>
                <FcInfo /> You are logged in as patient
              </p>
            }
            actions={
              <UserActions
                actions={patientActions}
                userHome="/home/patientHome/"
              />
            }
            content={<ViewHealthRecords />}
          />
        </ProtectedRoute>
        <ProtectedRoute exact path="/home/patientHome/GivePermission">
          <ActionPageLayout
            status={
              <p style={{ color: "green", fontSize: "18px" }}>
                <FcInfo /> You are logged in as patient
              </p>
            }
            actions={
              <UserActions
                actions={patientActions}
                userHome="/home/patientHome/"
              />
            }
            content={<GivePermission />}
          />
        </ProtectedRoute>
        <ProtectedRoute exact path="/home/patientHome/ShareRecords">
          <ActionPageLayout
            status={
              <p style={{ color: "green", fontSize: "18px" }}>
                <FcInfo /> You are logged in as patient
              </p>
            }
            actions={
              <UserActions
                actions={patientActions}
                userHome="/home/patientHome/"
              />
            }
            content={<ShareRecords />}
          />
        </ProtectedRoute>
        <ProtectedRoute exact path="/home/patientHome/RevokePermission">
          <ActionPageLayout
            status={
              <p style={{ color: "green", fontSize: "18px" }}>
                <FcInfo /> You are logged in as patient
              </p>
            }
            actions={
              <UserActions
                actions={patientActions}
                userHome="/home/patientHome/"
              />
            }
            content={<RevokePermission />}
          />
        </ProtectedRoute>

        <Route exact path={match.path}>
          <ActionPageLayout
            status={
              <p style={{ color: "green", fontSize: "18px" }}>
                <FcInfo /> You are logged in as patient
              </p>
            }
            actions={
              <UserActions
                actions={patientActions}
                userHome="/home/patientHome/"
              />
            }
            content={
              <PatientProfile
                fullname={name}
                address={address}
              />
            }
          />
        </Route>
        <Route path="*" component={PageNotFound} />
      </Switch>
    </>
  );
}

export default PatientHome;
