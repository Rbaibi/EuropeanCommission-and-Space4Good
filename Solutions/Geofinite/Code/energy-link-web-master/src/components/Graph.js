import React, { Component } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import '../index.css';

export default class Graph extends Component {
  constructor() {
    super()
    this.state = {
      labels: [],
      consumption: [],
      solar: []
    };
  }

  componentDidMount() {
    axios.get("https://khnow4dkt2.execute-api.eu-west-1.amazonaws.com/dev/data/query", {
      params: {
        longitude: 4,
        latitude: 50,
        category: "1"
      }
    }, {
      headers: {
        "Accept": "application/json"
      }
    }).then((r) => {
      this.setState({
        labels: r["data"]["labels"],
        solar: r["data"]["solar"],
        consumption: r["data"]["consumption"]
      })
    }).catch((e) => {
      console.log(e);
    })
  };

  getOptions = () => {
    return {
      responsive: true,
      tooltips: {
        mode: 'label'
      },
      elements: {
        line: {
          fill: false
        }
      },
      scales: {
        xAxes: [
          {
            display: true,
            gridLines: {
              display: false
            },
            labels: this.state.labels,
          }
        ],
        yAxes: [
          {
            type: 'linear',
            display: true,
            position: 'right',
            gridLines: {
              display: false
            },
            labels: {
              show: true
            },
            ticks: {
              suggestedMin: 0
            }

          }
        ]
      }
    }
  }

  getData = () => {
    return {
      labels: this.state.labels,
      datasets: [{
          label: 'Solar',
          type:'line',
          data: this.state.solar,
          fill: false,
          borderColor: '#EC932F',
          backgroundColor: '#EC932F',
          pointBorderColor: '#EC932F',
          pointBackgroundColor: '#EC932F',
          pointHoverBackgroundColor: '#EC932F',
          pointHoverBorderColor: '#EC932F'
        },{
          label: 'Consumption',
          type:'line',
          data: this.state.consumption,
          fill: false,
          borderColor: '#2469a5',
          backgroundColor: '#368cd8',
          pointBorderColor: '#368cd8',
          pointBackgroundColor: '#368cd8',
          pointHoverBackgroundColor: '#368cd8',
          pointHoverBorderColor: '#368cd8'
        }]
    }
  };

  render() {
    return (
      <div className="pt-10 pr-10 pb-10 pl-10">
        <Bar
          data={this.getData()}
          options={this.getOptions()}
          height="85"
        />
      </div>
    );
  }
}
