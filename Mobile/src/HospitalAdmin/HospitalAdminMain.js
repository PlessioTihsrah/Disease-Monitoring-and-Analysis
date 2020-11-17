import React from 'react';
import {Text, Content, FooterTab, Footer, Button} from 'native-base';
import Header from '../Header';
import ApproveDoctors from './ApproveDoctors';
import CloseAppointment from './CloseAppointment';

class DoctorMain extends React.PureComponent {
  state = {
    page: 0,
  };

  render() {
    const {page} = this.state;
    const pageTitle = page === 0 ? 'Approve Doctors' : 'Close Appointments';
    const pageToShow = page === 0 ? <ApproveDoctors /> : <CloseAppointment />;
    return (
      <>
        <Header title={pageTitle} />
        <Content>{pageToShow}</Content>
        <Footer>
          <FooterTab>
            <Button
              active={page === 0}
              onPress={() => this.setState({page: 0})}>
              <Text>Approve Doctors</Text>
            </Button>
            <Button
              active={page === 1}
              onPress={() => this.setState({page: 1})}>
              <Text>Close Appointments</Text>
            </Button>
          </FooterTab>
        </Footer>
      </>
    );
  }
}

export default DoctorMain;
