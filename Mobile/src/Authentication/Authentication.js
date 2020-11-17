import React from 'react';
import {Header, Tab, Tabs, ScrollableTab, Left, Body, Title} from 'native-base';
import UserAuth from './User/UserAuth';
import DoctorAuth from './Doctor/DoctorAuth';
import HospitalAdminAuth from './HospitalAdmin/HospitalAdminAuth';
import SuperAdminAuth from './SuperAdmin/SuperAdminAuth';
const Authentication = (props) => {
  return (
    <>
      <Header hasTabs>
        <Left></Left>
        <Body>
          <Title>Authentication</Title>
        </Body>
      </Header>
      <Tabs renderTabBar={() => <ScrollableTab />}>
        <Tab heading="User">
          <UserAuth></UserAuth>
        </Tab>
        <Tab heading="Doctor">
          <DoctorAuth></DoctorAuth>
        </Tab>
        <Tab heading="Hospital Admin">
          <HospitalAdminAuth></HospitalAdminAuth>
        </Tab>
        <Tab heading="Super Admin">
          <SuperAdminAuth></SuperAdminAuth>
        </Tab>
      </Tabs>
    </>
  );
};

export default Authentication;
