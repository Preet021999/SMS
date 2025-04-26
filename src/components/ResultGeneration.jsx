import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Table from 'react-bootstrap/Table';
import { Card, Badge, Modal, Tab, Tabs } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const ResultGeneration = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedExam, setSelectedExam] = useState("");
  const [students, setStudents] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [markSubmitted, setMarkSubmitted] = useState(false);
  const [viewMode, setViewMode] = useState("enterMarks"); // enterMarks or viewResults
  
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
    debugger;
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

  return (
    <div className="container-fluid mt-4 p-3 border rounded" style={{ background: "#80808036" }}>
      <h2>Result Management</h2>
      
      <Row className="mb-4">
        <Col>
          <Button 
            variant={viewMode === "enterMarks" ? "primary" : "outline-primary"} 
            className="me-2"
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
        </Col>
      </Row>
      
      {viewMode === "enterMarks" ? (
        // Enter Marks UI
        <>
          <Row className="mb-4">
            <Col md={4}>
              <Form.Group>
                <Form.Label>Class</Form.Label>
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
            <Col md={4}>
              <Form.Group>
                <Form.Label>Section</Form.Label>
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
            <Col md={4}>
              <Form.Group>
                <Form.Label>Examination</Form.Label>
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
          
          {students.length > 0 && selectedExam ? (
            <>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th rowSpan="2">Roll No</th>
                    <th rowSpan="2">Student Name</th>
                    {subjects.map(subject => (
                      <th key={subject.id} colSpan="1">{subject.name}</th>
                    ))}
                    <th rowSpan="2">Actions</th>
                  </tr>
                  <tr>
                    {subjects.map(subject => (
                      <th key={`marks-${subject.id}`}>Marks (Max: {subject.maxMarks})</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {students.map(student => (
                    <tr key={student.id}>
                      <td>{student.rollNumber}</td>
                      <td>{student.name}</td>
                      {student.marks.map(mark => (
                        <td key={`${student.id}-${mark.subjectId}`}>
                          <Form.Control
                            type="number"
                            min="0"
                            max={mark.maxMarks}
                            value={mark.obtainedMarks}
                            onChange={(e) => handleMarksChange(student.id, mark.subjectId, e.target.value)}
                            style={{ width: '80px' }}
                          />
                        </td>
                      ))}
                      <td>
                        <Button 
                          variant="info" 
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
              <div className="d-flex justify-content-end">
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
              <div className="text-center p-4 border rounded">
                <p>Please select an examination to enter marks.</p>
              </div>
            ) : (
              <div className="text-center p-4 border rounded">
                <p>Please select class and section to continue.</p>
              </div>
            )
          )}
          
          {/* Preview Modal */}
          <Modal show={showPreview} onHide={handleClosePreview} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>Result Preview</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedStudent && (
                <div className="report-card">
                  <div className="text-center mb-4">
                    <h3>Crystal Public School</h3>
                    <h5>{selectedExam} - {selectedClass} {selectedSection}</h5>
                  </div>
                  
                  <Row className="mb-3">
                    <Col md={6}>
                      <p><strong>Student Name:</strong> {selectedStudent.name}</p>
                      <p><strong>Roll Number:</strong> {selectedStudent.rollNumber}</p>
                    </Col>
                    <Col md={6}>
                      <p><strong>Class:</strong> {selectedStudent.class}</p>
                      <p><strong>Section:</strong> {selectedStudent.section}</p>
                    </Col>
                  </Row>
                  
                  <Table bordered>
                    <thead>
                      <tr>
                        <th>Subject</th>
                        <th>Maximum Marks</th>
                        <th>Obtained Marks</th>
                        <th>Grade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedStudent.marks.map(mark => {
                        const percentage = (mark.obtainedMarks / mark.maxMarks) * 100;
                        const grade = getGrade(percentage);
                        return (
                          <tr key={mark.subjectId}>
                            <td>{mark.subjectName}</td>
                            <td>{mark.maxMarks}</td>
                            <td>{mark.obtainedMarks}</td>
                            <td>{grade}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                    <tfoot>
                      <tr>
                        <th>Total</th>
                        <th>{calculateTotal(selectedStudent.marks).maxTotal}</th>
                        <th>{calculateTotal(selectedStudent.marks).total}</th>
                        <th>{getGrade(calculateTotal(selectedStudent.marks).percentage)}</th>
                      </tr>
                      <tr>
                        <td colSpan="3"><strong>Percentage</strong></td>
                        <td><strong>{calculateTotal(selectedStudent.marks).percentage}%</strong></td>
                      </tr>
                    </tfoot>
                  </Table>
                  
                  <div className="mt-4">
                    <Row>
                      <Col md={6}>
                        <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
                      </Col>
                      <Col md={6} className="text-end">
                        <p><strong>Principal's Signature</strong></p>
                      </Col>
                    </Row>
                  </div>
                </div>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClosePreview}>
                Close
              </Button>
              <Button variant="primary">
                Print Report Card
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      ) : (
        // View Results UI
        <>
          <Row className="mb-4">
            <Col md={4}>
              <Form.Group>
                <Form.Label>Class</Form.Label>
                <Form.Select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                >
                  <option value="">All Classes</option>
                  <option value="9">Class 9</option>
                  <option value="10">Class 10</option>
                  <option value="11">Class 11</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Section</Form.Label>
                <Form.Select
                  value={selectedSection}
                  onChange={(e) => setSelectedSection(e.target.value)}
                >
                  <option value="">All Sections</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Examination</Form.Label>
                <Form.Select
                  value={selectedExam}
                  onChange={(e) => setSelectedExam(e.target.value)}
                >
                  <option value="">All Examinations</option>
                  <option value="Mid-Term Examination">Mid-Term Examination</option>
                  <option value="Final Examination">Final Examination</option>
                  <option value="Unit Test 1">Unit Test 1</option>
                  <option value="Unit Test 2">Unit Test 2</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Roll No</th>
                <th>Student Name</th>
                <th>Class</th>
                <th>Section</th>
                <th>Examination</th>
                <th>Total Marks</th>
                <th>Percentage</th>
                <th>Actions</th>
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
                    <td>{result.totalObtained}/{result.totalMax}</td>
                    <td>{result.percentage}%</td>
                    <td>
                      <Button variant="info" size="sm" className="me-2">
                        View
                      </Button>
                      <Button variant="success" size="sm">
                        Print
                      </Button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
        </>
      )}
    </div>
  );
};

export default ResultGeneration;