import React, { useState } from "react";
import dummyData from "./dummyData"; // Ensure the path is correct
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import './App.css'; // Import the CSS file

const App = () => {
  const [searchParams, setSearchParams] = useState({ type: '', location: '' });

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prevParams) => ({
      ...prevParams,
      [name]: value,
    }));
  };

  const filteredJobs = dummyData.filter(job => {
    return (
      (searchParams.type === '' || job.type.toLowerCase().includes(searchParams.type.toLowerCase())) &&
      (searchParams.location === '' || job.location.toLowerCase().includes(searchParams.location.toLowerCase()))
    );
  });

  return (
    <div>
      <div className="background"></div>
      <Container className="my-4 content">
        <h1 className="mb-4 text-center">Job Listings</h1>
        <Form className="mb-4">
          <Row>
            <Col md={5}>
              <Form.Control
                type="text"
                placeholder="Search by Job Type"
                name="type"
                value={searchParams.type}
                onChange={handleSearchChange}
              />
            </Col>
            <Col md={5}>
              <Form.Control
                type="text"
                placeholder="Search by Location"
                name="location"
                value={searchParams.location}
                onChange={handleSearchChange}
              />
            </Col>
            <Col md={2}>
              <Button variant="primary" onClick={() => setSearchParams(searchParams)}>
                Search
              </Button>
            </Col>
          </Row>
        </Form>
        <Row>
          {filteredJobs.map((job) => (
            <Col md={4} key={job.id} className="mb-4">
              <Card className="h-100">
                <Card.Body>
                  <Card.Title>{job.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{job.companyName}</Card.Subtitle>
                  <Card.Text>
                    <strong>Type:</strong> {job.type}<br />
                    <strong>Location:</strong> {job.location}<br />
                    <strong>Skills:</strong> {job.skills.join(", ")}
                  </Card.Text>
                  <Button variant="primary" href={job.link} target="_blank">
                    Apply Now
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default App;
