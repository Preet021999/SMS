import { useState, useEffect } from "react";
import { 
  Button, Form, Table, Badge, Card, 
  Container, Row, Col, Nav
} from "react-bootstrap";

const AttendanceManagement = () => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [students, setStudents] = useState([]);
  const [attendanceRecord, setAttendanceRecord] = useState({});
  const [savedRecords, setSavedRecords] = useState([]);
  const [viewMode, setViewMode] = useState("markAttendance");
  const [reportMonth, setReportMonth] = useState(new Date().getMonth() + 1);
  const [reportYear, setReportYear] = useState(new Date().getFullYear());
  
  // Mock student data
  useEffect(() => {
    if (selectedClass && selectedSection) {
      const mockStudents = [
        { id: 1, rollNumber: "001", name: "John Smith", class: "10", section: "A" },
        { id: 2, rollNumber: "002", name: "Emily Johnson", class: "10", section: "A" },
        { id: 3, rollNumber: "003", name: "Aiden Williams", class: "10", section: "A" },
        { id: 4, rollNumber: "004", name: "Sophia Brown", class: "10", section: "A" },
        { id: 5, rollNumber: "005", name: "Oliver Davis", class: "10", section: "A" },
        { id: 6, rollNumber: "001", name: "Emma Wilson", class: "10", section: "B" },
        { id: 7, rollNumber: "002", name: "Noah Garcia", class: "10", section: "B" },
        { id: 8, rollNumber: "001", name: "Isabella Moore", class: "9", section: "A" },
        { id: 9, rollNumber: "002", name: "Liam Taylor", class: "9", section: "A" }
      ];
      
      const filteredStudents = mockStudents.filter(
        student => student.class === selectedClass && student.section === selectedSection
      );
      
      setStudents(filteredStudents);
      
      // Initialize attendance record
      const attendanceObj = {};
      filteredStudents.forEach(student => {
        attendanceObj[student.id] = "present";
      });
      setAttendanceRecord(attendanceObj);
    } else {
      setStudents([]);
      setAttendanceRecord({});
    }
  }, [selectedClass, selectedSection]);
  
  // Mock saved attendance records
  useEffect(() => {
    setSavedRecords([
      { 
        id: 1, 
        date: "2025-04-20", 
        class: "10", 
        section: "A", 
        presentCount: 5, 
        absentCount: 0, 
        totalCount: 5,
        students: [
          { id: 1, name: "John Smith", status: "present" },
          { id: 2, name: "Emily Johnson", status: "present" },
          { id: 3, name: "Aiden Williams", status: "present" },
          { id: 4, name: "Sophia Brown", status: "present" },
          { id: 5, name: "Oliver Davis", status: "present" }
        ]
      },
      { 
        id: 2, 
        date: "2025-04-21", 
        class: "10", 
        section: "A", 
        presentCount: 4, 
        absentCount: 1, 
        totalCount: 5,
        students: [
          { id: 1, name: "John Smith", status: "present" },
          { id: 2, name: "Emily Johnson", status: "present" },
          { id: 3, name: "Aiden Williams", status: "absent" },
          { id: 4, name: "Sophia Brown", status: "present" },
          { id: 5, name: "Oliver Davis", status: "present" }
        ] 
      },
      { 
        id: 3, 
        date: "2025-04-21", 
        class: "10", 
        section: "B", 
        presentCount: 2, 
        absentCount: 0, 
        totalCount: 2,
        students: [
          { id: 6, name: "Emma Wilson", status: "present" },
          { id: 7, name: "Noah Garcia", status: "present" }
        ] 
      }
    ]);
  }, []);
  
  const handleAttendanceChange = (studentId, status) => {
    setAttendanceRecord(prev => ({
      ...prev,
      [studentId]: status
    }));
  };
  
  const saveAttendance = () => {
    const studentAttendance = students.map(student => ({
      id: student.id,
      name: student.name,
      status: attendanceRecord[student.id]
    }));
    
    const presentCount = studentAttendance.filter(s => s.status === "present").length;
    const absentCount = studentAttendance.filter(s => s.status === "absent").length;
    
    const newRecord = {
      id: savedRecords.length + 1,
      date,
      class: selectedClass,
      section: selectedSection,
      presentCount,
      absentCount,
      totalCount: students.length,
      students: studentAttendance
    };
    
    setSavedRecords([...savedRecords, newRecord]);
    alert("Attendance saved successfully!");
  };
  
  // Filter records for reports
  const filteredRecords = savedRecords.filter(record => {
    const recordDate = new Date(record.date);
    const recordMonth = recordDate.getMonth() + 1;
    const recordYear = recordDate.getFullYear();
    
    const matchesClass = selectedClass === "" || record.class === selectedClass;
    const matchesSection = selectedSection === "" || record.section === selectedSection;
    const matchesMonth = recordMonth === parseInt(reportMonth) && recordYear === parseInt(reportYear);
    
    return matchesClass && matchesSection && matchesMonth;
  });
  
  // Group records by date for report view
  const groupedRecords = filteredRecords.reduce((acc, record) => {
    const date = record.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(record);
    return acc;
  }, {});

  return (
    <Container fluid className="py-4">
      <Card className="shadow-sm">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="mb-0">Attendance Management</h4>
            <Nav variant="pills">
              <Nav.Item>
                <Nav.Link 
                  active={viewMode === "markAttendance"}
                  onClick={() => setViewMode("markAttendance")}
                >
                  Mark Attendance
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link 
                  active={viewMode === "viewReports"}
                  onClick={() => setViewMode("viewReports")}
                >
                  View Reports
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
          
          {viewMode === "markAttendance" ? (
            <>
              <Row className="g-3 mb-4">
                <Col xs={12} md={4}>
                  <Form.Group>
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} md={4}>
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
                      <option value="12">Class 12</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col xs={12} md={4}>
                  <Form.Group>
                    <Form.Label>Section</Form.Label>
                    <Form.Select
                      value={selectedSection}
                      onChange={(e) => setSelectedSection(e.target.value)}
                      disabled={!selectedClass}
                    >
                      <option value="">Select Section</option>
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              
              {students.length > 0 ? (
                <>
                  <div className="table-responsive">
                    <Table striped hover className="align-middle">
                      <thead>
                        <tr>
                          <th style={{ width: "15%" }}>Roll No</th>
                          <th>Student Name</th>
                          <th style={{ width: "30%" }}>Attendance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {students.map(student => (
                          <tr key={student.id}>
                            <td>{student.rollNumber}</td>
                            <td>{student.name}</td>
                            <td>
                              <div className="d-flex gap-3">
                                <Form.Check
                                  type="radio"
                                  label="Present"
                                  name={`attendance-${student.id}`}
                                  checked={attendanceRecord[student.id] === "present"}
                                  onChange={() => handleAttendanceChange(student.id, "present")}
                                  id={`present-${student.id}`}
                                />
                                <Form.Check
                                  type="radio"
                                  label="Absent"
                                  name={`attendance-${student.id}`}
                                  checked={attendanceRecord[student.id] === "absent"}
                                  onChange={() => handleAttendanceChange(student.id, "absent")}
                                  id={`absent-${student.id}`}
                                />
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                  <div className="d-flex justify-content-end mt-3">
                    <Button variant="primary" onClick={saveAttendance}>Save Attendance</Button>
                  </div>
                </>
              ) : (
                <Card className="text-center p-4 bg-light">
                  <Card.Body>
                    <p className="mb-0">
                      {selectedClass && selectedSection 
                        ? "No students found for this class and section."
                        : "Please select class and section to mark attendance."}
                    </p>
                  </Card.Body>
                </Card>
              )}
            </>
          ) : (
            <>
              <Row className="g-3 mb-4">
                <Col xs={12} md={3}>
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
                      <option value="12">Class 12</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col xs={12} md={3}>
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
                <Col xs={12} md={3}>
                  <Form.Group>
                    <Form.Label>Month</Form.Label>
                    <Form.Select
                      value={reportMonth}
                      onChange={(e) => setReportMonth(e.target.value)}
                    >
                      <option value="1">January</option>
                      <option value="2">February</option>
                      <option value="3">March</option>
                      <option value="4">April</option>
                      <option value="5">May</option>
                      <option value="6">June</option>
                      <option value="7">July</option>
                      <option value="8">August</option>
                      <option value="9">September</option>
                      <option value="10">October</option>
                      <option value="11">November</option>
                      <option value="12">December</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col xs={12} md={3}>
                  <Form.Group>
                    <Form.Label>Year</Form.Label>
                    <Form.Control
                      type="number"
                      value={reportYear}
                      onChange={(e) => setReportYear(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              
              {Object.keys(groupedRecords).length > 0 ? (
                Object.entries(groupedRecords).map(([date, records]) => (
                  <Card key={date} className="mb-3 shadow-sm">
                    <Card.Header className="bg-light">
                      <strong>{new Date(date).toLocaleDateString()}</strong>
                    </Card.Header>
                    <Card.Body className="p-0">
                      <div className="table-responsive">
                        <Table hover className="mb-0">
                          <thead>
                            <tr>
                              <th>Class</th>
                              <th>Section</th>
                              <th>Attendance Summary</th>
                              <th className="text-end">Details</th>
                            </tr>
                          </thead>
                          <tbody>
                            {records.map(record => (
                              <tr key={record.id}>
                                <td>{record.class}</td>
                                <td>{record.section}</td>
                                <td>
                                  <div className="d-flex flex-wrap gap-2">
                                    <Badge bg="success">Present: {record.presentCount}</Badge>
                                    <Badge bg="danger">Absent: {record.absentCount}</Badge>
                                    <Badge bg="info">Total: {record.totalCount}</Badge>
                                  </div>
                                </td>
                                <td className="text-end">
                                  <Button variant="outline-primary" size="sm">View</Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </div>
                    </Card.Body>
                  </Card>
                ))
              ) : (
                <Card className="text-center p-4 bg-light">
                  <Card.Body>
                    <p className="mb-0">No attendance records found for the selected criteria.</p>
                  </Card.Body>
                </Card>
              )}
            </>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AttendanceManagement;