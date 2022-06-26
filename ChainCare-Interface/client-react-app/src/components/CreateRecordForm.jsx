import React, { isValidElement, useEffect, useState } from "react";
import { DatePicker } from "antd";
import moment from "moment";
import { Button, Form, Row, Col } from "react-bootstrap";
import { message } from "antd";

export default function CreateRecordForm(props) {
  const dateFormat = " DD/MM/YYYY";

  const [validated, setValidated] = useState(false);

  const [recordName, setRecordName] = useState("");
  const [doctorNote, setDoctorNote] = useState("");
  const [date, setDate] = useState("");
  const [id, setId] = useState(0);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const handleSave = () => {
    // TODO ensure validation before closing
    // ? ensure that date is validated as well otherwise this will throw an error

    if (validated === true) {
      try {
        let newRecord = {
          recordName: recordName,
          date: date.toDate().toUTCString(),
          doctorNote: doctorNote,
          id: id,
        };

        console.log(newRecord);

        for (let i = 0; i < props.patientRecords.length; i++) {
          console.log(props.patientRecords[i]);
          if (
            props.patientRecords[i].recordName === newRecord.recordName &&
            props.patientRecords[i].doctorNote === newRecord.doctorNote &&
            props.patientRecords[i].date === newRecord.date
          ) {
            message.error("This record is already added, try new values!");
            props.setShowCreateModal(true);
            return;
          }
        }
        message.success("New record added successfully");
        props.setPatientRecords((prevState) => [...prevState, newRecord]);
        setId(id + 1);
        props.setShowCreateModal(false);
      } catch (err) {
        message.warning("Please choose a date!");
        props.setShowCreateModal(true);
      }
    }
  };

  const handleCancel = () => {
    props.setShowCreateModal(false);
  };

  return (
    <div style={{ fontSize: "18px", padding: "40px" }}>
      <Form noValidate validated={validated} onClick={handleSubmit}>
        <h1 style={{color:"#57625f"}}>Patient Record</h1>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="3">
            <p>Patient Name:</p>
          </Form.Label>
          <Col sm="9">
            <Form.Control
              type="text"
              placeholder={props.patientName}
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
            <Form.Control type="text" placeholder={props.provider} readOnly />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="3">
            <p>Date:</p>
          </Form.Label>
          <Col sm="4">
            <DatePicker
              showTime
              defaultValue={date}
              onChange={(date, dateString) => setDate(moment(date, dateFormat))}
              required
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
              placeholder={props.patientAddress}
              readOnly
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="3">
            <p>Doctor's Address:</p>
          </Form.Label>
          <Col sm="9">
            <Form.Control
              type="text"
              placeholder={props.doctorAddress}
              readOnly
            />
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
            onClick={handleSave}
          >
            Save
          </Button>
          <Button
            variant="danger"
            type="button"
            className="patient-create-btn"
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  );
}
