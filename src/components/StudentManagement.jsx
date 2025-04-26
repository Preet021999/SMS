import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import OutlineButton from "./CommonLayout/OutlineButton.jsx";
import { FormControl, InputGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const StudentManagement = () => {
  const [show, setShow] = useState(false);
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    admissionNumber: "",
    rollNumber: "",
    dob: "",
    gender: "",
    class: "",
    section: "",
    parentName: "",
    contactNumber: "",
    address: "",
    email: "",
  });

  // Mock data for initial display
  useEffect(() => {
    setStudents([
      {
        id: 1,
        firstName: "John",
        middleName: "",
        lastName: "Smith",
        admissionNumber: "CPS2025001",
        rollNumber: "001",
        class: "10",
        section: "A",
        parentName: "David Smith",
        contactNumber: "555-123-4567",
        dateOfBirth: "2005-05-15",
        gender: "Male",
        email: "david@gmail.com",
        address: "123 Main StP",
      },
      {
        id: 2,
        firstName: "Emily",
        middleName: "Rose",
        lastName: "Johnson",
        admissionNumber: "CPS2025002",
        rollNumber: "002",
        class: "10",
        section: "A",
        parentName: "Michael Johnson",
        contactNumber: "555-987-6543",
        dateOfBirth: "2005-05-15",
        gender: "Female",
        email: "emily@gmail.com",
        address: "123 Main StP",
      },
      {
        id: 3,
        firstName: "Aiden",
        middleName: "",
        lastName: "Williams",
        admissionNumber: "CPS2025003",
        rollNumber: "003",
        class: "9",
        section: "B",
        parentName: "Sarah Williams",
        contactNumber: "555-456-7890",
        dateOfBirth: "2005-05-15",
        gender: "Male",
        email: "aiden@gmail.com",
        address: "123 Main StP",
      },
    ]);
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => {setShow(true);clearData();};

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const clearData = () => {
    setFormData({
      firstName: "",
      middleName: "",
      lastName: "",
      admissionNumber: "",
      rollNumber: "",
      dob: "",
      gender: "",
      class: "",
      section: "",
      parentName: "",
      contactNumber: "",
      address: "",
      email: "",
    });
  };
  const viewStudentDetails = (student) => {
    setFormData({
      firstName: student.firstName,
      middleName: student.middleName,
      lastName: student.lastName,
      admissionNumber: student.admissionNumber,
      rollNumber: student.rollNumber,
      dob: student.dateOfBirth,
      gender: student.gender,
      class: student.class,
      section: student.section,
      parentName: student.parentName,
      contactNumber: student.contactNumber,
      address: student.address,
      email: student.email,
    });
    setShow(true);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const newStudent = {
      id: students.length + 1,
      ...formData,
      admissionNumber: `CPS2025${String(students.length + 1).padStart(3, "0")}`,
    };

    setStudents([...students, newStudent]);
    setFormData({
      firstName: "",
      middleName: "",
      lastName: "",
      admissionNumber: "",
      rollNumber: "",
      dob: "",
      gender: "",
      class: "",
      section: "",
      parentName: "",
      contactNumber: "",
      address: "",
      email: "",
    });
    handleClose();
  };

  // Filter students based on search and class filter
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.admissionNumber
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesClass =
      selectedClass === "" || student.class === selectedClass;

    return matchesSearch && matchesClass;
  });

  return (
    <div
      className="container-fluid mt-4 p-3 border rounded"
      style={{ background: "#80808036" }}
    >
      <Row className="align-items-center mb-4">
        <Col xs={12} md={8}>
          <h2>Student Management</h2>
        </Col>
        <Col xs={12} md={4} className="d-flex justify-content-end">
          <OutlineButton
            variant="primary"
            onClick={handleShow}
            ButtonName={"Add Student"}
          />
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={6}>
          <InputGroup>
            <FormControl
              placeholder="Search by name, admission or roll number"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col md={6}>
          <Form.Select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <option value="">All Classes</option>
            <option value="9">Class 9</option>
            <option value="10">Class 10</option>
            <option value="11">Class 11</option>
            <option value="12">Class 12</option>
          </Form.Select>
        </Col>
      </Row>

      <Row>
        <Col xs={12}>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Adm. No.</th>
                <th>Roll No.</th>
                <th>Student Name</th>
                <th>Class</th>
                <th>Section</th>
                <th>Parent Name</th>
                <th>Contact</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id}>
                  <td>{student.admissionNumber}</td>
                  <td>{student.rollNumber}</td>
                  <td>{`${student.firstName} ${
                    student.middleName ? student.middleName + " " : ""
                  }${student.lastName}`}</td>
                  <td>{student.class}</td>
                  <td>{student.section}</td>
                  <td>{student.parentName}</td>
                  <td>{student.contactNumber}</td>
                  <td>
                    <Button
                      variant="info"
                      size="sm"
                      className="me-2"
                      onClick={() => {
                        viewStudentDetails(student);
                      }}
                    >
                      View
                    </Button>
                    <Button
                      variant="warning"
                      size="sm"
                      className="me-2"
                      onClick={() => {
                        viewStudentDetails(student);
                      }}
                    >
                      Edit
                    </Button>
                    <Button variant="danger" size="sm">
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      {/* Add Student Modal */}
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add New Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Middle Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="middleName"
                    value={formData.middleName}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Roll Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="rollNumber"
                    value={formData.rollNumber}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Gender</Form.Label>
                  <Form.Select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Class</Form.Label>
                  <Form.Select
                    name="class"
                    value={formData.class}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Class</option>
                    <option value="9">Class 9</option>
                    <option value="10">Class 10</option>
                    <option value="11">Class 11</option>
                    <option value="12">Class 12</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Section</Form.Label>
                  <Form.Select
                    name="section"
                    value={formData.section}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Section</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Parent/Guardian Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="parentName"
                    value={formData.parentName}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Contact Number</Form.Label>
                  <Form.Control
                    type="tel"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose} name="close">
                Close
              </Button>
              <Button variant="primary" type="submit" name="saveStudent">
                Add Student
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default StudentManagement;
