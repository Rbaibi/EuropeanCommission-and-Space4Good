import React, { Component } from 'react';
import '../index.css';

export default class Header extends Component {

  render() {
    return (
      <div className="bg-gray-600 w-full h-12 z-50">
        <div className="float-left pl-8 pt-3">
          <div className="font-sans font-bold text-white">
            EnergyLink
          </div>
        </div>
      </div>
    );
  }
}
