import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import LoadingDots from './LoadingDots';

const Header = ({ loading }) =>
  <nav>
    <IndexLink to="/" activeClassName="active">Home</IndexLink>
    {loading && <LoadingDots interval={100} dots={20} />}
    {" | "}
    <Link to="/" activeClassName="active">Another Link</Link>
  </nav>;

Header.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default Header;

