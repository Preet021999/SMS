import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import FormGroup from "react-bootstrap/esm/FormGroup";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Table from 'react-bootstrap/Table';
import OutlineButton from "../CommonLayout/OutlineButton.jsx";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap CSS is imported

const Employeemaster = () => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    middlename: "",
    lastname: "",
    dob: "",
    username: "",
    position: "",
    department: "",
  });
  const handleClose = () => setShow(false);
  const handleClick = (variant) => {
    setShow(true);
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`New Employee Added: ${formData.firstname} ${formData.middlename} ${formData.lastname}, ${formData.position}, ${formData.department}`);
    setFormData({ firstname: "", middlename: "", lastname: "", dob: "", username: "", position: "", department: "" });
    handleClose();
  };

  return (
    <div className="container-fluid mt-4 p-3 border rounded" style={{ background: "#80808036" }}>
      <Row className="align-items-center">
        <Col xs={12} md={8}>
          <h2>Employee Master</h2>
        </Col>
        <Col xs={12} md={4} className="d-flex justify-content-end mt-2 mt-md-0">
          <OutlineButton variant="primary" onClick={handleClick} ButtonName={'Add'} />
        </Col>
      </Row>
      <Row className="mt-4">
        <Col xs={12}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Position</th>
                <th>Department</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>John Doe</td>
                <td>Manager</td>
                <td>Sales</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jane Smith</td>
                <td>Developer</td>
                <td>IT</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Sam Wilson</td>
                <td>Designer</td>
                <td>Marketing</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
      {/* Add Employee Modal */}
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add New Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>First name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="First name"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Middle name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Middle name"
                    name="middlename"
                    value={formData.middlename}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Last name"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>User Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="User name"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="userpassword"
                    value={formData.userpassword}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>DOB</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="DOB"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Department</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Add Employee
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Employeemaster;
