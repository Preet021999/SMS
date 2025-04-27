import { useState, useEffect } from "react";
import { 
  Button, 
  Col, 
  Form, 
  Row, 
  Table, 
  Modal, 
  FormControl, 
  InputGroup, 
  Container, 
  Card, 
  Badge 
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const StudentManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
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
        address: "123 Main St",
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
        address: "123 Main St",
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
        address: "123 Main St",
      },
    ]);
  }, []);

  const handleClose = () => {
    setShowModal(false);
    setIsEditMode(false);
  };
  
  const handleShow = () => {
    clearData();
    setIsEditMode(false);
    setShowModal(true);
  };

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
    setIsEditMode(true);
    setShowModal(true);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isEditMode) {
      // Handle updating existing student
      // This would need to be implemented
      handleClose();
      return;
    }
    
    const newStudent = {
      id: students.length + 1,
      ...formData,
      dateOfBirth: formData.dob,
      admissionNumber: `CPS2025${String(students.length + 1).padStart(3, "0")}`,
    };

    setStudents([...students, newStudent]);
    clearData();
    handleClose();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      setStudents(students.filter(student => student.id !== id));
    }
  };

  // Filter students based on search and class filter
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.admissionNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesClass =
      selectedClass === "" || student.class === selectedClass;

    return matchesSearch && matchesClass;
  });

  return (
    <Container fluid className="py-4">
      <Card className="shadow-sm">
        <Card.Header className="bg-white">
          <Row className="align-items-center">
            <Col xs={12} md={8}>
              <h4 className="mb-0">Student Management</h4>
            </Col>
            <Col xs={12} md={4} className="d-flex justify-content-md-end mt-3 mt-md-0">
              <Button 
                variant="primary" 
                onClick={handleShow}
                className="px-4"
              >
                <i className="bi bi-plus"></i> Add Student
              </Button>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <Row className="mb-4 g-3">
            <Col md={6} lg={8}>
              <InputGroup>
                <InputGroup.Text className="bg-white">
                  <i className="bi bi-search"></i>
                </InputGroup.Text>
                <FormControl
                  placeholder="Search by name, admission or roll number"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col md={6} lg={4}>
              <Form.Select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="h-100"
              >
                <option value="">All Classes</option>
                <option value="9">Class 9</option>
                <option value="10">Class 10</option>
                <option value="11">Class 11</option>
                <option value="12">Class 12</option>
              </Form.Select>
            </Col>
          </Row>

          <div className="table-responsive">
            <Table hover className="align-middle">
              <thead className="table-light">
                <tr>
                  <th>Adm. No.</th>
                  <th>Roll No.</th>
                  <th>Student Name</th>
                  <th className="d-none d-md-table-cell">Class</th>
                  <th className="d-none d-md-table-cell">Section</th>
                  <th className="d-none d-lg-table-cell">Parent Name</th>
                  <th className="d-none d-lg-table-cell">Contact</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
                    <tr key={student.id}>
                      <td>{student.admissionNumber}</td>
                      <td>{student.rollNumber}</td>
                      <td>
                        {`${student.firstName} ${student.middleName ? student.middleName + " " : ""}${student.lastName}`}
                        <div className="d-md-none mt-1">
                          <Badge bg="light" text="dark" className="me-1">
                            Class {student.class}-{student.section}
                          </Badge>
                        </div>
                      </td>
                      <td className="d-none d-md-table-cell">{student.class}</td>
                      <td className="d-none d-md-table-cell">{student.section}</td>
                      <td className="d-none d-lg-table-cell">{student.parentName}</td>
                      <td className="d-none d-lg-table-cell">{student.contactNumber}</td>
                      <td>
                        <div className="d-flex gap-2">
                          <Button
                            variant="outline-info"
                            size="sm"
                            onClick={() => viewStudentDetails(student)}
                          >
                            <i className="bi bi-eye"></i>
                          </Button>
                          <Button
                            variant="outline-warning"
                            size="sm"
                            onClick={() => viewStudentDetails(student)}
                          >
                            <i className="bi bi-pencil"></i>
                          </Button>
                          <Button 
                            variant="outline-danger" 
                            size="sm"
                            onClick={() => handleDelete(student.id)}
                          >
                            <i className="bi bi-trash"></i>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center py-4 text-muted">
                      No students found
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>

      {/* Student Modal */}
      <Modal show={showModal} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title>
            {isEditMode ? "Edit Student" : "Add New Student"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row className="g-3">
              <Col md={4}>
                <Form.Group>
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
                <Form.Group>
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
                <Form.Group>
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

              <Col md={4}>
                <Form.Group>
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
                <Form.Group>
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
                <Form.Group>
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

              <Col md={6}>
                <Form.Group>
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
                <Form.Group>
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

              <Col md={6}>
                <Form.Group>
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
                <Form.Group>
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

              <Col xs={12}>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>

              <Col xs={12}>
                <Form.Group>
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="d-flex justify-content-end gap-2 mt-4">
              <Button variant="light" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                {isEditMode ? "Update" : "Add"} Student
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default StudentManagement;