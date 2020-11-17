import React from 'react';
import {
  Text,
  Content,
  Footer,
  FooterTab,
  Button,
  Header,
  Body,
  Right,
  Title,
} from 'native-base';
import SearchHospital from './SearchHospital';
import DiseasePrediction from './DiseasePrediction';
import Appointment from './Appointment';
import {connect} from 'react-redux';
import {logout} from '../store/actions/AuthActions';

class UserMain extends React.PureComponent {
  state = {page: 0};
  getPage() {
    switch (this.state.page) {
      case 0:
        return <SearchHospital></SearchHospital>;
      case 1:
        return <DiseasePrediction></DiseasePrediction>;
      case 2:
        return <Appointment key={'open'} closed={false}></Appointment>;
      case 3:
        return <Appointment key={'closed'} closed={true}></Appointment>;
      default:
        return <Text>Invalid</Text>;
    }
  }
  getHeader = () => {
    let text = '';
    switch (this.state.page) {
      case 0:
        text = 'Search Hospital';
        break;
      case 1:
        text = 'Disease Prediction';
        break;
      case 2:
        text = 'Open Appointments';
        break;
      case 3:
        text = 'Closed Appointments';
        break;
    }
    return (
      <Header>
        <Body style={{marginLeft: 20}}>
          <Title>{text}</Title>
        </Body>
        <Right>
          <Button onPress={this.props.logout} transparent block>
            <Text>Logout</Text>
          </Button>
        </Right>
      </Header>
    );
  };
  render() {
    const {page} = this.state;
    return (
      <>
        {this.getHeader()}
        <Content>{this.getPage()}</Content>
        <Footer>
          <FooterTab>
            <Button
              active={page === 0}
              block
              onPress={() => {
                this.setState({page: 0});
              }}>
              <Text>Search</Text>
              <Text> Hospital</Text>
            </Button>
            <Button
              block
              active={page === 1}
              onPress={() => {
                this.setState({page: 1});
              }}>
              <Text>Disease</Text>
              <Text>Prediction</Text>
            </Button>
            <Button
              active={page === 2}
              block
              onPress={() => {
                this.setState({page: 2});
              }}>
              <Text>Open</Text>
              <Text>Appoint.</Text>
            </Button>
            <Button
              active={page === 3}
              block
              onPress={() => {
                this.setState({page: 3});
              }}>
              <Text>Closed</Text>
              <Text>Appoint.</Text>
            </Button>
          </FooterTab>
        </Footer>
      </>
    );
  }
}

export default connect(null, {logout})(UserMain);
