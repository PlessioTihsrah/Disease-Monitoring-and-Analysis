import React from 'react';
import {connect} from 'react-redux';
import ApprovePage from './ApprovePage';
const ApproveHospitalAdmins = (props) => {
  return (
    <ApprovePage
      token={props.token}
      url={'/approve/hospital-admins'}
      key={'hospital'}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};
export default connect(mapStateToProps)(ApproveHospitalAdmins);
