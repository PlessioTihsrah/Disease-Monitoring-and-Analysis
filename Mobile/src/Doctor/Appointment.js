import React from 'react';
import {
  Text,
  Form,
  Item,
  Input,
  Label,
  Button,
  Spinner,
  Textarea,
  View,
} from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
import createInstance from '../store/actions/axios';
import {connect} from 'react-redux';
import AppointmentCard from '../AppointmentCard';
class Appointment extends React.PureComponent {
  state = {
    appointment: null,
    appointmentId: '',
    loading: false,
    loading2: false,
    remarks: '',
    nextAppointment: new Date(),
    fees: '',
    unpaid: '',
    monitoringDetails: [],
    show: false,
    mode: '',
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

  addVisitDetails = async () => {
    const axios = createInstance(this.props.token);
    this.setState({loading2: true});
    let {nextAppointment, fees, unpaid, remarks} = this.state;
    const body = {
      remarks: remarks.trim(),
      next_date: this.formatDate(nextAppointment),
    };
    if (fees) {
      body.fees = parseInt(fees);
    }
    if (unpaid) {
      body.unpaid = parseInt(unpaid);
    }
    try {
      const res = await axios.post(
        `/appointment/${this.state.appointment.id}`,
        body,
      );
      const data = res.data;
      if (data.success) {
        alert('Successfully added details');
        this.setState({
          appointment: data.appointment,
          fees: '',
          unpaid: '',
          remarks: '',
        });
      } else {
        throw new Error(data.message);
      }
    } catch (e) {
      alert('Error: ' + e.message || 'Something went wrong');
    } finally {
      this.setState({loading2: false});
    }
  };
  fetchAppointment = async () => {
    this.setState({appointment: null, loading: true});
    const axios = createInstance(this.props.token);
    try {
      const res = await axios.get(`/appointment/${this.state.appointmentId}`);
      const data = res.data;
      if (data.success) {
        this.setState({appointment: data.appointment});
      } else {
        throw new Error(data.message);
      }
    } catch (e) {
      console.log(e);
      alert('Error: ' + e.message || 'Something went wrong');
    } finally {
      this.setState({loading: false});
    }
  };

  getButton = () => {
    const {loading, appointmentId} = this.state;
    if (loading) {
      return <Spinner color="blue" />;
    } else {
      return (
        <Button
          block
          style={{margin: 10}}
          disabled={!appointmentId || appointmentId.length != 24}
          onPress={this.fetchAppointment}>
          <Text>Show</Text>
        </Button>
      );
    }
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
  getForm = () => {
    const {remarks, fees, unpaid, nextAppointment, mode} = this.state;
    return (
      <Form>
        <Item floatingLabel>
          <Label>Next Date of Appointment</Label>
          <Input disabled={true} value={this.formatDate(nextAppointment)} />
        </Item>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Button onPress={this.showDatepicker} transparent>
            <Text>Set Date</Text>
          </Button>
          <Button onPress={this.showTimepicker} transparent>
            <Text>Set Time</Text>
          </Button>
        </View>
        {this.state.show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={nextAppointment}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={this.onChange}
          />
        )}
        <Item floatingLabel>
          <Label>Fees</Label>
          <Input
            value={fees}
            onChangeText={(fees) => {
              if (fees.length === 0) {
                this.setState({fees});
              }
              fees = parseInt(fees);
              if (fees >= 0 && !isNaN(fees)) {
                this.setState({fees: fees.toString()});
              }
            }}
          />
        </Item>
        <Item floatingLabel>
          <Label>Unpaid</Label>
          <Input
            value={unpaid}
            onChangeText={(unpaid) => {
              if (unpaid.length === 0) {
                this.setState({unpaid});
              }
              unpaid = parseInt(unpaid);
              if (unpaid > 0 && !isNaN(unpaid)) {
                this.setState({unpaid: unpaid.toString()});
              }
            }}
          />
        </Item>
        <Textarea
          rowSpan={5}
          bordered
          placeholder="Remarks"
          value={remarks}
          style={{margin: 5}}
          onChangeText={(remarks) => this.setState({remarks})}
        />
        <Button
          block
          style={{margin: 5}}
          onPress={this.addVisitDetails}
          disabled={nextAppointment < new Date() || !remarks}>
          <Text>Add Visit Details</Text>
        </Button>
      </Form>
    );
  };

  render() {
    const {appointment, appointmentId, loading2} = this.state;
    return (
      <>
        <Form>
          <Item floatingLabel>
            <Label>Appointment ID</Label>
            <Input
              value={appointmentId}
              onChangeText={(appointmentId) => {
                this.setState({appointmentId});
              }}
            />
          </Item>
          {this.getButton()}
        </Form>
        {!!appointment && (
          <AppointmentCard appointment={appointment} hideCancel={true} />
        )}
        {!!appointment && !loading2 && !appointment.closed && this.getForm()}
        {loading2 && <Spinner color="blue" />}
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    doctor: state.auth.user.email,
  };
};
export default connect(mapStateToProps)(Appointment);
