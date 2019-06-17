import React, { useState, useContext } from 'react';
import {
  Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText,
  Row, Label, FormGroup, Nav, NavItem, NavLink, 
} from 'reactstrap';
import { withRouter } from 'react-router-dom';
import UserContext, { USER_CONSUMER, USER_PRODUCER } from '../../../contexts/UserContext';

const BasicForm = ({ title, subtitle, onSubmit }) => (
  <Form onSubmit={onSubmit}>
    <h1>{title || 'Register'}</h1>
    <p className="text-muted">{subtitle || 'Create your account'}</p>
    <InputGroup className="mb-3">
      <InputGroupAddon addonType="prepend">
        <InputGroupText>
          <i className="icon-user"></i>
        </InputGroupText>
      </InputGroupAddon>
      <Input type="text" placeholder="Name" autoComplete="username" name="username" />
    </InputGroup>
    <InputGroup className="mb-3">
      <InputGroupAddon addonType="prepend">
        <InputGroupText>@</InputGroupText>
      </InputGroupAddon>
      <Input type="text" placeholder="Email" autoComplete="email" name="email"  />
    </InputGroup>
    <InputGroup className="mb-3">
      <InputGroupAddon addonType="prepend">
        <InputGroupText>
          <i className="icon-location-pin"></i>
        </InputGroupText>
      </InputGroupAddon>
      <Input type="text" placeholder="Zip code" autoComplete="postal-code" name="zipCode" />
    </InputGroup>
    <InputGroup className="mb-3">
      <InputGroupAddon addonType="prepend">
        <InputGroupText>12</InputGroupText>
      </InputGroupAddon>
      <Input type="text" placeholder="House number" autoComplete="house-number" name="houseNumber" />
    </InputGroup>
    <InputGroup className="mb-3">
      <InputGroupAddon addonType="prepend">
        <InputGroupText>
          <i className="icon-lock"></i>
        </InputGroupText>
      </InputGroupAddon>
      <Input type="password" placeholder="Password" autoComplete="new-password" name="password" />
    </InputGroup>
    <InputGroup className="mb-4">
      <InputGroupAddon addonType="prepend">
        <InputGroupText>
          <i className="icon-lock"></i>
        </InputGroupText>
      </InputGroupAddon>
      <Input type="password" placeholder="Repeat password" autoComplete="new-password" />
    </InputGroup>
    <Button color="success" block>Create Account</Button>
  </Form>
);

const Register = ({ history }) => {
  const [activeTab, setActiveTab] = useState(USER_CONSUMER);
  const { setValues } = useContext(UserContext);

  return (
    <div className="app flex-row align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md="9" lg="7" xl="6">
            <Card className="mx-4">
              <CardBody className="p-4">

                <Nav tabs>
                  <NavItem>
                    <NavLink
                      active={activeTab === USER_CONSUMER}
                      onClick={() => setActiveTab(USER_CONSUMER)}
                    >
                      Consumer
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      active={activeTab === USER_PRODUCER}
                      onClick={() => setActiveTab(USER_PRODUCER)}
                    >
                      Donator
                    </NavLink>
                  </NavItem>
                </Nav>

                <BasicForm
                  title={`Register as a ${activeTab === USER_CONSUMER ? 'Consumer' : 'Donator'}`}
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);

                    const userData = {
                      username: formData.get('username'),
                      email: formData.get('email'),
                      zipCode: formData.get('zipCode'), 
                      houseNumber: formData.get('houseNumber'), 
                      password: formData.get('password'), 
                      viewType: activeTab,
                      userType: activeTab,
                    };

                    setValues(userData);
                    history.push(activeTab === USER_PRODUCER ? '/producer' : '/consumer');
                  }}
                />

              </CardBody>
              {/* <CardFooter className="p-4">
                <Row>
                  <Col xs="12" sm="6">
                    <Button className="btn-facebook mb-1" block><span>facebook</span></Button>
                  </Col>
                  <Col xs="12" sm="6">
                    <Button className="btn-twitter mb-1" block><span>twitter</span></Button>
                  </Col>
                </Row>
              </CardFooter> */}
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default withRouter(Register);
