import React from 'react';
import {
  Button,
  Form,
  Input,
  Item,
  Label,
  Spinner,
  Text,
  Textarea,
} from 'native-base';
import {connect} from 'react-redux';
import createInstance from '../store/actions/axios';
class CreateHospital extends React.PureComponent {
  state = {
    name: '',
    address: '',
    latitude: '',
    longitude: '',
    pincode: '',
    state: '',
    district: '',
    mobile: '',
    landline: '',
    emergency: '',
    loading: false,
  };

  createHospital = async () => {
    const axios = createInstance(this.props.token);
    const body = {...this.state};
    delete body.loading;
    body.pincode = parseInt(body.pincode);
    body.latitude = parseFloat(body.latitude);
    body.longitude = parseFloat(body.longitude);
    this.setState({loading: true});
    if (!this.state.landline.trim()) {
      delete body.landline;
    }
    if (!this.state.emergency.trim()) {
      delete body.emergency;
    }
    try {
      const data = (await axios.post('/hospitals', body)).data;
      if (data.success) {
        alert('Hospital Created Successfully');
        this.setState({
          name: '',
          address: '',
          latitude: '',
          longitude: '',
          pincode: '',
          state: '',
          district: '',
          mobile: '',
          landline: '',
          emergency: '',
        });
      } else {
        throw new Error(data.message);
      }
    } catch (e) {
      alert(`Error: ${e.message || 'Something went wrong'}`);
    } finally {
      this.setState({loading: false});
    }
  };
  trimAll = () => {
    let {
      name,
      address,
      latitude,
      longitude,
      pincode,
      state,
      district,
      mobile,
      landline,
      emergency,
    } = this.state;
    latitude = parseFloat(latitude);
    longitude = parseFloat(longitude);
    pincode = parseInt(pincode);
    mobile = parseInt(mobile);
    this.setState({
      name: name.trim(),
      address: address.trim(),
      latitude: !isNaN(latitude) ? latitude.toString() : '',
      longitude: !isNaN(longitude) ? longitude.toString() : '',
      landline: landline.trim(),
      mobile: !isNaN(mobile) ? mobile.toString() : '',
      emergency: emergency.trim(),
      district: district.trim(),
      pincode: !isNaN(pincode) ? pincode.toString() : '',
      state: state.trim(),
    });
  };
  render() {
    const {
      name,
      address,
      latitude,
      longitude,
      pincode,
      state,
      district,
      mobile,
      landline,
      emergency,
      loading,
    } = this.state;
    const invalid =
      !name ||
      !address ||
      !latitude ||
      !longitude ||
      !pincode ||
      !state ||
      !district ||
      !mobile;
    if (loading) {
      return <Spinner color="blue" />;
    }
    return (
      <Form>
        <Item floatingLabel>
          <Label>Name of Hospital*</Label>
          <Input
            onBlur={this.trimAll}
            value={name}
            onChangeText={(name) => this.setState({name: name})}
          />
        </Item>

        <Textarea
          style={{
            margin: 10,
            marginBottom: 0,
            borderColor: 'grey',
            borderWidth: 1,
          }}
          placeholder="Enter address *"
          value={address}
          rowSpan={4}
          onBlur={this.trimAll}
          onChangeText={(address) =>
            this.setState({address: address})
          }></Textarea>
        <Item floatingLabel>
          <Label>Latitude*</Label>
          <Input
            onBlur={this.trimAll}
            value={latitude}
            onChangeText={(latitude) => {
              this.setState({latitude});
            }}
          />
        </Item>
        <Item floatingLabel>
          <Label>Longitude*</Label>
          <Input
            onBlur={this.trimAll}
            value={longitude}
            onChangeText={(longitude) => {
              this.setState({longitude});
            }}
          />
        </Item>
        <Item floatingLabel>
          <Label>Pincode*</Label>
          <Input
            onBlur={this.trimAll}
            value={pincode}
            onChangeText={(pincode) => {
              this.setState({pincode});
            }}
          />
        </Item>
        <Item floatingLabel>
          <Label>State*</Label>
          <Input
            onBlur={this.trimAll}
            value={state}
            onChangeText={(state) => this.setState({state: state})}
          />
        </Item>
        <Item floatingLabel>
          <Label>District*</Label>
          <Input
            onBlur={this.trimAll}
            value={district}
            onChangeText={(district) => this.setState({district: district})}
          />
        </Item>
        <Item floatingLabel>
          <Label>Mobile*</Label>
          <Input
            onBlur={this.trimAll}
            value={mobile}
            onChangeText={(mobile) => this.setState({mobile: mobile})}
          />
        </Item>
        <Item floatingLabel>
          <Label>Landline</Label>
          <Input
            onBlur={this.trimAll}
            value={landline}
            onChangeText={(landline) => this.setState({landline: landline})}
          />
        </Item>
        <Item floatingLabel>
          <Label>Emergency</Label>
          <Input
            onBlur={this.trimAll}
            value={emergency}
            onChangeText={(emergency) => this.setState({emergency: emergency})}
          />
        </Item>
        <Button
          style={{margin: 5, marginTop: 20, marginBottom: 10}}
          block
          disabled={invalid}
          onPress={this.createHospital}>
          <Text>Create Hospital</Text>
        </Button>
      </Form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};
export default connect(mapStateToProps)(CreateHospital);
