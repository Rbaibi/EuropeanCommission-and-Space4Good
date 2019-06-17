import React, { Component } from 'react';
import axios from 'axios';
import '../index.css';

export default class SellSection extends Component {
  constructor() {
    super()
    this.state = {
      sells: []
    };
  }

  componentDidMount() {
    axios.get("https://khnow4dkt2.execute-api.eu-west-1.amazonaws.com/dev/data/sells", {
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
        sells: r["data"]["sells"]
      })
    }).catch((e) => {
      console.log(e);
    })
  };

  printData = () => {
    return(this.state.sells.map((x) =>
      <div className="table-row">
        <div className="table-cell bg-gray-200 h-12 border-solid border rounded">
          <div className="font-roboto text-lg pl-12 leading-loose">
            {x[0]}
          </div>
        </div>
        <div className="table-cell bg-gray-200 h-12 border-solid border rounded">
          <div className="font-roboto text-center text-lg font-bold">
            {x[1]}
          </div>
        </div>
      </div>
    ))
  }

  render() {
    return (
      <div>
        <div className="font-roboto text-center text-3xl pb-8">
          Payment
        </div>
        <div className="table w-full">
          {this.printData()}
        </div>
      </div>
    );
  }
}
