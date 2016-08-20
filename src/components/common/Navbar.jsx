import React, {PropTypes} from 'react';
import { Link, IndexLink } from 'react-router';

const Navbar = () => {
  return (
    <nav>
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link className="navbar-brand" to="/">Home</Link>
          </div>
          <div className="collapse navbar-collapse" id="navbar">
            <ul className="nav navbar-nav navbar-left">
              <li><Link to="/about">About</Link></li>
            </ul>
          </div>
        </div>
      </nav>
    </nav>
  );
};

export default Navbar;
