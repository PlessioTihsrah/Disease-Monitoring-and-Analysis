import React from 'react';
import {Text, Content, FooterTab, Footer, Button} from 'native-base';
import Header from '../Header';
import Appointment from './Appointment';
import ChangeSkills from './ChangeSkills';

class DoctorMain extends React.PureComponent {
  state = {
    page: 0,
  };

  render() {
    const {page} = this.state;
    const pageTitle = page === 0 ? 'Appointment' : 'Change Skills';
    const pageToShow = page === 0 ? <Appointment /> : <ChangeSkills />;
    return (
      <>
        <Header title={pageTitle} />
        <Content>{pageToShow}</Content>
        <Footer>
          <FooterTab>
            <Button
              active={page === 0}
              onPress={() => this.setState({page: 0})}>
              <Text>Appointment</Text>
            </Button>
            <Button
              active={page === 1}
              onPress={() => this.setState({page: 1})}>
              <Text>Change Skills</Text>
            </Button>
          </FooterTab>
        </Footer>
      </>
    );
  }
}

export default DoctorMain;
