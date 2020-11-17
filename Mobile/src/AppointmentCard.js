import React from 'react';
import {Text, Card, CardItem, Button, View, Accordion} from 'native-base';
import {connect} from 'react-redux';
import createInstance from './store/actions/axios';

const cancelAppointment = async (id, removeAppointment, token) => {
  const axios = createInstance(token);
  try {
    const res = await axios.delete(`/appointment/${id}`);
    const data = res.data;
    if (data.success) {
      alert('Appointment cancelled successfully');
      removeAppointment(id);
    } else {
      alert('Error: ' + data.message || 'Something went wrong');
    }
  } catch (e) {
    console.log(e);
    alert('Error: ' + e.message || 'Something went wrong');
  }
};
const AppointmentCard = ({
  appointment,
  removeAppointment,
  token,
  hideCancel,
  forceCancel,
}) => {
  const {
    creationDate,
    nextAppointment,
    patient,
    id,
    visits,
    cancellable,
    closed,
  } = appointment;
  const visitData = visits.map((visit) => {
    const monitoring = [];
    for (const monitorParam in visit.monitoring) {
      monitoring.push(
        <Text>
          {monitorParam}: {visit.monitoring[monitorParam]}
        </Text>,
      );
    }
    return {
      title: visit.date,
      content: (
        <View style={{flexDirection: 'column'}}>
          <Text>Date: {visit.date}</Text>
          <Text>Doctor: {visit.doctor}</Text>
          <Text>Fees: {visit.fees}</Text>
          <Text>Unpaid: {visit.unpaid}</Text>
          <Text>Remakrs: {visit.remarks}</Text>
          {monitoring}
        </View>
      ),
    };
  });
  const showCancelButton =
    forceCancel || (!hideCancel && cancellable && !closed);
  return (
    <Card>
      <CardItem>
        <Text>ID: {id}</Text>
      </CardItem>
      <CardItem>
        <Text>Creation: {creationDate}</Text>
      </CardItem>
      <CardItem>
        <Text>Next Appointment: {nextAppointment}</Text>
      </CardItem>
      <CardItem>
        <Text>
          Patient: {patient.name}, {patient.mobile}
        </Text>
      </CardItem>
      <View
        style={{
          flexDirection: 'column',
          margin: 5,
        }}>
        {!!visitData.length && <Text>Visits</Text>}
        <Accordion dataArray={visitData} />
      </View>
      {showCancelButton && (
        <CardItem>
          <Button
            small
            block
            danger
            onPress={() => {
              cancelAppointment(id, removeAppointment, token);
            }}>
            <Text>Close</Text>
          </Button>
        </CardItem>
      )}
    </Card>
  );
};
const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};
export default connect(mapStateToProps)(AppointmentCard);
