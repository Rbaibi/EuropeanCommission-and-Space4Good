import React, { useState, useEffect, useContext } from 'react';
import { Form, FormGroup, Label, Input, Popover, PopoverHeader, PopoverBody, Button, Card, CardBody, CardHeader, Col, Row } from 'reactstrap';

import UserContext from '../../../contexts/UserContext';
import Widget01 from '../../Widgets/Widget01';

const FeelGood = () => {
  const { username } = useContext(UserContext);
  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="12" md={{ size: 8, offset: 2 }} >
          <Card className="text-white bg-success">
            <CardHeader>
              <b>Dear {username || 'user'}</b>
              <div className="card-header-actions">
                <i className="fa fa-heart float-left"></i>
              </div>
            </CardHeader>
            <CardBody>
              {/* <h3>You supported your community center with <b>6%</b> of their energy consumption!</h3>
              <p>
                Their total energy demand was covered by <b>87%</b> this month, partially thanks to you.
              </p> */}
              Thank you for your support this month.
              <br />
              This report will break down what your generous donations meant to your community.
            </CardBody>
          </Card>

          <Widget01
            color="primary"
            variant="inverse"
            header="87%"
            value="87"
            mainText={<span>of the energy demand of your local <b>community center</b> was donated this month.</span>}
            smallText={<span>You donated <b>16%</b> in total!</span>}
            icon="fa-church"
            image={'http://www.schilderswijk.nl/includes/thumb.php?f=SK/2012-10/nieuwe_mussen_20121018110913.jpg&w=455&format=jpeg'}
          />

          {/* <Widget01
            color="primary"
            header="43%"
            value="43"
            mainText={<span>of the energy demand of your local <b>energy poor</b> was donated this month.</span>}
            smallText={<span>You donated <b>23%</b> in total!</span>}
            icon="fa-house"
          /> */}

          <Card className="">
            <CardBody>
              <h4>€41</h4>
              <span>was saved in energy costs to <b>people in your neighborhood</b> through your donations!</span>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
};

export default FeelGood;
