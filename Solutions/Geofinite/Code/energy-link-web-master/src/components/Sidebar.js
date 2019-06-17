import React, { Component } from 'react';
import '../index.css';

export default class Sidebar extends Component {

  render() {
    return (
		 <div class="flex-none w-full md:w-1/12 bg-gray-900 px-2 text-center fixed bottom-0 md:pt-12 md:top-0 md:left-0 h-16 md:h-screen">
				<div class="md:relative mx-auto lg:float-right lg:px-6">
					 <ul class="list-reset flex flex-row md:flex-col text-center md:text-left">
							<li class="mr-3 flex-1">
								 <a href="#" class="block py-1 md:py-3 pl-1 align-middle text-gray-800 no-underline hover:text-pink-500 border-b-2 border-gray-800 md:border-gray-900 hover:border-pink-500">
								 <i class="fas fa-link pr-0 md:pr-3"></i><span class="pb-1 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block">Profile</span>
								 </a>
							</li>
							<li class="mr-3 flex-1">
								 <a href="#" class="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-pink-600">
								 <i class="fas fa-link pr-0 md:pr-3 text-pink-500"></i><span class="pb-1 md:pb-0 text-xs md:text-base text-white md:font-bold block md:inline-block">Home</span>
								 </a>
							</li>
							<li class="mr-3 flex-1">
								 <a href="#" class="block py-1 md:py-3 pl-1 align-middle text-gray-800 no-underline hover:text-pink-500 border-b-2 border-gray-800 md:border-gray-900 hover:border-pink-500">
								 <i class="fas fa-link pr-0 md:pr-3"></i><span class="pb-1 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block">Data</span>
								 </a>
							</li>
					 </ul>
				</div>
		 </div>
    );
  }
}
