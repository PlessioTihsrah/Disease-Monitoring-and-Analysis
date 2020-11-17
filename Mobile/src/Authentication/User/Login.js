import React from 'react';
import {Form, Item, Label, Input, Button, Text, Content} from 'native-base';
import {loginUser} from '../../store/actions/AuthActions';
import {connect} from 'react-redux';
class Login extends React.PureComponent {
  state = {
    email: '',
    password: '',
  };
  handleLogin = () => {
    const {email, password} = this.state;
    if (this.checkEmail(email) && password) {
      console.log('Sending request');
      this.props.loginUser(email, password);
    }
  };
  checkEmail(email) {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return reg.test(email);
  }
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
              secureTextEntry
              onChangeText={(password) => this.setState({password})}
            />
          </Item>
          <Content style={{padding: 10}}>
            <Button
              primary
              block
              style={{marginTop: 20}}
              disabled={!this.checkEmail(email) || !password}
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

export default connect(null, {loginUser})(Login);
