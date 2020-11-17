import React from 'react';
import {Button, Content, Form, Input, Item, Label, Text} from 'native-base';

import {signupSuperAdmin} from '../../store/actions/AuthActions';
import {connect} from 'react-redux';
class Signup extends React.PureComponent {
  state = {
    email: '',
    password: '',
  };
  checkEmail(email) {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return reg.test(email);
  }
  signup = () => {
    const {email, password} = this.state;
    if (this.checkEmail(email) && password) {
      this.props.signupSuperAdmin(email, password);
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
              onChangeText={(email) => this.setState({email: email.trim()})}
            />
          </Item>
          <Item floatingLabel>
            <Label>Password</Label>
            <Input
              value={this.state.password}
              onChangeText={(password) =>
                this.setState({password: password.trim()})
              }
              secureTextEntry={true}
            />
          </Item>

          <Content style={{padding: 10}}>
            <Button
              primary
              block
              style={{marginTop: 20}}
              onPress={this.signup}
              disabled={!(this.checkEmail(email) && password)}>
              <Text>Signup</Text>
            </Button>
            <Button
              primary
              block
              style={{marginTop: 10}}
              onPress={this.props.change}>
              <Text>Switch to Login</Text>
            </Button>
          </Content>
        </Form>
      </>
    );
  }
}

export default connect(null, {signupSuperAdmin})(Signup);
