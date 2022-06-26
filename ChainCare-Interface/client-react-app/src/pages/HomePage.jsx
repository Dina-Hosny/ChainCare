import React from "react";
import { Container } from "react-bootstrap";
import Layout from "../components/Layout";
import MainContainer from "../components/MainContainer";

import { Switch, Route, useRouteMatch } from "react-router-dom";
import RegisterUsers from "./registerUsers/RegisterUsers";
import ProtectedRoute from "../components/Protected.route";
import PageNotFound from "../components/PageNotFound";
import RegisterPatient from "./registerUsers/RegisterPatient";
import PatientHome from "./patientHomePage/PatientHome";
import DoctorLogin from "./registerUsers/DoctorLogin";
import ProviderHome from "./providerHomePage/ProviderHome";
import AdminLogin from "./registerUsers/AdminLogin";
import EntityLogin from "./registerUsers/EntityLogin";
import AdminHome from "./adminHomePage/AdminHome";
import EntityHome from "./entityHomePage/EntityHome";
import PatientLogin from "./registerUsers/PatientLogin";


function HomePage() {
  let match = useRouteMatch();

  return (
    <>
      <Switch>
        <ProtectedRoute exact path={`${match.path}/registerUsers`}>
          <RegisterUsers />
        </ProtectedRoute>

        <ProtectedRoute exact path={`${match.path}/registerPatient`}>
          <RegisterPatient />
        </ProtectedRoute>

        <ProtectedRoute exact path={`${match.path}/doctorLogin`}>
          <DoctorLogin />
        </ProtectedRoute>

        <ProtectedRoute exact path={`${match.path}/adminLogin`}>
          <AdminLogin />
        </ProtectedRoute>

        <ProtectedRoute exact path={`${match.path}/entityLogin`}>
          <EntityLogin />
        </ProtectedRoute>

        <ProtectedRoute path={`${match.path}/providerHome`}>
          <ProviderHome />
        </ProtectedRoute>

        <ProtectedRoute path={`${match.path}/patientHome`}>
          <PatientHome />
        </ProtectedRoute>

        <ProtectedRoute path={`${match.path}/adminHome`}>
          <AdminHome />
        </ProtectedRoute>

        <ProtectedRoute path={`${match.path}/entityHome`}>
          <EntityHome />
        </ProtectedRoute>

        <ProtectedRoute exact path={`${match.path}/patientLogin`}>
          <PatientLogin/>
        </ProtectedRoute>

        <Route exact path={match.path}>
          <Layout>
            <MainContainer>
              <Container>
              </Container>
            </MainContainer>
          </Layout>
        </Route>

        <Route path="*" component={PageNotFound} />
      </Switch>
    </>
  );
}

export default HomePage;
