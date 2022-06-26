import React, { useEffect, useState } from "react";

import { Row, Col } from "react-bootstrap";

import { Button } from "react-bootstrap";
import { message } from "antd";

import { Modal } from "antd";

import "../../../styles/patientRecordPage.css";
import CreateRecordForm from "../../../components/CreateRecordForm";

import { DatePicker } from "antd";
import moment from "moment";
import { Form } from "react-bootstrap";

import PatientInformation from "./PatientInformation";

export default function PatientRecordPage(props) {
  const dateFormat = " DD/MM/YYYY";

  const [validated, setValidated] = useState(false);
  const [recordName, setRecordName] = useState("");
  const [doctorNote, setDoctorNote] = useState("");
  const [date, setDate] = useState("");

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [patientRecords, setPatientRecords] = useState([]);
  const [allPatientRecords, setAllPatientRecords] = useState([]);
  useEffect(() => {
    let records = [
      {
        recordName: "Test 1",
        date: new Date().toString(),
        doctorNote: "Secret",
        id: 1,
      },
      {
        recordName: "Blood Test",
        date: new Date().toString(),
        doctorNote: "Secret",
        id: 2,
      },
      {
        recordName: "kidey Check",
        date: new Date().toString(),
        doctorNote: "Secret",
        id: 3,
      },
      {
        recordName: "Despatch Note",
        date: new Date().toString(),
        doctorNote: "Secret",
        id: 4,
      },
      {
        recordName: "Nurse Tests",
        date: new Date().toString(),
        doctorNote: "Secret",
        id: 5,
      },
      {
        recordName: "Hips Check",
        date: new Date().toString(),
        doctorNote: "Secret",
        id: 6,
      },
      {
        recordName: "Blood Preasure Check",
        date: new Date().toString(),
        doctorNote: "Secret",
        id: 7,
      },
      {
        recordName: "Test 8",
        date: new Date().toString(),
        doctorNote: "Secret",
        id: 8,
      },
      {
        recordName: "Test 9",
        date: new Date().toString(),
        doctorNote: "Secret",
        id: 9,
      },
      {
        recordName: "Test 10",
        date: new Date().toString(),
        doctorNote: "Secret",
        id: 10,
      },
    ];

    setPatientRecords(records);
    setAllPatientRecords(records);
  }, []);

  const [viewedRecord, setViewedRecord] = useState({
    recordName: "",
    doctorNote: "",
    date: "",
    id: "",
  });

  const searchRecordsByName = (event) => {
    const value = event.target.value.toLowerCase();
    const filteredRecords = allPatientRecords.filter((record) =>
      `${record.recordName}`.toLowerCase().includes(value)
    );

    setPatientRecords(filteredRecords);
  };

  const handleUpdate = (id) => {
    // alert(id);

    // ? ENSURE VALIDATED

    if (validated === true) {
      if (date.toString() !== "Invalid date") {
        setPatientRecords(
          patientRecords.map((record) => {
            if (record.id !== id) return record;
            // alert(record.date);
            // alert(typeof record.date);

            return {
              recordName: recordName,

              date: date.toString(),
              doctorNote: doctorNote,
              id: record.id,
            };
          })
        );
        message.success("Record updated successfully");
        setShowViewModal(false);
      } else {
        message.warning("Choose a date !");
        setShowViewModal(true);
      }
    }
  };

  const handleDelete = (id) => {
    // alert(id);

    let filteredRecords = patientRecords.filter((r) => r.id !== id);
    setPatientRecords(filteredRecords);
    message.success("Record deleted successfully");
    setShowViewModal(false);
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const handleCreateRecord = () => {
    setShowCreateModal(true);
  };

  const handleViewRecord = (record) => {
    setRecordName(record.recordName);
    setDoctorNote(record.doctorNote);
    setDate(record.date);
    // alert(record.date);
    // alert(typeof record.date);

    setViewedRecord({});
    setViewedRecord(record);
    setShowViewModal(true);
  };

  return (
    <>
      <PatientInformation
        user={props.user}
        handleCreateBtn={handleCreateRecord}
        records={patientRecords}
        handleViewRecord={handleViewRecord}
        searchRecordsByName={searchRecordsByName}
      />

      <Modal
        visible={showCreateModal}
        onOk={() => setShowCreateModal(false)}
        onCancel={() => setShowCreateModal(false)}
        closable
        width={1000}
        footer={null}
      >
        <CreateRecordForm
          patientName={props.user.firstname + " " + props.user.lastname}
          patientAddress={props.user.address}
          provider="TODO: Manchester Hospital"
          doctorAddress="TODO: 0X13"
          setShowCreateModal={setShowCreateModal}
          setPatientRecords={setPatientRecords}
          patientRecords={patientRecords}
        />
      </Modal>
      <Modal
        visible={showViewModal}
        onOk={() => setShowViewModal(false)}
        onCancel={() => setShowViewModal(false)}
        closable
        width={1000}
        footer={null}
      >
        {/* <ViewRecordForm
          patientName={props.user.firstname + " " + props.user.lastname}
          patientAddress={props.user.address}
          provider="TODO: Manchester Hospital"
          doctorAddress="TODO: 0X13"
          recordName={viewedRecord.recordName}
          doctorNote={viewedRecord.doctorNote}
          date={new Date(viewedRecord.date)}
          setShowViewModal={setShowViewModal}
          setPatientRecords={setPatientRecords}
        /> */}

        <div style={{ fontSize: "18px", padding: "40px" }}>
          <Form noValidate validated={validated} onClick={handleSubmit}>
            <h1>Patient Record</h1>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="3">
                <p>Patient Name:</p>
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="text"
                  placeholder={props.user.firstname + " " + props.user.lastname}
                  readOnly
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="3">
                <p>Record Name:</p>
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="text"
                  placeholder="record name"
                  value={recordName}
                  onChange={(e) => setRecordName(e.target.value)}
                  required
                />

                <Form.Control.Feedback type="invalid">
                  Please enter a record name!
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="3">
                {" "}
                <p>Provider:</p>
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="text"
                  placeholder={"TODO: Manchester Hospital"}
                  readOnly
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="3">
                <p>Date:</p>
              </Form.Label>
              <Col sm="4">
                <DatePicker
                  showTime
                
                  defaultValue={moment(new Date(date), dateFormat)}
                  value={moment(new Date(date), dateFormat)}
                  onChange={(date, dateString) =>
                    setDate(moment(new Date(dateString), dateFormat))
                  }
                />

                <Form.Control.Feedback type="invalid">
                  Please select a date for this note!
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="3">
                <p>Patient Address:</p>
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="text"
                  placeholder={props.user.address}
                  readOnly
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="3">
                <p>Doctor's Address:</p>
              </Form.Label>
              <Col sm="9">
                <Form.Control type="text" placeholder="TODO: 0X13" readOnly />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="3">
                <p>Doctor's Note</p>
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  as="textarea"
                  rows={5}
                  value={doctorNote}
                  onChange={(e) => setDoctorNote(e.target.value)}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide record note!
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <div className="patient-create-record-btns-container">
              <Button
                variant="primary"
                type="button"
                className="patient-create-btn"
                onClick={() => handleUpdate(viewedRecord.id)}
              >
                Update
              </Button>
              <Button
                variant="danger"
                type="button"
                className="patient-create-btn"
                onClick={() => handleDelete(viewedRecord.id)}
              >
                Delete
              </Button>
            </div>
          </Form>
        </div>
      </Modal>
    </>
  );
}
