import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Book, Users, Calendar, Award, Bell, FileText } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    studentCount: 0,
    teacherCount: 0,
    classCount: 0,
    attendanceRate: 0,
  });
  const [recentActivities, setRecentActivities] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);

  // Check if the user is authenticated
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    } else {
      // Simulate loading data
      setTimeout(() => {
        // Mock statistics data
        setStats({
          studentCount: 412,
          teacherCount: 28,
          classCount: 16,
          attendanceRate: 94,
        });

        // Mock recent activities
        setRecentActivities([
          { id: 1, type: "Result", title: "Mid-Term Results Published", date: "2025-04-22" },
          { id: 2, type: "Circular", title: "Annual Sports Day Announcement", date: "2025-04-20" },
          { id: 3, type: "Student", title: "New Student Enrolled: Sophia Brown", date: "2025-04-18" },
          { id: 4, type: "Attendance", title: "Class 10A Attendance Updated", date: "2025-04-17" },
        ]);

        // Mock upcoming events
        setUpcomingEvents([
          { id: 1, title: "Parent-Teacher Meeting", date: "2025-04-25" },
          { id: 2, title: "Annual Sports Day", date: "2025-05-15" },
          { id: 3, title: "Science Exhibition", date: "2025-05-10" },
        ]);

        // Mock attendance chart data
        setAttendanceData([
          { month: 'Jan', attendance: 92 },
          { month: 'Feb', attendance: 95 },
          { month: 'Mar', attendance: 93 },
          { month: 'Apr', attendance: 94 },
        ]);

        setLoading(false);
      }, 800);
    }
  }, [isAuthenticated, navigate]);

  // Get current time-appropriate greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  // Quick links handler
  const handleCardClick = (route) => {
    navigate(route);
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Feature cards configuration
  const featureCards = [
    { title: "Students", icon: <Users size={24} />, color: "#4287f5", route: "/student-management" },
    { title: "Attendance", icon: <Calendar size={24} />, color: "#42c5f5", route: "/attendance-management" },
    { title: "Results", icon: <Award size={24} />, color: "#f54242", route: "/result-generation" },
    { title: "Circulars", icon: <Bell size={24} />, color: "#f5a742", route: "/circular-management" },
  ];

  if (loading) {
    return (
      <Container fluid className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container fluid className="py-4">
      <Row className="mb-4">
        <Col>
          <h2 className="fw-bold">{getGreeting()}, Admin</h2>
          <p className="text-muted">School management system overview</p>
        </Col>
      </Row>

      {/* Stats Cards */}
      <Row className="mb-4 g-3">
        <Col xs={12} sm={6} md={3}>
          <Card className="h-100 shadow-sm border-0">
            <Card.Body className="text-center">
              <Users size={32} color="#4287f5" className="mb-2" />
              <h6 className="text-muted">TOTAL STUDENTS</h6>
              <h2 className="fw-bold">{stats.studentCount}</h2>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={3}>
          <Card className="h-100 shadow-sm border-0">
            <Card.Body className="text-center">
              <Book size={32} color="#42f587" className="mb-2" />
              <h6 className="text-muted">TOTAL CLASSES</h6>
              <h2 className="fw-bold">{stats.classCount}</h2>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={3}>
          <Card className="h-100 shadow-sm border-0">
            <Card.Body className="text-center">
              <Users size={32} color="#8742f5" className="mb-2" />
              <h6 className="text-muted">TOTAL TEACHERS</h6>
              <h2 className="fw-bold">{stats.teacherCount}</h2>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={3}>
          <Card className="h-100 shadow-sm border-0">
            <Card.Body className="text-center">
              <Calendar size={32} color="#f54275" className="mb-2" />
              <h6 className="text-muted">ATTENDANCE RATE</h6>
              <h2 className="fw-bold">{stats.attendanceRate}%</h2>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Quick Access Feature Cards */}
      <h5 className="mb-3 fw-bold">Quick Access</h5>
      <Row className="mb-4 g-3">
        {featureCards.map((card, index) => (
          <Col key={index} xs={12} sm={6} md={3}>
            <Card 
              className="shadow-sm border-0 h-100" 
              style={{ cursor: 'pointer', borderLeft: `4px solid ${card.color}` }}
              onClick={() => handleCardClick(card.route)}
            >
              <Card.Body>
                <div className="d-flex align-items-center">
                  <div style={{ padding: '10px', backgroundColor: `${card.color}20`, borderRadius: '50%', marginRight: '15px' }}>
                    {card.icon}
                  </div>
                  <div>
                    <h6 className="mb-0 fw-bold">{card.title}</h6>
                    <small className="text-muted">Manage {card.title.toLowerCase()}</small>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Row className="g-4">
        {/* Attendance Chart */}
        <Col lg={6} className="mb-4">
          <Card className="shadow-sm border-0 h-100">
            <Card.Header className="bg-white border-0 pt-3">
              <h5 className="mb-0 fw-bold">Monthly Attendance Overview</h5>
            </Card.Header>
            <Card.Body>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[85, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="attendance" stroke="#4287f5" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>

        {/* Upcoming Events */}
        <Col lg={6} className="mb-4">
          <Card className="shadow-sm border-0 h-100">
            <Card.Header className="bg-white border-0 pt-3 d-flex justify-content-between align-items-center">
              <h5 className="mb-0 fw-bold">Upcoming Events</h5>
              <Badge bg="primary" pill>New</Badge>
            </Card.Header>
            <Card.Body className="pb-2">
              <div className="table-responsive">
                <Table hover borderless className="align-middle">
                  <tbody>
                    {upcomingEvents.map(event => (
                      <tr key={event.id}>
                        <td><Calendar size={16} className="me-2 text-primary" /> {event.title}</td>
                        <td className="text-end text-muted">{formatDate(event.date)}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Recent Activities */}
      <Row>
        <Col xs={12} className="mb-4">
          <Card className="shadow-sm border-0">
            <Card.Header className="bg-white border-0 pt-3">
              <h5 className="mb-0 fw-bold">Recent Activities</h5>
            </Card.Header>
            <Card.Body className="pb-2">
              <div className="table-responsive">
                <Table hover borderless className="align-middle">
                  <tbody>
                    {recentActivities.map(activity => (
                      <tr key={activity.id}>
                        <td>
                          {activity.type === "Result" && <FileText size={16} className="me-2 text-success" />}
                          {activity.type === "Circular" && <Bell size={16} className="me-2 text-info" />}
                          {activity.type === "Student" && <Users size={16} className="me-2 text-primary" />}
                          {activity.type === "Attendance" && <Calendar size={16} className="me-2 text-warning" />}
                          {activity.title}
                        </td>
                        <td>
                          <Badge pill bg={
                            activity.type === "Result" ? "success" :
                            activity.type === "Circular" ? "info" :
                            activity.type === "Student" ? "primary" : "warning"
                          }>
                            {activity.type}
                          </Badge>
                        </td>
                        <td className="text-end text-muted">{formatDate(activity.date)}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;