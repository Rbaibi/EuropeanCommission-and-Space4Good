import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input, Popover, PopoverHeader, PopoverBody, Button, Card, CardBody, CardHeader, Col, Row } from 'reactstrap';

const currentSavings = { money: 0, expiration: 3600 }

const applianceCosts = {
  'Washing machine': 0.7,
  'Dishwasher': 0.9,
  'Air conditioning': 0.3,
  'Computer': 0.2,
  'Dryer': 0.8,
};

function generateInitTimeData(surplus) {
  const currentHour = new Date().getHours();
  return [...Array(24).keys()].map((i) => ({
    hour: (currentHour + i) % 24,
    // predSavings: Math.round(Math.random() * 10 + 20 * Math.max(0, Math.sin((i + 14) / 24 * 2 * Math.PI))),
    predSavings: surplus ? Object.values(surplus)[i] : 99,
    predConsumption: Math.round(Math.random() * 20),
    notify: false,
    task: '',
  }));
}

const RealTimeCard = ({ available, currentSavings }) => (
  <Card className={`text-white ${available ? 'bg-success' : 'bg-warning'}`}>
    <CardHeader>
        <b>Real time</b>
        <div className="card-header-actions">
          <i className="fa fa-plug float-left"></i>
        </div>
    </CardHeader>
    <CardBody>
      <Input type="select">
        <option value="Washing machine">Washing machine</option>
        <option value="Dishwasher">Dishwasher</option>
        <option value="Air conditioning">Air conditioning</option>
        <option value="Computer">Computer</option>
        <option value="Dryer">Dryer</option>
        {/* <option value="Crypto mining">Crypto mining</option> */}
        {/* <option value="TV match">TV match</option> */}
        {/* <option value="Charge phone">Charge phone</option> */}
      </Input>
      <h4>If you run this appliance now, you save</h4>
      <h1>&euro;{currentSavings.money}</h1>
      {/* <Button block outline color="success" style={{cursor: 'pointer', marginTop: 10, float: 'right'}}>Submit</Button> */}

      {/* <h3>There is {available ? '' : 'no'} free energy now.</h3> */}

      {/* <p>If you do your laundry now, you will size xxx</p> */}
      {/* Todo: Explain what the money menas */}
    </CardBody>
  </Card>
);

const Dashboard = () => {
  const [popoverOpen, setPopover] = useState(-1);
  const [timeData, setTimeData] = useState(generateInitTimeData());

  const isSurplusAvailable = timeData[0].predSavings > 10;

  useEffect(() => {
    async function fetchAndSetState() {
      const res = await fetch('http://34.90.127.27:5000/forecast');
      const json = await res.json();
      setTimeData(generateInitTimeData(json.Surplus));
      // console.log(json);
    }

    fetchAndSetState();
  }, []);

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="12" sm="6" md="4">
          <RealTimeCard available={isSurplusAvailable} currentSavings={currentSavings} />

        </Col>
        <Col xs="12" sm="6" md="6">
          <Card className="card-accent-success">
            <CardHeader>
                <b>Plan your use</b>
                <div className="card-header-actions">
                  <i className="fa fa-calendar float-left"></i>
                </div>
            </CardHeader>
            <CardBody>
              { timeData.map(({hour, predSavings, predConsumption, notify, task, costs}, i) => (
                <div 
                id={`popover${i}`}
                style={{
                  // borderBottom: (new Date().getHours() === hour) ? '2px solid red' : 0,
                  padding: 5,
                  height: 30, 
                  backgroundColor: `rgba(80, 200, 80, ${predSavings / 50})`}}
                  key={i}>
                  {hour}:00 {notify ? ' - ' + task : ''}
                  <span style={{float: 'right', color: notify ? '#FF3333' : '#CFCFCF'}}><i className="icon-bell"></i></span>
                  {costs !== undefined && <i style={{float: 'right', marginRight: '8px', color: costs > 0 ? '' : 'red' }}>€{costs.toFixed(2)}</i>}
                  <Popover placement="right" isOpen={popoverOpen === i} target={`popover${i}`} toggle={() => setPopover(i)}>
                    <PopoverHeader>Notify me <a style={{float: 'right', cursor: 'pointer'}} onClick={() => setPopover(-1)}><i className="icon-close"></i></a></PopoverHeader>
                    <PopoverBody>
                      <Form onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.target);
                        timeData[i].task = formData.get(`task${i}`);
                        const costs = applianceCosts[timeData[i].task];
                        timeData[i].notify = true;
                        timeData[i].costs = timeData[i].predSavings > 0 ? costs : 0;
                        setTimeData(timeData);
                        setPopover(-1);
                      }}>
                        <FormGroup>
                          <Label htmlFor={`task${i}`}>To use</Label>
                          <Input type="select" name={`task${i}`} id={`task${i}`}>
                            <option value="Washing machine">Washing machine</option>
                            <option value="Dishwasher">Dishwasher</option>
                            <option value="Air conditioning">Air conditioning</option>
                            <option value="Computer">Computer</option>
                            <option value="Dryer">Dryer</option>
                            {/* <option value="Crypto mining">Crypto mining</option> */}
                            {/* <option value="TV match">TV match</option> */}
                            {/* <option value="Charge phone">Charge phone</option> */}
                          </Input>
                          <Button block outline color="success" style={{cursor: 'pointer', marginTop: 10}}>Submit</Button>
                        </FormGroup>
                      </Form>
                    </PopoverBody>
                  </Popover>
                </div>
              ))}
            </CardBody>
          </Card>
        </Col>
        {/* <Col xs="12" sm="6" md="4">
          <Card>
            <CardBody>
              <h4>You're saving &euro; 20.</h4>
            </CardBody>
          </Card>
        </Col> */}
      </Row>
    </div>
  )
};

export default Dashboard;
