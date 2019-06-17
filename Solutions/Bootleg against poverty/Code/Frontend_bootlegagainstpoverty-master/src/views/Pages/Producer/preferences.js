import React, { useState, useCallback, useContext } from 'react';
import { Tooltip, Button, Card, CardBody, CardHeader, Col, Row, CardFooter, Collapse, Alert } from 'reactstrap';

import Slider, { Range } from 'rc-slider';
import UserContext from '../../../contexts/UserContext';

const Handle = Slider.Handle;

const handle = (props) => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <span key={index}>
      <Handle value={value} id={`handle-${index}`} {...restProps} />
      <Tooltip
        isOpen={dragging}
        placement="top"
        key={index}
        target={`handle-${index}`}
      >
        {value}%
      </Tooltip>
    </span>
  );
};

const Preferences = () => {
  const { setValue, percentages: initPercentages } = useContext(UserContext);

  const [percentages, setPercentages] = useState(initPercentages || [33, 66]);
  const [isSuggestInfoOpen, setSuggestInfoOpen] = useState(false);

  const handleSuggest = useCallback(() => {
    const communityPortion = Math.round(Math.random() * 10 + 40);
    const ngoPortion = Math.round(Math.random() * 10 + 20);
    setPercentages([communityPortion, communityPortion + ngoPortion]);
    setSuggestInfoOpen(true);
  }, [setPercentages]);

  const [isSubmitted, setSubmitted] = useState(false);
  const handleSubmit = useCallback(() => {
    setValue('percentages', percentages);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  }, [setValue, percentages]);

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="12" sm="6" md="4">
          <Card className="text-white bg-success">
            <CardHeader>
              <b>Estimated surplus (24h)</b>
              <div className="card-header-actions">
                <i className="fa fa-plug float-left"></i>
              </div>
            </CardHeader>
            <CardBody>
              <h1>154 kWh</h1>
              <h4>Based on weather prediction</h4>
              <h5>(27m ago)</h5>
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" sm="6" md="8">
          <Card className="card-accent-success">
            <CardHeader>
                <b>Choose where your surplus energy goes</b>
                <div className="card-header-actions">
                  <i className="fa fa-bolt float-left"></i>
                </div>
            </CardHeader>
            <CardBody>
              <Range
                count={1}
                pushable
                trackStyle={[{ backgroundColor: '#4dbd74' }, { backgroundColor: 'blue' }]}
                handleStyle={[{ backgroundColor: 'yellow' }, { backgroundColor: 'yellow' }]}
                railStyle={{ backgroundColor: 'teal' }}
                tipFormatter={value => `${value}%`}
                handle={handle}
                value={percentages}
                onChange={setPercentages}
              />

              <Row>
                <Col>Community Donation: {percentages[0]}%</Col>
                <Col>NGO Donation: {percentages[1] - percentages[0]}%</Col>
                <Col>Profit: {100 - percentages[1]}%</Col>
              </Row>

              <br />

              <CardFooter>
                <Button onClick={handleSuggest}>Suggest based on demand</Button>
                <Button onClick={handleSubmit} color="success">Submit</Button>
                {isSubmitted && <Alert color="success">Submitted successfully!</Alert>}
              </CardFooter>

              <Collapse isOpen={isSuggestInfoOpen}>
                <CardBody>
                  <p>
                    This suggestion is based on the following information:
                  </p>
                  <ul>
                    <li>Expected consumption based on previous results.</li>
                    <li>Expected production based on previous production, weather forecast and time of year.</li>
                  </ul>
                  <Button color="danger" onClick={() => setSuggestInfoOpen(false)}>Close</Button>
                </CardBody>
              </Collapse>
            </CardBody>
          </Card>
        </Col>
      </Row>

    </div>
  )
};

export default Preferences;
