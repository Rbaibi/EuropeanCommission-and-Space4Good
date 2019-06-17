import React from 'react';

import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';


const Landing = () => {

  return (
    <div>
      <h1>Welcome to Donatenergy, Freenergy, ...!</h1>
      
      <p>This platform ... bla bla bla </p>

      <p>Temporary page overview</p>
      <ul>
        <li><Link to="/dashboard">Dashboard template</Link></li>
        <li><Link to="/consumer">Consumer dashboard</Link></li>
        <li><Link to="/consumer/history">Consumer history</Link></li>
        <li><Link to="/producer">Producer history</Link></li>
        <li><Link to="/producer/preferences">Producer preferences</Link></li>
        <li><Link to="/producer/feel-good">Producer feel-good</Link></li>
      </ul>

      <p>[Beatiful landing page here]</p>
      <Link to="/login">
        <Button>
          Sign in
        </Button>
      </Link>
      <Button>Read more</Button>

    </div>
  )
};

export default Landing;
