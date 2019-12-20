// @flow

import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as UsersCreators } from '../../../../../store/ducks/users';

import SeeAllUsers from './SeeAllUsers';

type Props = {
  requestAllUsers: Function,
  users: Object,
};

class SeeAllUsersContainer extends Component<Props, {}> {
  componentDidMount() {
    const { requestAllUsers } = this.props;

    requestAllUsers();
  }

  render() {
    const { users } = this.props;

    console.log('users/index.js, users',users);

    return <SeeAllUsers
      {...users}
    />;
  }
}

const mapStateToProps = state => ({
  users: state.users,
});

const mapDispatchToProps = dispatch => bindActionCreators(UsersCreators, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SeeAllUsersContainer);
