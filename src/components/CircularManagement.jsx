import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Badge from "react-bootstrap/Badge";
import { FormControl, InputGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const CircularsManagement = () => {
  const [show, setShow] = useState(false);
  const [circulars, setCirculars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    issueDate: new Date().toISOString().split('T')[0],
    targetAudience: []
  });
  const clearData = () =>{
    setFormData({
      title: "",
      content: "",
      category: "",
      issueDate: new Date().toISOString().split('T')[0],
      targetAudience: []
    });
  }
  const editCircular = (circular) => {
    setFormData({
      title: circular.title,
      content: circular.content,
      category: circular.category,
      issueDate: circular.issueDate,
      targetAudience: circular.targetAudience
    });
    setShow(true);
  };
  // Mock data
  useEffect(() => {
    const mockCirculars = [
      {
        id: 1,
        title: "Annual Sports Day",
        content: "The annual sports day will be held on May 15, 2025. All students are required to participate in at least one event. Parents are cordially invited to attend the event.",
        category: "Events",
        issueDate: "2025-04-10",
        targetAudience: ["Students", "Parents", "Teachers"],
        isActive: true
      },
      {
        id: 2,
        title: "Final Examination Schedule",
        content: "The final examination for the academic year 2024-2025 will commence from June 5, 2025. The detailed schedule has been shared with class teachers. Students are advised to prepare accordingly.",
        category: "Examination",
        issueDate: "2025-04-15",
        targetAudience: ["Students", "Parents", "Teachers"],
        isActive: true
      },
      {
        id: 3,
        title: "Parent-Teacher Meeting",
        content: "A parent-teacher meeting is scheduled for April 25, 2025, to discuss the academic progress of students. Parents are requested to attend without fail.",
        category: "Meetings",
        issueDate: "2025-04-18",
        targetAudience: ["Parents", "Teachers"],
        isActive: true
      }
    ];
    
    setCirculars(mockCirculars);
  }, []);
  
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    clearData();
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleCheckboxChange = (value) => {
    const currentTargets = [...formData.targetAudience];
    if (currentTargets.includes(value)) {
      setFormData({
        ...formData,
        targetAudience: currentTargets.filter(target => target !== value)
      });
    } else {
      setFormData({
        ...formData,
        targetAudience: [...currentTargets, value]
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCircular = {
      id: circulars.length + 1,
      ...formData,
      isActive: true
    };
    
    setCirculars([newCircular, ...circulars]);
    setFormData({
      title: "",
      content: "",
      category: "",
      issueDate: new Date().toISOString().split('T')[0],
      targetAudience: []
    });
    handleClose();
  };
  
  const toggleCircularStatus = (id) => {
    setCirculars(circulars.map(circular => 
      circular.id === id 
        ? { ...circular, isActive: !circular.isActive } 
        : circular
    ));
  };
  
  // Filter circulars based on search and category filter
  const filteredCirculars = circulars.filter(circular => {
    const matchesSearch = 
      circular.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      circular.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = 
      filterCategory === "" || circular.category === filterCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  // Get unique categories for filter
  const categories = [...new Set(circulars.map(circular => circular.category))];

  return (
    <div className="container-fluid mt-4 p-3 border rounded" style={{ background: "#80808036" }}>
      <Row className="align-items-center mb-4">
        <Col xs={12} md={8}>
          <h2>Circulars Management</h2>
        </Col>
        <Col xs={12} md={4} className="d-flex justify-content-end">
          <Button variant="primary" onClick={handleShow}>
            Create New Circular
          </Button>
        </Col>
      </Row>
      
      <Row className="mb-4">
        <Col md={8}>
          <InputGroup>
            <FormControl
              placeholder="Search circulars..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col md={4}>
          <Form.Select 
            value={filterCategory} 
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </Form.Select>
        </Col>
      </Row>
      
      {filteredCirculars.length > 0 ? (
        filteredCirculars.map(circular => (
          <Card key={circular.id} className="mb-3">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <div>
                <h5 className="mb-0">{circular.title}</h5>
                <small>
                  Category: {circular.category} | 
                  Issue Date: {new Date(circular.issueDate).toLocaleDateString()}
                </small>
              </div>
              <Badge bg={circular.isActive ? "success" : "secondary"}>
                {circular.isActive ? "Active" : "Archived"}
              </Badge>
            </Card.Header>
            <Card.Body>
              <Card.Text>{circular.content}</Card.Text>
              <div className="mb-3">
                <strong>Target Audience: </strong>
                {circular.targetAudience.map((audience, index) => (
                  <Badge key={index} bg="info" className="me-2">{audience}</Badge>
                ))}
              </div>
              <div className="d-flex justify-content-end">
                <Button variant="outline-primary" size="sm" className="me-2"
                    onClick={() =>{
                      editCircular(circular);
                    }}>
                  Edit
                </Button>
                <Button 
                  variant={circular.isActive ? "outline-secondary" : "outline-success"} 
                  size="sm"
                  onClick={() => toggleCircularStatus(circular.id)}
                >
                  {circular.isActive ? "Archive" : "Restore"}
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))
      ) : (
        <div className="text-center p-4 border rounded">
          <p>No circulars found matching your search criteria.</p>
        </div>
      )}
      
      {/* Create Circular Modal */}
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Create New Circular</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Form.Group>
            
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Events">Events</option>
                    <option value="Examination">Examination</option>
                    <option value="Holidays">Holidays</option>
                    <option value="Meetings">Meetings</option>
                    <option value="General">General</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Issue Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="issueDate"
                    value={formData.issueDate}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <Form.Group className="mb-3">
              <Form.Label>Target Audience</Form.Label>
              <div>
                <Form.Check
                  inline
                  type="checkbox"
                  label="Students"
                  checked={formData.targetAudience.includes("Students")}
                  onChange={() => handleCheckboxChange("Students")}
                />
                <Form.Check
                  inline
                  type="checkbox"
                  label="Parents"
                  checked={formData.targetAudience.includes("Parents")}
                  onChange={() => handleCheckboxChange("Parents")}
                />
                <Form.Check
                  inline
                  type="checkbox"
                  label="Teachers"
                  checked={formData.targetAudience.includes("Teachers")}
                  onChange={() => handleCheckboxChange("Teachers")}
                />
                <Form.Check
                  inline
                  type="checkbox"
                  label="Staff"
                  checked={formData.targetAudience.includes("Staff")}
                  onChange={() => handleCheckboxChange("Staff")}
                />
              </div>
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={6}
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
              />
            </Form.Group>
            
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Create Circular
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CircularsManagement;