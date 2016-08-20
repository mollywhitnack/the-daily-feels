
import React, {PropTypes} from 'react';
import { Link, IndexLink } from 'react-router';

const Navbar = () => {
  return (
    <nav>
      <IndexLink to="/" activeClassName="active">Home</IndexLink>
      {" | "}
      <Link to="/about" activeClassName="active">About</Link>
    </nav>  
  );
};

export default Navbar;