import React from 'react';
import Login from './Login';
import Signup from './Signup';
import {Content} from 'native-base';

class SuperAdminAuth extends React.PureComponent {
  state = {
    login: true,
  };
  changeState = () => {
    this.setState({login: !this.state.login});
  };
  render() {
    const {login} = this.state;
    return (
      <Content>
        {login && <Login change={this.changeState}></Login>}
        {!login && <Signup change={this.changeState}></Signup>}
      </Content>
    );
  }
}

export default SuperAdminAuth;
