import React from 'react';

export const USER_CONSUMER = 1;
export const USER_PRODUCER = 2;
export const USER_PROSUMER = 3;

export const initUserContextState = {
  viewType: USER_CONSUMER,
  userType: USER_CONSUMER,
  email: "",
  houseNumber: "",
  username: "",
  zipCode: "",
  password: "",
};

const UserContext = React.createContext(initUserContextState);

export default UserContext;
