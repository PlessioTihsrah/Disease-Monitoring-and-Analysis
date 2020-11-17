import React from 'react';
import {
  Button,
  Content,
  Form,
  Input,
  Item,
  Label,
  Text,
  DatePicker,
} from 'native-base';
import {connect} from 'react-redux';
import {signupUser} from '../../store/actions/AuthActions';
class Signup extends React.PureComponent {
  state = {
    email: '',
    password: '',
    dob: '',
    name: '',
    mobileNo: '',
  };
  checkEmail(email) {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return reg.test(email);
  }
  signup = () => {
    let {email, password, dob, name, mobileNo} = this.state;
    console.log(dob);
    dob = dob.toISOString().split('T')[0].split('-').reverse().join('/');
    if (this.checkEmail(email) && password && dob && name.trim() && mobileNo) {
      this.props.signupUser(email, password, dob, name.trim(), mobileNo);
    } else {
      alert('Fill all fields correctly');
    }
  };
  render() {
    const {email, password, name, mobileNo} = this.state;
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
          <Item inlineLabel style={{marginTop: 15, marginBottom: 10}}>
            <Label>Date of Birth</Label>
            <DatePicker
              maximumDate={new Date()}
              modalTransparent={false}
              animationType={'fade'}
              androidMode={'default'}
              placeHolderText="Select date"
              onDateChange={(dob) => this.setState({dob})}
            />
          </Item>
          <Item floatingLabel>
            <Label>Name</Label>
            <Input
              value={this.state.name}
              onChangeText={(name) => this.setState({name: name})}
            />
          </Item>
          <Item floatingLabel last>
            <Label>Mobile Number</Label>
            <Input
              value={this.state.mobileNo}
              onChangeText={(mobileNo) => {
                mobileNo = parseInt(mobileNo.trim());
                if (mobileNo && !isNaN(mobileNo)) {
                  this.setState({
                    mobileNo: mobileNo.toString(),
                  });
                }
              }}
              maxLength={10}
            />
          </Item>
          <Content style={{padding: 10}}>
            <Button
              primary
              block
              style={{marginTop: 20}}
              disabled={
                !(
                  mobileNo.length === 10 &&
                  name.trim() &&
                  this.checkEmail(email) &&
                  password
                )
              }
              onPress={this.signup}>
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

export default connect(null, {signupUser})(Signup);
