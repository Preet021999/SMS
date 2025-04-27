import { useState, useEffect } from "react";
import { 
  Button, Container, Form, Table, Row, Col, Card, 
  Badge, Modal, Tab, Tabs, Alert
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const ResultGeneration = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedExam, setSelectedExam] = useState("");
  const [students, setStudents] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [markSubmitted, setMarkSubmitted] = useState(false);
  const [viewMode, setViewMode] = useState("enterMarks");
  
  // Subject list
  const subjects = [
    { id: 1, name: "English", maxMarks: 100 },
    { id: 2, name: "Mathematics", maxMarks: 100 },
    { id: 3, name: "Science", maxMarks: 100 },
    { id: 4, name: "Social Science", maxMarks: 100 },
    { id: 5, name: "Computer Science", maxMarks: 100 }
  ];
  
  // Mock student data
  useEffect(() => {
    // Remove debugger statement
    if (selectedClass && selectedSection) {
      const mockStudents = [
        { 
          id: 1, 
          rollNumber: "001", 
          name: "John Smith", 
          class: "10", 
          section: "A",
          marks: subjects.map(subject => ({ 
            subjectId: subject.id, 
            subjectName: subject.name, 
            obtainedMarks: "", 
            maxMarks: subject.maxMarks 
          }))
        },
        { 
          id: 2, 
          rollNumber: "002", 
          name: "Emily Johnson", 
          class: "11", 
          section: "A",
          marks: subjects.map(subject => ({ 
            subjectId: subject.id, 
            subjectName: subject.name, 
            obtainedMarks: "", 
            maxMarks: subject.maxMarks 
          }))
        },
        { 
          id: 3, 
          rollNumber: "003", 
          name: "Aiden Williams", 
          class: "9", 
          section: "A",
          marks: subjects.map(subject => ({ 
            subjectId: subject.id, 
            subjectName: subject.name, 
            obtainedMarks: "", 
            maxMarks: subject.maxMarks 
          }))
        }
      ];
      
      const filteredStudents = mockStudents.filter(
        student => student.class === selectedClass && student.section === selectedSection
      );
      
      setStudents(filteredStudents);
    } else {
      setStudents([]);
    }
  }, [selectedClass, selectedSection]);
  
  // Mock saved results
  const savedResults = [
    {
      id: 1,
      examName: "Mid-Term Examination",
      class: "10",
      section: "A",
      studentId: 1,
      studentName: "John Smith",
      rollNumber: "001",
      totalObtained: 460,
      totalMax: 500,
      percentage: 92,
      grades: [
        { subjectName: "English", obtainedMarks: 87, maxMarks: 100, grade: "A" },
        { subjectName: "Mathematics", obtainedMarks: 95, maxMarks: 100, grade: "A+" },
        { subjectName: "Science", obtainedMarks: 92, maxMarks: 100, grade: "A" },
        { subjectName: "Social Science", obtainedMarks: 89, maxMarks: 100, grade: "A" },
        { subjectName: "Computer Science", obtainedMarks: 97, maxMarks: 100, grade: "A+" }
      ]
    },
    {
      id: 2,
      examName: "Mid-Term Examination",
      class: "11",
      section: "A",
      studentId: 2,
      studentName: "Emily Johnson",
      rollNumber: "002",
      totalObtained: 432,
      totalMax: 500,
      percentage: 86.4,
      grades: [
        { subjectName: "English", obtainedMarks: 90, maxMarks: 100, grade: "A" },
        { subjectName: "Mathematics", obtainedMarks: 82, maxMarks: 100, grade: "B+" },
        { subjectName: "Science", obtainedMarks: 88, maxMarks: 100, grade: "A" },
        { subjectName: "Social Science", obtainedMarks: 78, maxMarks: 100, grade: "B" },
        { subjectName: "Computer Science", obtainedMarks: 94, maxMarks: 100, grade: "A" }
      ]
    },
    {
      id: 3,
      examName: "Mid-Term Examination",
      class: "9",
      section: "A",
      studentId: 3,
      studentName: "Aiden Williams",
      rollNumber: "003",
      totalObtained: 432,
      totalMax: 500,
      percentage: 86.4,
      grades: [
        { subjectName: "English", obtainedMarks: 90, maxMarks: 100, grade: "A" },
        { subjectName: "Mathematics", obtainedMarks: 82, maxMarks: 100, grade: "B+" },
        { subjectName: "Science", obtainedMarks: 88, maxMarks: 100, grade: "A" },
        { subjectName: "Social Science", obtainedMarks: 78, maxMarks: 100, grade: "B" },
        { subjectName: "Computer Science", obtainedMarks: 94, maxMarks: 100, grade: "A" }
      ]
    }
  ];
  
  const handleMarksChange = (studentId, subjectId, value) => {
    // Validate input as a number between 0 and max marks
    if (value === "" || (Number(value) >= 0 && Number(value) <= 100)) {
      setStudents(prevStudents => 
        prevStudents.map(student => {
          if (student.id === studentId) {
            return {
              ...student,
              marks: student.marks.map(mark => 
                mark.subjectId === subjectId 
                  ? { ...mark, obtainedMarks: value } 
                  : mark
              )
            };
          }
          return student;
        })
      );
    }
  };
  
  const getGrade = (percentage) => {
    if (percentage >= 90) return "A+";
    if (percentage >= 80) return "A";
    if (percentage >= 70) return "B+";
    if (percentage >= 60) return "B";
    if (percentage >= 50) return "C";
    if (percentage >= 40) return "D";
    return "F";
  };
  
  const calculateTotal = (marks) => {
    const total = marks.reduce((sum, mark) => {
      return sum + (mark.obtainedMarks === "" ? 0 : Number(mark.obtainedMarks));
    }, 0);
    
    const maxTotal = marks.reduce((sum, mark) => sum + mark.maxMarks, 0);
    
    return { total, maxTotal, percentage: (total / maxTotal * 100).toFixed(2) };
  };
  
  const handlePreviewReport = (student) => {
    setSelectedStudent(student);
    setShowPreview(true);
  };
  
  const handleClosePreview = () => {
    setShowPreview(false);
    setSelectedStudent(null);
  };
  
  const saveResults = () => {
    setMarkSubmitted(true);
    alert("Results saved successfully!");
  };

  // Filter component for both enter/view marks sections
  const FilterControls = () => (
    <Card className="shadow-sm mb-4">
      <Card.Body>
        <Row>
          <Col md={4} sm={12} className="mb-3 mb-md-0">
            <Form.Group>
              <Form.Label className="fw-bold">Class</Form.Label>
              <Form.Select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                <option value="">Select Class</option>
                <option value="9">Class 9</option>
                <option value="10">Class 10</option>
                <option value="11">Class 11</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={4} sm={12} className="mb-3 mb-md-0">
            <Form.Group>
              <Form.Label className="fw-bold">Section</Form.Label>
              <Form.Select
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
                disabled={!selectedClass}
              >
                <option value="">Select Section</option>
                <option value="A">A</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={4} sm={12}>
            <Form.Group>
              <Form.Label className="fw-bold">Examination</Form.Label>
              <Form.Select
                value={selectedExam}
                onChange={(e) => setSelectedExam(e.target.value)}
              >
                <option value="">Select Examination</option>
                <option value="Mid-Term Examination">Mid-Term Examination</option>
                <option value="Final Examination">Final Examination</option>
                <option value="Unit Test 1">Unit Test 1</option>
                <option value="Unit Test 2">Unit Test 2</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );

  // View for empty or loading state
  const EmptyState = ({ message }) => (
    <Card className="text-center border-0 shadow-sm p-4">
      <Card.Body>
        <p className="text-muted my-4">{message}</p>
      </Card.Body>
    </Card>
  );

  return (
    <Container fluid className="py-4">
      <Card className="border-0 shadow">
        <Card.Header className="bg-white border-0 pt-4 px-4">
          <Row className="align-items-center">
            <Col>
              <h4 className="mb-0">Result Management</h4>
            </Col>
            <Col xs="auto">
              <div className="btn-group">
                <Button 
                  variant={viewMode === "enterMarks" ? "primary" : "outline-primary"} 
                  onClick={() => setViewMode("enterMarks")}
                >
                  Enter Marks
                </Button>
                <Button 
                  variant={viewMode === "viewResults" ? "primary" : "outline-primary"}
                  onClick={() => setViewMode("viewResults")}
                >
                  View Results
                </Button>
              </div>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body className="px-4 pb-4">
          {viewMode === "enterMarks" ? (
            // Enter Marks UI
            <>
              <FilterControls />
              
              {students.length > 0 && selectedExam ? (
                <>
                  {markSubmitted && (
                    <Alert variant="success" className="mb-4" dismissible onClose={() => setMarkSubmitted(false)}>
                      Results saved successfully!
                    </Alert>
                  )}
                  
                  <div className="table-responsive">
                    <Table hover className="border">
                      <thead className="bg-light">
                        <tr>
                          <th className="align-middle">Roll No</th>
                          <th className="align-middle">Student Name</th>
                          {subjects.map(subject => (
                            <th key={subject.id} className="text-center">
                              {subject.name}
                              <div className="small text-muted">Max: {subject.maxMarks}</div>
                            </th>
                          ))}
                          <th className="text-center align-middle">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {students.map(student => (
                          <tr key={student.id}>
                            <td className="align-middle">{student.rollNumber}</td>
                            <td className="align-middle">{student.name}</td>
                            {student.marks.map(mark => (
                              <td key={`${student.id}-${mark.subjectId}`} className="text-center">
                                <Form.Control
                                  type="number"
                                  min="0"
                                  max={mark.maxMarks}
                                  value={mark.obtainedMarks}
                                  onChange={(e) => handleMarksChange(student.id, mark.subjectId, e.target.value)}
                                  className="mx-auto"
                                  style={{ width: '80px' }}
                                />
                              </td>
                            ))}
                            <td className="text-center">
                              <Button 
                                variant="outline-primary" 
                                size="sm"
                                onClick={() => handlePreviewReport(student)}
                                disabled={student.marks.some(mark => mark.obtainedMarks === "")}
                              >
                                Preview
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                  
                  <div className="d-flex justify-content-end mt-4">
                    <Button 
                      variant="primary" 
                      onClick={saveResults}
                      disabled={students.some(student => 
                        student.marks.some(mark => mark.obtainedMarks === "")
                      )}
                    >
                      Save Results
                    </Button>
                  </div>
                </>
              ) : (
                (selectedClass && selectedSection) ? (
                  <EmptyState message="Please select an examination to enter marks." />
                ) : (
                  <EmptyState message="Please select class and section to continue." />
                )
              )}
            </>
          ) : (
            // View Results UI
            <>
              <FilterControls />
              
              <div className="table-responsive">
                <Table hover className="border">
                  <thead className="bg-light">
                    <tr>
                      <th>Roll No</th>
                      <th>Student Name</th>
                      <th>Class</th>
                      <th>Section</th>
                      <th>Examination</th>
                      <th>Total Marks</th>
                      <th>Percentage</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {savedResults
                      .filter(result => 
                        (selectedClass === "" || result.class === selectedClass) &&
                        (selectedSection === "" || result.section === selectedSection) &&
                        (selectedExam === "" || result.examName === selectedExam)
                      )
                      .map(result => (
                        <tr key={result.id}>
                          <td>{result.rollNumber}</td>
                          <td>{result.studentName}</td>
                          <td>{result.class}</td>
                          <td>{result.section}</td>
                          <td>{result.examName}</td>
                          <td>
                            <Badge bg="primary" pill className="px-3 py-2">{result.totalObtained}/{result.totalMax}</Badge>
                          </td>
                          <td>
                            <Badge 
                              bg={result.percentage >= 80 ? "success" : result.percentage >= 60 ? "warning" : "danger"} 
                              pill 
                              className="px-3 py-2"
                            >
                              {result.percentage}%
                            </Badge>
                          </td>
                          <td className="text-center">
                            <Button variant="outline-primary" size="sm" className="me-2">
                              View
                            </Button>
                            <Button variant="outline-success" size="sm">
                              Print
                            </Button>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </Table>
              </div>
              
              {savedResults.filter(result => 
                (selectedClass === "" || result.class === selectedClass) &&
                (selectedSection === "" || result.section === selectedSection) &&
                (selectedExam === "" || result.examName === selectedExam)
              ).length === 0 && (
                <EmptyState message="No results found for the selected criteria." />
              )}
            </>
          )}
        </Card.Body>
      </Card>
      
      {/* Preview Modal */}
      <Modal show={showPreview} onHide={handleClosePreview} size="lg" centered>
        <Modal.Header closeButton className="border-0">
          <Modal.Title>Result Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body className="px-4">
          {selectedStudent && (
            <div className="report-card">
              <div className="text-center mb-4">
                <h3>Crystal Public School</h3>
                <h5 className="text-muted">{selectedExam} - Class {selectedClass} {selectedSection}</h5>
                <hr />
              </div>
              
              <Card className="mb-4 shadow-sm">
                <Card.Body>
                  <Row>
                    <Col md={6} sm={12} className="mb-3 mb-md-0">
                      <p className="mb-2"><strong>Student Name:</strong> {selectedStudent.name}</p>
                      <p className="mb-0"><strong>Roll Number:</strong> {selectedStudent.rollNumber}</p>
                    </Col>
                    <Col md={6} sm={12}>
                      <p className="mb-2"><strong>Class:</strong> {selectedStudent.class}</p>
                      <p className="mb-0"><strong>Section:</strong> {selectedStudent.section}</p>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
              
              <div className="table-responsive">
                <Table bordered hover>
                  <thead className="bg-light">
                    <tr>
                      <th>Subject</th>
                      <th className="text-center">Maximum Marks</th>
                      <th className="text-center">Obtained Marks</th>
                      <th className="text-center">Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedStudent.marks.map(mark => {
                      const percentage = (mark.obtainedMarks / mark.maxMarks) * 100;
                      const grade = getGrade(percentage);
                      return (
                        <tr key={mark.subjectId}>
                          <td>{mark.subjectName}</td>
                          <td className="text-center">{mark.maxMarks}</td>
                          <td className="text-center">{mark.obtainedMarks}</td>
                          <td className="text-center">
                            <Badge 
                              bg={
                                grade === "A+" || grade === "A" ? "success" : 
                                grade === "B+" || grade === "B" ? "primary" :
                                grade === "C" ? "warning" : "danger"
                              } 
                              pill
                            >
                              {grade}
                            </Badge>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot className="fw-bold">
                    <tr>
                      <td>Total</td>
                      <td className="text-center">{calculateTotal(selectedStudent.marks).maxTotal}</td>
                      <td className="text-center">{calculateTotal(selectedStudent.marks).total}</td>
                      <td className="text-center">
                        <Badge 
                          bg="dark" 
                          pill
                        >
                          {getGrade(calculateTotal(selectedStudent.marks).percentage)}
                        </Badge>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="3" className="text-end">Percentage</td>
                      <td className="text-center">
                        <Badge 
                          bg="primary" 
                          pill
                          className="px-3 py-2"
                        >
                          {calculateTotal(selectedStudent.marks).percentage}%
                        </Badge>
                      </td>
                    </tr>
                  </tfoot>
                </Table>
              </div>
              
              <div className="mt-4 pt-3 border-top">
                <Row>
                  <Col md={6} sm={12} className="mb-3 mb-md-0">
                    <p className="mb-0"><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
                  </Col>
                  <Col md={6} sm={12} className="text-md-end">
                    <p className="mb-0"><strong>Principal's Signature</strong></p>
                  </Col>
                </Row>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer className="border-0">
          <Button variant="outline-secondary" onClick={handleClosePreview}>
            Close
          </Button>
          <Button variant="primary">
            Print Report Card
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ResultGeneration;