import React, { Component } from 'react';
import axios from 'axios';
import '../index.css';

export default class BuySection extends Component {
  constructor() {
    super()
    this.state = {
      buys: []
    };
  }

  componentDidMount() {
    console.log("Hello");
    axios.get("https://khnow4dkt2.execute-api.eu-west-1.amazonaws.com/dev/data/buys", {
      params: {
        longitude: 4,
        latitude: 50
      }
    }, {
      headers: {
        "Accept": "application/json"
      }
    }).then((r) => {
      this.setState({
        buys: r["data"]["buys"]
      })
    }).catch((e) => {
      console.log(e);
    })
  };

  printData = () => {
    return(this.state.buys.map((x) =>
      <div className="table-row">
        <div className="table-cell bg-gray-200 h-12 border-solid border rounded">
          <div className="font-roboto text-lg pl-12 leading-loose">
            {x[0]}
          </div>
        </div>
        <div className="table-cell bg-gray-200 h-12 border-solid border rounded">
          <div className="font-roboto text-center text-lg font-bold">
            +{x[1]}
          </div>
        </div>
      </div>
    ))
  }

  render() {
    return (
      <div>
        <div className="font-roboto text-center text-3xl pb-8">
          Received
        </div>
        <div className="table w-full">
          {this.printData()}
        </div>
      </div>
    );
  }
}
