import React from 'react';
import {Spinner, Text} from 'native-base';
import {connect} from 'react-redux';
import createInstance from '../store/actions/axios';
import Pagination from '../Pagination';
import AppointmentShow from '../AppointmentShow';
class CloseAppointment extends React.PureComponent {
  state = {
    appointments: [],
    loading: true,
    page: 1,
    totalPages: 0,
  };

  getAppointments = async () => {
    this.setState({loading: true});
    try {
      const data = (await this.axios.get('/appointments')).data;
      if (data.success) {
        const {appointments, page, totalPages} = data;
        this.setState({appointments, page, totalPages});
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

  componentDidMount() {
    this.axios = createInstance(this.props.token);
    this.getAppointments();
  }
  removeAppointment = (id) => {
    const appointments = this.state.appointments.filter(
      (appointment) => appointment.id != id,
    );
    this.setState({appointments});
  };
  render() {
    const {appointments, loading, page, totalPages} = this.state;
    console.log(appointments);

    if (loading) {
      return <Spinner color="blue" />;
    }
    return (
      <>
        <Pagination page={page} totalPages={totalPages} />
        <AppointmentShow
          appointments={appointments}
          forceCancel={true}
          removeAppointment={this.removeAppointment}
        />
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};
export default connect(mapStateToProps)(CloseAppointment);
