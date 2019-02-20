import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NavigationComponent from '../../components/Navigation';
import { isLoggedIn } from '../../utils/auth';

class NavigationView extends Component {
  render() {
    return (
      <NavigationComponent isAuthenticated={isLoggedIn()} />
    );
}
}
const mapStateToProps = ({ login }) => ({
  login,
});
NavigationView.propTypes = {
  login: PropTypes.shape({}).isRequired,
};
export default connect(mapStateToProps)(NavigationView);
