import React, { useState, useContext, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

import UserContext from '../../../contexts/UserContext';

const Login = ({ history }) => {
  const { setValue } = useContext(UserContext);

  const handleLogin = useCallback((e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const userData = {
      username: formData.get('username'),
      password: formData.get('password'), 
    };

    setValue('username', userData.username);
    history.push('/consumer');
              
  }, [setValue, history]);

  return (
    <div className="app flex-row align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md="8">
            <CardGroup>
              <Card className="p-4">
                <CardBody>
                  <Form onSubmit={handleLogin}>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Username" autoComplete="username" name="username" />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Password" autoComplete="current-password" name="password" />
                    </InputGroup>
                    <Row>
                      <Col xs="6">
                        {/* Todo: validate login form, link to correct user type */}
                        <Button color="primary" className="px-4">Login</Button>
                      </Col>
                      <Col xs="6" className="text-right">
                        <Button color="link" className="px-0">Forgot password?</Button>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
              <Card className="text-white bg-primary py-5">
                <CardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>Interested in donating your extra energy to those in need,
                      <br />
                      or are you in need of support ?</p>
                    <Link to="/register">
                      <Button color="primary" className="mt-3" active tabIndex={-1}>Register Now!</Button>
                    </Link>
                  </div>
                </CardBody>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
