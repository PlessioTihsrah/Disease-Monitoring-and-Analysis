import React from 'react';
import {
  Button,
  Content,
  Form,
  Input,
  Item,
  Label,
  Text,
  Picker,
  Spinner,
} from 'native-base';
import {connect} from 'react-redux';
import createInstance from '../../store/actions/axios';
import {Col, Grid} from 'react-native-easy-grid';
import {signupDoctor} from '../../store/actions/AuthActions';

class Signup extends React.PureComponent {
  state = {
    email: '',
    password: '',
    hospitalId: '',
    hospitalList: [],
    hospitalName: '',
    name: '',
    mobileNo: '',
    loading: false,
  };
  checkEmail(email) {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return reg.test(email);
  }
  getHospitals = async () => {
    const axios = createInstance();
    this.setState({loading: true});
    try {
      const data = (
        await axios.get('/search', {
          params: {name: this.state.hospitalName},
        })
      ).data;
      if (data.success) {
        this.setState({hospitalList: data.hospitals});
      } else {
        throw new Error(data.message);
      }
    } catch (e) {
      alert('Error: ' + (data.message || 'Something went wrong'));
    } finally {
      this.setState({loading: false});
    }
  };
  getPicker = () => {
    if (this.state.loading) {
      return <Spinner color="blue" />;
    }
    const pickerItems = this.state.hospitalList.map(({id, name}) => {
      return <Picker.Item label={name} value={id} key={id} />;
    });
    pickerItems.unshift(
      <Picker.Item label={'Choose Hospital'} value={''} key={'Demo'} />,
    );
    return (
      <Picker
        mode="dropdown"
        placeholder="Select Hospital"
        placeholderStyle={{color: '#2874F0'}}
        note={false}
        selectedValue={this.state.hospitalId}
        onValueChange={(hospitalId) => {
          this.setState({hospitalId});
        }}>
        {pickerItems}
      </Picker>
    );
  };

  signup = () => {
    const {email, password, hospitalId, name, mobileNo} = this.state;
    this.props.signupDoctor(email, password, hospitalId, name.trim(), mobileNo);
  };
  render() {
    const {
      email,
      password,
      name,
      mobileNo,
      hospitalId,
      hospitalList,
      hospitalName,
      loading,
    } = this.state;
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

          <Item floatingLabel>
            <Label>Name</Label>
            <Input
              value={this.state.name}
              onChangeText={(name) => this.setState({name})}
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
          <Grid style={{padding: 5}}>
            <Col size={3}>
              <Item floatingLabel>
                <Label>Enter Hospital Name</Label>
                <Input
                  value={hospitalName}
                  onChangeText={(hospitalName) => {
                    this.setState({hospitalName});
                  }}
                />
              </Item>
            </Col>
            <Col size={1} style={{marginTop: 35}}>
              <Button
                block
                small
                disabled={!hospitalName.trim()}
                onPress={this.getHospitals}>
                <Text>Search</Text>
              </Button>
            </Col>
          </Grid>
          {this.getPicker()}
          <Content style={{padding: 10}}>
            <Button
              primary
              block
              style={{marginTop: 20}}
              onPress={this.signup}
              disabled={
                !(
                  mobileNo.length === 10 &&
                  name.trim() &&
                  this.checkEmail(email) &&
                  password &&
                  hospitalId
                )
              }>
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

export default connect(null, {signupDoctor})(Signup);
