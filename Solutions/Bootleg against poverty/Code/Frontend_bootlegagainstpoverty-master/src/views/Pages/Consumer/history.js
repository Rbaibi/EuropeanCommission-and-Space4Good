import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input, Popover, PopoverHeader, PopoverBody, Button, Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import { Line } from 'react-chartjs-2';


const chartOptions = {
  title: {text: "Energy consumption"},
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

const History = () => {

  const [consumptionData, setConsumptionData] = useState(null);
  useEffect(() => {
    async function fetchAndSetState() {
      const res = await fetch('http://34.90.127.27:5000/consumer_history');
      const json = await res.json();
      const chartData = Object.keys(json.PowerConsumed).map((dateStr) => ({
        x: new Date(parseInt(dateStr)),
        y: json.PowerConsumed[dateStr],
      }));
      setConsumptionData({
        datasets: [{
          data: chartData,
          label: 'Power consumption (kW)',
          backgroundColor: [
            'rgba(255, 193, 7, 0.3)',
          ],
          borderColor: [
            'rgba(255, 193, 7, 1)',
          ],
          borderWidth: 1
        }],
      });
    }
    fetchAndSetState();
  }, []);

  return (
    <div className="animated fadeIn">
      <Row>
{/*       
      <p>
        Previous usage
        How much money saved
        History (Day, Week, Month, Total)
        Prediction for coming days
      </p> */}

      <Col>
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

export default History;
