import React from 'react';
import {connect} from 'react-redux';
import ApprovePage from './ApprovePage';
const ApproveAdmins = ({token}) => {
  return (
    <ApprovePage token={token} url={'/approve/super-admins'} key={'super'} />
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};
export default connect(mapStateToProps)(ApproveAdmins);
