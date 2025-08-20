import React from 'react';
import { Container, Form, Button, Card, Row, Col } from 'react-bootstrap';

const LoginPage = () => {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={12} lg={4}>
          <Card className="p-4 mt-5">
            <Card.Body>
              <h2 className="text-center mb-4">Login</h2>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>

                <div className="d-grid">
                  <Button variant="primary" type="submit">
                    Login
                  </Button>
                </div>
              </Form>
              <div className="mt-3 text-center">
                Don't have an account? <a href="/register">Register</a>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
