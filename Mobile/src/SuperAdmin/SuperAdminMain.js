import React from 'react';
import {Text, Content, FooterTab, Footer, Button} from 'native-base';
import Header from '../Header';
import ApproveHospitalAdmins from './ApproveHospitalAdmins';
import ApproveAdmins from './ApproveAdmins';
import CreateHospital from './CreateHospital';

class SuperAdminMain extends React.PureComponent {
  state = {
    page: 0,
  };
  getTitle = () => {
    switch (this.state.page) {
      case 0:
        return 'Hospital Admins';
      case 1:
        return 'Super Admins';
      case 2:
        return 'Create Hospital';
    }
  };

  getPage = () => {
    switch (this.state.page) {
      case 0:
        return <ApproveHospitalAdmins />;
      case 1:
        return <ApproveAdmins />;
      case 2:
        return <CreateHospital />;
    }
  };
  render() {
    const {page} = this.state;
    const pageTitle = this.getTitle();
    const pageToShow = this.getPage();
    return (
      <>
        <Header title={pageTitle} />
        <Content>{pageToShow}</Content>
        <Footer>
          <FooterTab>
            <Button
              active={page === 0}
              onPress={() => this.setState({page: 0})}>
              <Text>Hospital</Text>
              <Text>Admins</Text>
            </Button>
            <Button
              active={page === 1}
              onPress={() => this.setState({page: 1})}>
              <Text>Super</Text>
              <Text>Admins</Text>
            </Button>
            <Button
              active={page === 2}
              onPress={() => this.setState({page: 2})}>
              <Text>Create</Text>
              <Text>Hospital</Text>
            </Button>
          </FooterTab>
        </Footer>
      </>
    );
  }
}

export default SuperAdminMain;
