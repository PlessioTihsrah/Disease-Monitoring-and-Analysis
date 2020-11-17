import {Accordion, Icon, Text, View} from 'native-base';
import React from 'react';
import AppointmentCard from './AppointmentCard';

const _renderContent = (item, forceCancel, removeAppointment) => {
  return (
    <AppointmentCard
      appointment={item}
      forceCancel={forceCancel}
      removeAppointment={removeAppointment}></AppointmentCard>
  );
};

const _renderHeader = (item, expanded) => {
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          padding: 10,
          justifyContent: 'space-between',
          alignItems: 'center',
          margin: 5,
        }}>
        <View
          style={{
            textAlign: 'center',
          }}>
          <Text style={{fontWeight: '600'}}>{item.hospital.name}</Text>
          <Text>on {item.nextAppointment}</Text>
        </View>
        {expanded ? (
          <Icon style={{fontSize: 18}} name="remove-circle" />
        ) : (
          <Icon style={{fontSize: 18}} name="add-circle" />
        )}
      </View>
    </>
  );
};
const AppointmentShow = ({appointments, forceCancel, removeAppointment}) => {
  return (
    <Accordion
      dataArray={appointments}
      animation={true}
      renderHeader={_renderHeader}
      renderContent={(item) =>
        _renderContent(item, !!forceCancel, removeAppointment)
      }
    />
  );
};
export default AppointmentShow;
