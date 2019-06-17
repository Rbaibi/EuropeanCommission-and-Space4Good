import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input, Popover, PopoverHeader, PopoverBody, Button, Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import { Line } from 'react-chartjs-2';

const surplusResult = { income: 50, donated: 60 };

const chartOptions = {
  title: {text: "Energy IO"},
  scales: {
    xAxes: [{
      title: "Time",
      type: 'time',
      gridLines: {
        lineWidth: 2
      },
      time: {
        displayFormats: {'day': 'MM/DD'},
        tooltipFormat: 'DD/MM/YY',
        unit: 'week',
        // min: new Date(consumptionData.datasets.data[consumptionData.datasets.data.length - 1] - 7 * 24 * 60 * 60 * 1000)
      }
    }]
  }
};


const Dashboard = () => {
  const [consumptionData, setConsumptionData] = useState(null);
  useEffect(() => {
    async function fetchAndSetState() {
      const res = await fetch('http://34.90.127.27:5000/producer_history');
      const json = await res.json();
      const consData = Object.keys(json.PowerConsumed).map((dateStr) => ({
        x: new Date(parseInt(dateStr)),
        y: json.PowerConsumed[dateStr],
      }));
      const prodData = Object.keys(json.Produced).map((dateStr) => ({
        x: new Date(parseInt(dateStr)),
        y: json.Produced[dateStr],
      }));
      setConsumptionData({
        datasets: [{
          data: consData,
          label: 'Power consumption (kW)',
          backgroundColor: [
            'rgba(255, 193, 7, 0.3)',
          ],
          borderColor: [
            'rgba(255, 193, 7, 1)',
          ],
          borderWidth: 1
        }, {
          data: prodData,
          label: 'Power production (kW)',
          backgroundColor: [
            'rgba(80, 200, 80, 0.3)',
          ],
          borderColor: [
            'rgba(80, 200, 80, 1)',
          ],
          borderWidth: 1
        }
        ],
      });
    }
    fetchAndSetState();
  }, []);

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="12" sm="6" md="4">
          <Card className="text-white bg-success">
            <CardHeader>
                <b>Sales</b>
                <div className="card-header-actions">
                  <i className="fa fa-plug float-left"></i>
                </div>
            </CardHeader>
            <CardBody>
              <h3>Your surplus has reaped results</h3>
              <h1>&euro;{surplusResult.income} sales</h1>
              <h1>&euro;{surplusResult.donated} donated</h1>
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" sm="6" md="8">
          <Card className="card-accent-success">
            <CardHeader>
                <b>Energy IO, last month</b>
                <div className="card-header-actions">
                  <i className="fa fa-bolt float-left"></i>
                </div>
            </CardHeader>
            <CardBody>
              {consumptionData && (
                <Line
                  data={consumptionData}
                  options={chartOptions}
                />
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
};

export default Dashboard;
