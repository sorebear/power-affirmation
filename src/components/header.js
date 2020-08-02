import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'gatsby';

const Header = () => (
  <header className="hero is-dark">
    <div className="hero-body">
      <div className="container">
        <Link to="/">
          <h1 className="title">Power and Affirmation</h1>
        </Link>
      </div>
    </div>
  </header>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
