import { useState, useEffect } from "react";
import { 
  Button, Form, Card, Modal, Badge, 
  Container, Row, Col, InputGroup, FormControl 
} from "react-bootstrap";

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
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

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
  
  const clearForm = () => {
    setFormData({
      title: "",
      content: "",
      category: "",
      issueDate: new Date().toISOString().split('T')[0],
      targetAudience: []
    });
    setIsEditing(false);
    setCurrentId(null);
  };
  
  const handleClose = () => {
    setShow(false);
    clearForm();
  };
  
  const handleShow = () => {
    setShow(true);
    clearForm();
  };
  
  const editCircular = (circular) => {
    setCurrentId(circular.id);
    setFormData({
      title: circular.title,
      content: circular.content,
      category: circular.category,
      issueDate: circular.issueDate,
      targetAudience: circular.targetAudience
    });
    setIsEditing(true);
    setShow(true);
  };
  
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
    
    if (isEditing) {
      setCirculars(circulars.map(circular => 
        circular.id === currentId
          ? { ...circular, ...formData }
          : circular
      ));
    } else {
      const newCircular = {
        id: circulars.length + 1,
        ...formData,
        isActive: true
      };
      
      setCirculars([newCircular, ...circulars]);
    }
    
    handleClose();
  };
  
  const toggleCircularStatus = (id) => {
    setCirculars(circulars.map(circular => 
      circular.id === id 
        ? { ...circular, isActive: !circular.isActive } 
        : circular
    ));
  };
  
  // Filter circulars
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
    <Container fluid className="py-4">
      <Card className="shadow-sm">
        <Card.Body>
          <Row className="align-items-center mb-4">
            <Col xs={12} md={8}>
              <h4 className="mb-md-0">Circulars Management</h4>
            </Col>
            <Col xs={12} md={4} className="d-flex justify-content-md-end mt-3 mt-md-0">
              <Button variant="primary" onClick={handleShow}>
                Create New Circular
              </Button>
            </Col>
          </Row>
          
          <Row className="g-3 mb-4">
            <Col xs={12} md={8}>
              <InputGroup>
                <FormControl
                  placeholder="Search circulars..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col xs={12} md={4}>
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
            <div className="circular-list">
              {filteredCirculars.map(circular => (
                <Card key={circular.id} className="mb-3 shadow-sm">
                  <Card.Header className="bg-light d-flex justify-content-between align-items-center flex-wrap">
                    <div>
                      <h5 className="mb-0">{circular.title}</h5>
                      <small className="text-muted">
                        {circular.category} • {new Date(circular.issueDate).toLocaleDateString()}
                      </small>
                    </div>
                    <Badge bg={circular.isActive ? "success" : "secondary"} className="mt-2 mt-sm-0">
                      {circular.isActive ? "Active" : "Archived"}
                    </Badge>
                  </Card.Header>
                  <Card.Body>
                    <Card.Text>{circular.content}</Card.Text>
                    <div className="mb-3">
                      <strong>Target: </strong>
                      <div className="d-flex flex-wrap gap-1 mt-1">
                        {circular.targetAudience.map((audience, index) => (
                          <Badge key={index} bg="info" className="me-1">{audience}</Badge>
                        ))}
                      </div>
                    </div>
                    <div className="d-flex justify-content-end gap-2">
                      <Button variant="outline-primary" size="sm" onClick={() => editCircular(circular)}>
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
              ))}
            </div>
          ) : (
            <Card className="text-center p-4 bg-light">
              <Card.Body>
                <p className="mb-0">No circulars found matching your search criteria.</p>
              </Card.Body>
            </Card>
          )}
        </Card.Body>
      </Card>
      
      {/* Create/Edit Circular Modal */}
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? "Edit Circular" : "Create New Circular"}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
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
            
            <Row className="g-3">
              <Col xs={12} md={6}>
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
              <Col xs={12} md={6}>
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
              <div className="d-flex flex-wrap gap-3">
                {["Students", "Parents", "Teachers", "Staff"].map(audience => (
                  <Form.Check
                    key={audience}
                    type="checkbox"
                    label={audience}
                    checked={formData.targetAudience.includes(audience)}
                    onChange={() => handleCheckboxChange(audience)}
                    id={`check-${audience}`}
                  />
                ))}
              </div>
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {isEditing ? "Update" : "Create"} Circular
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default CircularsManagement;