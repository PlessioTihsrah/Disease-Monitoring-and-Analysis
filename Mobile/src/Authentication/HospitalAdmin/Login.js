import React from 'react';
import {Form, Item, Label, Input, Button, Text, Content} from 'native-base';
import {connect} from 'react-redux';
import {loginHospitalAdmin} from '../../store/actions/AuthActions';

class Login extends React.PureComponent {
  state = {
    email: '',
    password: '',
  };
  checkEmail(email) {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return reg.test(email);
  }
  handleLogin = () => {
    const {email, password} = this.state;
    if (this.checkEmail(email.trim()) && password.trim()) {
      this.props.loginHospitalAdmin(email, password);
    }
  };
  render() {
    const {email, password} = this.state;
    return (
      <>
        <Form>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input
              value={email}
              onChangeText={(email) => this.setState({email})}
            />
          </Item>
          <Item floatingLabel last>
            <Label>Password</Label>
            <Input
              value={password}
              onChangeText={(password) => this.setState({password})}
              secureTextEntry={true}
            />
          </Item>
          <Content style={{padding: 10}}>
            <Button
              primary
              block
              style={{marginTop: 20}}
              disabled={!password || !this.checkEmail(email)}
              onPress={this.handleLogin}>
              <Text>Login</Text>
            </Button>
            <Button
              primary
              block
              style={{marginTop: 10}}
              onPress={this.props.change}>
              <Text>Switch to Signup</Text>
            </Button>
          </Content>
        </Form>
      </>
    );
  }
}

export default connect(null, {loginHospitalAdmin})(Login);
