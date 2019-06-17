import React, { Component } from 'react';
import '../index.css';

import Graph from './Graph';
import BuySection from './BuySection';
import SellSection from './SellSection';


export default class MainSection extends Component {

  render() {
    return (
      <div className="flex-col w-11/12 mt-3 mr-3 mb-3 ml-3 float-right">
        <div className="relative w-full">
          <Graph />
        </div>
        <div className="flex flex-row w-11/12 mr-10 float-right">
          <div className="relative w-6/12 pl-5 pr-5">
            <BuySection />
            <svg className="fill-current text-white" width="100%" height="55vh">
              <rect width="100%" height="100%"/>
            </svg>
          </div>
          <div className="relative w-6/12 pl-5 pr-5">
            <SellSection />
            <svg className="fill-current text-white" width="100%" height="55vh">
              <rect width="100%" height="100%"/>
            </svg>
          </div>
        </div>
      </div>

    );
  }
}
