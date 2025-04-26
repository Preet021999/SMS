import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Table from "react-bootstrap/Table";
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
      <div className="container-fluid mt-4 p-3 border rounded text-center" style={{ background: "#80808036" }}>
        <h3>Loading dashboard...</h3>
      </div>
    );
  }

  return (
    <div className="container-fluid mt-4 p-3 border rounded" style={{ background: "#80808036" }}>
      <Row className="mb-4">
        <Col>
          <h2>{getGreeting()}, Admin!</h2>
          <p>Here's an overview of your school management system</p>
        </Col>
      </Row>

      {/* Stats Cards */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center mb-3">
            <Card.Body>
              <Users size={32} color="#4287f5" className="mb-2" />
              <h5>Total Students</h5>
              <h2>{stats.studentCount}</h2>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center mb-3">
            <Card.Body>
              <Book size={32} color="#42f587" className="mb-2" />
              <h5>Total Classes</h5>
              <h2>{stats.classCount}</h2>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center mb-3">
            <Card.Body>
              <Users size={32} color="#8742f5" className="mb-2" />
              <h5>Total Teachers</h5>
              <h2>{stats.teacherCount}</h2>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center mb-3">
            <Card.Body>
              <Calendar size={32} color="#f54275" className="mb-2" />
              <h5>Attendance Rate</h5>
              <h2>{stats.attendanceRate}%</h2>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Quick Access Feature Cards */}
      <h4 className="mb-3">Quick Access</h4>
      <Row className="mb-4">
        {featureCards.map((card, index) => (
          <Col key={index} md={3} sm={6}>
            <Card 
              className="mb-3" 
              style={{ cursor: 'pointer', borderLeft: `4px solid ${card.color}` }}
              onClick={() => handleCardClick(card.route)}
            >
              <Card.Body>
                <div className="d-flex align-items-center">
                  <div style={{ padding: '10px', backgroundColor: `${card.color}20`, borderRadius: '50%', marginRight: '15px' }}>
                    {card.icon}
                  </div>
                  <div>
                    <h5 className="mb-0">{card.title}</h5>
                    <small>Manage {card.title.toLowerCase()}</small>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Row>
        {/* Attendance Chart */}
        <Col md={6} className="mb-4">
          <Card>
            <Card.Header>
              <h5 className="mb-0">Monthly Attendance Overview</h5>
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
        <Col md={6} className="mb-4">
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Upcoming Events</h5>
              <Badge bg="primary">New</Badge>
            </Card.Header>
            <Card.Body>
              <Table hover>
                <tbody>
                  {upcomingEvents.map(event => (
                    <tr key={event.id}>
                      <td><Calendar size={16} className="me-2" /> {event.title}</td>
                      <td className="text-end">{formatDate(event.date)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Recent Activities */}
      <Row>
        <Col md={12} className="mb-4">
          <Card>
            <Card.Header>
              <h5 className="mb-0">Recent Activities</h5>
            </Card.Header>
            <Card.Body>
              <Table hover>
                <tbody>
                  {recentActivities.map(activity => (
                    <tr key={activity.id}>
                      <td width="70%">
                        {activity.type === "Result" && <FileText size={16} className="me-2" />}
                        {activity.type === "Circular" && <Bell size={16} className="me-2" />}
                        {activity.type === "Student" && <Users size={16} className="me-2" />}
                        {activity.type === "Attendance" && <Calendar size={16} className="me-2" />}
                        {activity.title}
                      </td>
                      <td>
                        <Badge bg={
                          activity.type === "Result" ? "success" :
                          activity.type === "Circular" ? "info" :
                          activity.type === "Student" ? "primary" : "warning"
                        }>
                          {activity.type}
                        </Badge>
                      </td>
                      <td className="text-end">{formatDate(activity.date)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;