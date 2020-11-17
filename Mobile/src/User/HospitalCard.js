import React from 'react';
import {Card, CardItem, Text, View, Button} from 'native-base';
import createInstance from '../store/actions/axios';
import DateTimePicker from '@react-native-community/datetimepicker';

class HospitalCard extends React.PureComponent {
  state = {
    loading: false,
    nextAppointment: new Date(),
    show: false,
    mode: '',
  };
  bookAppointment = async () => {
    const date = this.formatDate(this.state.nextAppointment);
    const hospital = this.props.data.id;

    const axios = createInstance(this.props.token);
    this.setState({loading: true});
    try {
      const data = (await axios.post('/appointments', {hospital, date})).data;

      if (data.success) {
        alert('Booking done successfully for ' + date);
      } else {
        throw new Error(data.message);
      }
    } catch (e) {
      alert('Error: ' + (e.message || 'Something went wrong'));
    } finally {
      this.setState({loading: false});
    }
  };
  showMode = (mode) => {
    this.setState({show: true, mode});
  };

  showDatepicker = () => {
    this.showMode('date');
  };

  showTimepicker = () => {
    this.showMode('time');
  };
  onChange = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.nextAppointment;
    this.setState({nextAppointment: currentDate, show: false});
  };
  formatDate = (date) => {
    return `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
  };
  render() {
    const {
      id,
      name,
      address,
      location,
      pincode,
      landline,
      state,
      district,
      mobile,
      emergency,
    } = this.props.data;
    return (
      <Card>
        <Text style={{padding: 10}}>Name: {name}</Text>
        <Text style={{padding: 10}}>Address: {address}</Text>
        <Text style={{padding: 10}}>District: {district}</Text>
        <Text style={{padding: 10}}>State: {state}</Text>
        <Text style={{padding: 10}}>Pincode: {pincode}</Text>
        <Text style={{padding: 10}}>
          Location: {location ? location : 'NA'}
        </Text>
        <Text style={{padding: 10}}>Mobile: {mobile}</Text>
        <Text style={{padding: 10}}>Landline: {landline}</Text>
        <Text style={{padding: 10}}>Emergency: {emergency}</Text>
        <Text style={{textAlign: 'center'}}>Date For Appointment:</Text>
        <Text style={{textAlign: 'center'}}>
          {this.formatDate(this.state.nextAppointment)}
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Button onPress={this.showDatepicker} transparent>
            <Text>Set Date</Text>
          </Button>
          <Button onPress={this.showTimepicker} transparent>
            <Text>Set Time</Text>
          </Button>
        </View>
        <Button
          block
          success
          onPress={this.bookAppointment}
          style={{margin: 10}}>
          <Text>Book</Text>
        </Button>
        {this.state.show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={this.state.nextAppointment}
            mode={this.state.mode}
            is24Hour={true}
            display="default"
            onChange={this.onChange}
          />
        )}
      </Card>
    );
  }
}

export default HospitalCard;
