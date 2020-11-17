import React from 'react';
import Authentication from './Authentication/Authentication';
import {connect} from 'react-redux';
import UserMain from './User/UserMain';
import DoctorMain from './Doctor/DoctorMain';
import HospitalAdminMain from './HospitalAdmin/HospitalAdminMain';
import SuperAdminMain from './SuperAdmin/SuperAdminMain';
const Screen = ({userType}) => {
  switch (userType) {
    case 'user':
      return <UserMain />;
    case 'doctor':
      return <DoctorMain />;
    case 'hospitalAdmin':
      return <HospitalAdminMain />;
    case 'superAdmin':
      return <SuperAdminMain />;
    default:
      return <Authentication />;
  }
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    userType: state.auth.userType,
  };
};
export default connect(mapStateToProps)(Screen);
